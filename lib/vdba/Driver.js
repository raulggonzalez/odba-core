/**
 * A VDBA driver.
 *
 * @class vdba.Driver
 * @abstract
 * @protected
 *
 * @param {String} name               The driver name.
 * @param {String|String[]} [aliases] The driver aliases.
 */
function Driver(name, aliases) {
  //(1) pre: arguments
  if (!aliases) aliases = [];
  else if (typeof(aliases) == "string") aliases = [aliases];

  //(2) initialize instance
  /**
   * The driver name.
   *
   * @name name
   * @type {String}
   * @memberof vdba.Driver#
   */
  Object.defineProperty(this, "name", {value: name, enumerable: true});

  /**
   * The driver aliases.
   *
   * @name aliases
   * @type {String[]}
   * @memberof vdba.Driver#
   */
  Object.defineProperty(this, "aliases", {value: aliases, enumerable: true});
}

/**
 * The driver cache.
 *
 * @name cache
 * @type {Object}
 * @memberof vdba.Driver
 * @private
 */
Object.defineProperty(Driver, "cache", {value: {}});

/**
 * Returns a specified driver.
 *
 * @memberof vdba.Driver
 *
 * @param {String} name The driver name: IndexedDB, C*, Cassandra, PostgreSQL, etc.
 * @returns A driver or undefined if the name is invalid.
 *
 * @example
 * drv = vdba.Driver.getDriver("IndexedDB");
 * drv = vdba.Driver.getDriver("C*");
 */
Driver.getDriver = function getDriver(name) {
  var cache = vdba.Driver.cache;

  //(1) pre: arguments
  if (!name) {
    throw new Error("Driver name expected.");
  }

  //(2) return driver
  return cache[name.toLowerCase()];
};

/**
 * Registers a driver.
 * This method is used by the drivers to register in the VDBA API.
 *
 * @name register
 * @function
 * @memberof vdba.Driver
 *
 * @param {vdba.Driver} driver      The driver.
 *
 * @example
 * vdba.Driver.register(new IndexedDBDriver());
 */
Driver.register = function register(driver) {
  var cache = vdba.Driver.cache;

  //(1) pre: arguments
  if (!driver) {
    throw new Error("Driver expected.");
  }


  //(2) register
  cache[driver.name.toLowerCase()] = driver;

  for (var i = 0, aliases = driver.aliases; i < aliases.length; ++i) {
    cache[aliases[i].toLowerCase()] = driver;
  }
};

/**
 * Creates a connection object
 *
 * @name createConnection
 * @function
 * @memberof vdba.Driver#
 * @abstract
 *
 * @param {Object} config The connection configuration.
 * @returns {vdba.Connection}
 *
 * @example An IndexedDB connection.
 * cx = drv.createConnection({database: "mydb"});
 */
Driver.prototype.createConnection = function createConnection() {
  throw new Error("Abstract method.");
};

/**
 * Creates and opens a connection.
 *
 * @name openConnection
 * @function
 * @memberof vdba.Driver#
 *
 * @param {Object} config     The configuration object.
 * @param {Function} callback The function to call: fn(error, cx).
 *
 * @example An IndexedDB connection.
 * drv.openConnection({database: "mydb"}, function(error, cx) { ... });
 */
Driver.prototype.openConnection = function openConnection(config, callback) {
  var cx;

  //(1) arguments
  if (!config) throw new Error("Configuration expected.");
  if (!callback) throw new Error("Callback expected.");

  //(1) create connection
  cx = this.createConnection(config);

  //(2) open connection
  cx.open(function(error) {
    if (error) callback(error);
    else callback(undefined, cx);
  });
};