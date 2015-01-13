//imports
var child_process = require("child_process");

//Grunt
module.exports = function(grunt) {
  //(1) configure
  grunt.config.init({
    pkg: grunt.file.readJSON("package.json"),

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

        src: ["lib/vdba/**"],
        dest: "build/browser-vdba-core.js"
      },

      node: {
        options: {
          banner: "/*! <%= pkg.name %> - <%= pkg.version %> (<%= grunt.template.today('yyyy-mm-dd') %>) */\n\n(function() {\n\n" +
                  grunt.file.read("lib/node-api.js") + "\n\n",
          footer: "\n\n})();"
        },

        src: ["lib/vdba/**"],
        dest: "build/node-vdba-core.js"
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
        src: ["build/browser-vdba-core.js"],
        options: {
          recurse: true,
          template: "templates/default",
          destination: "doc/api",
          "private": false
        }
      }
    },

    jshint: {
      browser: {
        options: {
          jshintrc: true
        },

        files: {
          src: ["build/browser-vdba-core.js"]
        }
      },

      grunt: {
        files: {
          src: ["Gruntfile.js"]
        }
      },

      lib: {
        options: {
          jshintrc: true,
          ignores: [
            "lib/browser-api.js",
            "lib/node-api.js"
          ]
        },

        files: {
          src: ["lib/**"]
        }
      },

      node: {
        options: {
          jshintrc: true
        },

        files: {
          src: ["build/node-vdba-core.js"]
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
      }
    },

    mochaTest:{
      options: {
        ignoreLeaks: false,
        quiet: false,
        reporter: "dot",
        require: ["should"]
      },

      node: {
        src: ["test/node/**.js", "test/common/**/*.js"]
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

      "browser-type1": {
        options: {
          compress: {
            global_defs: {
              SPEC_TYPE: 1
            }
          }
        },

        files: {
          "build/browser-type1-vdba-core.min.js": ["build/browser-vdba-core.js"]
        }
      },

      "browser-type2": {
        options: {
          compress: {
            global_defs: {
              SPEC_TYPE: 2
            }
          }
        },

        files: {
          "build/browser-type2-vdba-core.min.js": ["build/browser-vdba-core.js"]
        }
      },

      "node-type1": {
        options: {
          compress: {
            global_defs: {
              SPEC_TYPE: 1
            }
          }
        },

        files: {
          "build/node-type1-vdba-core.min.js": ["build/node-vdba-core.js"]
        }
      },

      "node-type2": {
        options: {
          compress: {
            global_defs: {
              SPEC_TYPE: 2
            }
          }
        },

        files: {
          "build/node-type2-vdba-core.min.js": ["build/node-vdba-core.js"]
        }
      }
    }
  });

  //(2) enable plugins
  grunt.loadNpmTasks("grunt-contrib-clean");
  grunt.loadNpmTasks("grunt-contrib-compress");
  grunt.loadNpmTasks("grunt-contrib-concat");
  grunt.loadNpmTasks("grunt-contrib-copy");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks("grunt-contrib-uglify");
  grunt.loadNpmTasks("grunt-jsdoc");
  grunt.loadNpmTasks("grunt-mocha-test");

  //(3) define tasks
  grunt.registerTask("testBrowser", "Perform the browser unit testing.", function test(target, type) {
    var chrome = (target == "chrome");
    var firefox = (target == "firefox");
    var index = grunt.config.get(type == "min" ? "test.minIndex" : "test.index");

    if (chrome) {
      process.env.PATH += ";" + grunt.config.get("test.chromeFolder");
      child_process.exec("chrome --new-window " + index, undefined, this.async());
    }

    if (firefox) {
      process.env.PATH += ";" + grunt.config.get("test.firefoxFolder");
      child_process.exec("firefox -new-window " + index, undefined, this.async());
    }
  });

  grunt.registerTask("browser", "Generates browser-vdba-core.", [
    "concat:browser",
    "jshint:browser",
    "uglify:browser-type1",
    "uglify:browser-type2",
    "testBrowser:chrome",
    "testBrowser:chrome:min",
    "testBrowser:firefox",
    "testBrowser:firefox:min"
  ]);

  grunt.registerTask("node", "Generates node-vdba-core.", [
    "jshint:lib",
    "concat:node",
    "jshint:node",
    "uglify:node-type1",
    "uglify:node-type2",
    "mochaTest:node"
  ]);

  grunt.registerTask("api.html.zip", "Generates the API doc.", [
    "clean:doc",
    "jsdoc:api.html",
    "compress:api.html",
    "clean:doc",
  ]);

  grunt.registerTask("default", "All.", [
    "jshint:grunt",
    "jshint:test",
    "jshint:lib",
    "browser",
    "node",
    "api.html.zip"
  ]);
};

