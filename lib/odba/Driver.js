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
  var cache, drv;

  //(1) get driver cache
  if (!("cache" in this)) {
    Object.defineProperty(this, "cache", {value: {}});
  }

  cache = this.cache;

  //(2) get driver
  name = name.toLowerCase();
  drv = cache[name];

  if (!drv) {
    if (name == "indexeddb") {
      drv = cache.indexeddb = new odba.indexeddb.IndexedDBDriver();
    }
  }

  //(3) return driver
  return drv;
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
 * @abstract
 *
 * @param {Object} config     The configuration object.
 * @param {Function} callback The function to call: fn(error, cx).
 *
 * @example An IndexedDB connection.
 * drv.openConnection({database: "mydb"}, function(error, cx) { ... });
 */
Driver.prototype.openConnection = function openConnection(config, callback) {
  throw new Error("Abstract method.");
};