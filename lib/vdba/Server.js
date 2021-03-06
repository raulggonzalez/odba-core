/**
 * @classdesc A database engine.
 * @class vdba.Server
 * @abstract
 * @protected
 */
function Server() {

}

/**
 * The hostname.
 *
 * @name host
 * @memberof vdba.Server#
 * @abstract
 */
Server.prototype.__defineGetter__("host", function() {
  throw new Error("Abstract method.");
});

/**
 * The port.
 *
 * @name port
 * @memberof vdba.Server#
 * @abstract
 */
Server.prototype.__defineGetter__("port", function() {
  throw new Error("Abstract method.");
});

/**
 * Checks whether a database exists.
 *
 * @name hasDatabase
 * @function
 * @memberof vdba.Server#
 * @abstract
 *
 * @param {String} name       The database name.
 * @param {Function} callback The function to call: fn(error, exists).
 */
Server.prototype.hasDatabase = function hasDatabase() {
  throw new Error("Abstract method.");
};

/**
 * The server version.
 *
 * @name version
 * @memberof vdba.Server#
 * @abstract
 */
Server.prototype.__defineGetter__("version", function() {
  throw new Error("Abstract method.");
});

if (SPEC_TYPE > 1) {
  /**
   * Creates a new database.
   *
   * @name createDatabase
   * @function
   * @memberof vdba.Server#
   * @abstract
   *
   * @param {String} name         The database name.
   * @param {Object} [options]    The database options.
   * @param {Function} [callback] The function to call: fn(error).
   */
  Server.prototype.createDatabase = function createDatabase() {
    throw new Error("Abstract method.");
  };

  /**
   * Drops a database.
   *
   * @name dropDatabase
   * @function
   * @memberof vdba.Server#
   * @abstract
   *
   * @param {String} name         The database name.
   * @param {Function} [callback] The function to call: fn(error).
   */
  Server.prototype.dropDatabase = function dropDatabase() {
    throw new Error("Abstract method.");
  };
}