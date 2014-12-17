/**
 * A database.
 *
 * @class odba.Database
 * @abstract
 */
function Database() {

}

/**
 * The database name.
 *
 * @name name
 * @type {String}
 * @memberof odba.Database#
 * @abstract
 */
Database.prototype.__defineGetter__("name", function() {
  throw new Error("Abstract property.");
});

/**
 * Does the table exist?
 *
 * @name hasTable
 * @function
 * @memberof odba.Database#
 * @abstract
 *
 * @param {String} name       The table name.
 * @param {Function} callback The function to call: fn(exists).
 *
 * @example
 * db.hasTable("user", function(error, exists) { ... });
 */
Database.prototype.hasTable = function hasTable() {
  throw new Error("Abstract method.");
};

/**
 * Do the tables exist?
 *
 * @name hasTables
 * @function
 * @memberof odba.Database#
 * @abstract
 *
 * @param {String[]} names    The table names.
 * @param {Function} callback The function to call: fn(exist).
 *
 * @example
 * db.hasTables(["user", "session"], function(error, exist) { ... });
 */
Database.prototype.hasTables = function hasTables() {
  throw new Error("Abstract method.");
};

/**
 * Returns a table.
 *
 * @name findTable
 * @function
 * @memberof odba.Database#
 * @abstract
 *
 * @param {String} name       The table name.
 * @param {Function} callback The function to call: fn(error, store).
 *
 * @example
 * db.findTable("user", function(error, store) { ... });
 */
Database.prototype.findTable = function findTable() {
  throw new Error("Abstract method.");
};

/**
 * Creates a new table.
 *
 * @name createTable
 * @function
 * @memberof odba.Database#
 * @abstract
 *
 * @param {String} name         The table name.
 * @param {Object} [options]    The creation options.
 * @param {Function} [callback] The function to call: fn(error, table).
 */
Database.prototype.createTable = function createTable() {
  throw new Error("Abstract method.");
};

/**
 * Creates new tables.
 *
 * @name createTables
 * @function
 * @memberof odba.Database#
 * @abstract
 *
 * @param {Object[]} tables     The tables info.
 * @param {Function} [callback] The function to call: fn(error, tables).
 */
Database.prototype.createTables = function createTables() {
  throw new Error("Abstract method.");
};

/**
 * Drops a table.
 *
 * @name dropTable
 * @function
 * @memberof odba.Database#
 * @abstract
 *
 * @param {String} name         The table name.
 * @param {Function} [callback] The function to call: fn(error).
 */
Database.prototype.dropTable = function dropTable() {
  throw new Error("Abstract method.");
};

/**
 * Returns an index.
 *
 * @name findIndex
 * @function
 * @memberof odba.Database#
 * @abstract
 *
 * @param {String} table      The table name.
 * @param {String} index      The index name.
 * @param {Function} callback The function to call: fn(error, index).
 *
 * @example
 * db.findIndex("user", "ix_username", function(error, ix) { ... });
 */
Database.prototype.findIndex = function findIndex() {
  throw new Error("Abstract method.");
};

/**
 * Checks whether a table has a specified index.
 *
 * @name hasIndex
 * @function
 * @memberof odba.Database#
 * @abstract
 *
 * @param {String} table      The object store name.
 * @param {String} ix         The index name.
 * @param {Function} callback The function to call: fn(error, exist).
 */
Database.prototype.hasIndex = function hasIndex() {
  throw new Error("Abstract method.");
};

/**
 * Creates an index.
 *
 * @name createIndex
 * @function
 * @memberof odba.Database#
 * @abstract
 *
 * @param {String} table        The table name.
 * @param {String} index        The index name.
 * @param {String} col          The indexing column.
 * @param {Object} [options]    The index options: unique (boolean).
 * @param {Function} [callback] The function to call: fn(error).
 *
 * @example
 * db.createIndex("user", "ix_username", "username");
 * db.createIndex("user", "ix_username", "username", function(error) { ... });
 * db.createIndex("user", "ix_username", "username", {unique: true});
 * db.createIndex("user", "ix_username", "username", {unique: true}, function(error) { ... });
 */
Database.prototype.createIndex = function createIndex() {
  throw new Error("Abstract method.");
};

/**
 * Drops an index.
 *
 * @name dropIndex
 * @function
 * @memberof odba.Database#
 * @abstract
 *
 * @param {String} table        The table name.
 * @param {String} index        The index name.
 * @param {Function} [callback] The function to call: fn(error).
 *
 * @example
 * db.dropIndex("user", "ix_username");
 * db.dropIndex("user", "ix_username", function(error) { ... });
 */
Database.prototype.dropIndex = function dropIndex() {
  throw new Error("Abstract method.");
};