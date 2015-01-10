/**
 * @classdesc A database schema.
 * @class vdba.Schema
 * @abstract
 * @protected
 *
 * @param {vdba.Database} db  The database.
 * @param {String} name       The name.
 */
function Schema(db, name) {
  //(1) pre: arguments
  if (!db) throw new Error("Database expected.");
  if (!name) throw new Error("Schema name expected.");

  //(2) initialize
  /**
   * The database.
   *
   * @name database
   * @type {vdba.Database}
   * @memberof vdba.Schema#
   */
  Object.defineProperty(this, "database", {value: db, enumerable: true});

  /**
   * The schema name.
   *
   * @name name
   * @type {vdba.String}
   * @memberof vdba.Schema#
   */
  Object.defineProperty(this, "name", {value: name.toLowerCase(), enumerable: true});
}

/**
 * Returns if this schema is default. This schema is used when the DBMS doesn't
 * support the schema concept.
 *
 * @name isDefault
 * @function
 * @memberof vdba.Schema#
 * @abstract
 *
 * @returns {Boolean}
 */
Schema.prototype.isDefault = function isDefault() {
  throw new Error("Abstract method.");
};

/**
 * Finds a table object into the schema.
 *
 * @name findTable
 * @function
 * @memberof vdba.Schema#
 *
 * @param {String} name       The table name.
 * @param {Function} callback The function to call: fn(error, table).
 */
Schema.prototype.findTable = function findTable(name, callback) {
  this.database.findTable.apply(this.database, [this.name].concat(Array.prototype.slice.call(arguments)));
};

/**
 * Checks whether a table exists.
 *
 * @name hasTable
 * @function
 * @memberof vdba.Schema#
 *
 * @param {String} name       The table name.
 * @param {Function} callback The function to call: fn(error, exists.)
 */
Schema.prototype.hasTable = function hasTable() {
  this.database.hasTable.apply(this.database, [this.name].concat(Array.prototype.slice.call(arguments)));
};

/**
 * Checks whether several tables exist.
 *
 * @name hasTables
 * @function
 * @memberof vdba.Schema#
 *
 * @param {String[]} names    The table names.
 * @param {Function} callback The function to call: fn(error, exist).
 */
Schema.prototype.hasTables = function hasTables() {
  this.database.hasTables.apply(this.database, [this.name].concat(Array.prototype.slice.call(arguments)));
};

if (SPEC_TYPE > 1) {
  /**
   * Creates a new table.
   *
   * @name createTable
   * @function
   * @memberof vdba.Schema#
   *
   * @param {String} name         The table name.
   * @param {Object} columns      The columns.
   * @param {Object} [options]    The create options: ifNotExists (Boolean).
   * @param {Function} [callback] The function to call: fn(error).
   */
  Schema.prototype.createTable = function createTable()  {
    this.database.createTable.apply(this.database, [this.name].concat(Array.prototype.slice.call(arguments)));
  };

  /**
   * Drops a table.
   *
   * @name dropTable
   * @function
   * @memberof vdba.Schema#
   *
   * @param {String|vdba.Table} table       The table to drop.
   * @param {Object} [options] options      The drop options.
   * @param {Function} [callback] callback  The function to call: fn(error).
   */
  Schema.prototype.dropTable = function dropTable() {
    this.database.dropTable.apply(this.database, [this.name].concat(Array.prototype.slice.call(arguments)));
  };
}