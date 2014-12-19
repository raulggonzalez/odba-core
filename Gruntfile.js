//imports
var child_process = require("child_process");

//Grunt
module.exports = function(grunt) {
  //(1) configure
  grunt.config.init({
    pkg: grunt.file.readJSON("package.json"),

    jshint: {
      grunt: {
        files: {
          src: ["Gruntfile.js"]
        }
      },

      test: {
        options: {
          ignores: [
            "test/vendor/**",
            "test/mocha.opts",
            "test/browser/index.html",
            "test/browser/index.min.html"
          ]
        },

        files: {
          src: ["test/**"]
        }
      },

      browser: {
        options: {
          jshintrc: true
        },

        files: {
          src: ["browser-odba-core.js"]
        }
      },

      node: {
        options: {
          jshintrc: true
        },

        files: {
          src: ["node-odba-core.js"]
        }
      }
    },

    clean: {
      doc: {
        src: ["doc/api/"]
      }
    },

    concat: {
      options: {
        separator: "\n\n"
      },

      browser: {
        options: {
          banner: "/*! <%= pkg.name %> - <%= pkg.version %> (<%= grunt.template.today('yyyy-mm-dd') %>) */\n\n(function() {",
          footer: "\n\n" + grunt.file.read("lib/browser-api.js") + "\n\n})();"
        },

        src: ["lib/odba/**"],
        dest: "browser-odba-core.js"
      },

      node: {
        options: {
          banner: "/*! <%= pkg.name %> - <%= pkg.version %> (<%= grunt.template.today('yyyy-mm-dd') %>) */\n\n(function() {",
          footer: "\n\n" + grunt.file.read("lib/node-api.js") + "\n\n})();"
        },

        src: ["lib/odba/**"],
        dest: "node-odba-core.js"
      }
    },

    compress: {
      "api.html": {
        options: {
          mode: "zip",
          archive: "doc/api.html.zip",
          level: 3,
        },

        expand: true,
        cwd: "doc/api/",
        src: "**",
        /*dest: "api"*/
      }
    },

    jsdoc: {
      "api.html": {
        src: ["browser-odba-core.js"],
        options: {
          recurse: true,
          template: "templates/default",
          destination: "doc/api",
          "private": false
        }
      }
    },

    test: {
      host: "localhost",
      port: 51792,
      chromeFolder: "C:\\Program Files (x86)\\Google\\Chrome\\Application",
      firefoxFolder: "C:\\Program Files (x86)\\Mozilla Firefox",
      app: "http://<%= test.host %>:<%= test.port %>/<%= pkg.name %>",
      index: "<%= test.app %>/test/browser/index.html",
      minIndex: "<%= test.app %>/test/browser/index.min.html",
    },

    uglify: {
      options: {
        banner: "/*! <%= pkg.name %> - <%= pkg.version %> (<%= grunt.template.today('yyyy-mm-dd') %>) */",
        mangle: false,
        compress: {
          drop_console: true,
          drop_debugger: true,
          properties: true,
          dead_code: true,
          conditionals: true,
          comparisons: true,
          booleans: true,
          loops: true,
          warnings: true
        },
        preserveComments: false
      },

      browser: {
        files: {
          "browser-odba-core.min.js": ["browser-odba-core.js"]
        }
      },

      node: {
        files: {
          "node-odba-core.min.js": ["node-odba-core.js"]
        }
      }
    }
  });

  //(2) enable plugins
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks("grunt-contrib-concat");
  //grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-jsdoc");

  //(3) define tasks
  grunt.registerTask("test", "Perform the unit testing.", function test(target, type) {
    var chrome = (target == "chrome");
    var firefox = (target == "firefox");
    var node = (target == "node");
    var index = grunt.config.get(type == "min" ? "test.minIndex" : "test.index");

    if (chrome) {
      process.env.PATH += ";" + grunt.config.get("test.chromeFolder");
      child_process.exec("chrome --new-window " + index, undefined, this.async());
    }

    if (firefox) {
      process.env.PATH += ";" + grunt.config.get("test.firefoxFolder");
      child_process.exec("firefox -new-window " + index, undefined, this.async());
    }

    if (node) {
      var done = this.async();
      var ps = child_process.exec("mocha test/node test/common", function(error, stdout, stderr) {
        grunt.log.writeln(stdout);
        grunt.log.writeln(stderr);
        done(error);
      });
    }
  });

  grunt.registerTask("browser", "Generates browser-odba-core.", [
    "concat:browser",
    "jshint:browser",
    "uglify:browser",
    "test:chrome",
    "test:chrome:min"
  ]);

  grunt.registerTask("node", "Generates node-odba-core.", [
    "concat:node",
    "jshint:node",
    "uglify:node",
    "test:node"
  ]);

  grunt.registerTask("api.html.zip", "Generates the API doc.", [
    "clean:doc",
    "jsdoc:api.html",
    "compress:api.html",
    "clean:doc",
  ]);

  grunt.registerTask("all", "Generates browser and Node modules.", [
    "jshint:grunt",
    "jshint:test",
    "browser",
    "node",
    "api.html.zip"
  ]);
};

