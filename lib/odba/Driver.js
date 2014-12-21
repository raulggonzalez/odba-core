/**
 * An ODBA driver.
 *
 * @class odba.Driver
 * @abstract
 *
 * @param {String} name The driver name.
 */
function Driver(name) {
  /**
   * The driver name.
   *
   * @name name
   * @type {String}
   * @memberof odba.Driver#
   */
  Object.defineProperty(this, "name", {value: name, enumerable: true});
}

/**
 * The driver cache.
 *
 * @name cache
 * @type {Object}
 * @memberof odba.Driver
 * @private
 */
Object.defineProperty(Driver, "cache", {value: {}});

/**
 * Returns a specified driver.
 *
 * @memberof odba.Driver
 *
 * @param {String} name The driver name: IndexedDB, C*, Cassandra, PostgreSQL, etc.
 * @returns A driver or undefined if the name is invalid.
 *
 * @example
 * drv = odba.Driver.getDriver("IndexedDB");
 * drv = odba.Driver.getDriver("C*");
 */
Driver.getDriver = function getDriver(name) {
  var cache = odba.Driver.cache;

  //(1) pre: arguments
  if (!name) {
    throw new Error("Driver name expected.");
  }

  //(2) return driver
  return cache[name.toLowerCase()];
};

/**
 * Registers a driver.
 * This method is used by the drivers to register in the ODBA API.
 *
 * @name register
 * @function
 * @memberof odba.Driver
 *
 * @param {odba.Driver} driver      The driver.
 * @param {String|String[]} [alias] The driver alias.
 *
 * @example
 * odba.Driver.register(new IndexedDBDriver());
 * odba.Driver.register(new CassandraDriver(), "C*");
 */
Driver.register = function register(driver, alias) {
  var cache = odba.Driver.cache;

  //(1) pre: arguments
  if (!driver) {
    throw new Error("Driver expected.");
  }


  //(2) register
  cache[driver.name.toLowerCase()] = driver;

  if (alias) {
    if (typeof(alias) == "string") alias = [alias];

    for (var i = 0; i < alias.length; ++i) {
      cache[alias[i].toLowerCase()] = driver;
    }
  }
};

/**
 * Creates a connection object
 *
 * @name createConnection
 * @function
 * @memberof odba.Driver#
 * @abstract
 *
 * @param {Object} config The connection configuration.
 * @returns {odba.Connection}
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
 * @memberof odba.Driver#
 *
 * @param {Object} config     The configuration object.
 * @param {Function} callback The function to call: fn(error, cx).
 *
 * @example An IndexedDB connection.
 * drv.openConnection({database: "mydb"}, function(error, cx) { ... });
 */
Driver.prototype.openConnection = function openConnection(config, callback) {
  var cx;

  //(1) pre: arguments
  if (!config) {
    throw new Error("Configuration expected.");
  }

  if (!callback) {
    throw new Error("Callback expected.");
  }

  //(2) create connection
  cx = this.createConnection(config);

  //(3) open connection
  cx.open(function(error) {
    if (error) callback(error);
    else callback(undefined, cx);
  });
};