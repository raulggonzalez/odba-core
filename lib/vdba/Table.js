/**
 * A table.
 *
 * @class vdba.Table
 * @abstract
 * @protected
 *
 * @param {vdba.Database} db  The database.
 * @param {String} name       The table name.
 */
function Table(db, name) {
  /**
   * The database object.
   *
   * @name database
   * @type {vdba.Database}
   * @memberof vdba.Table#
   */
  Object.defineProperty(this, "database", {value: db, enumerable: true});

  /**
   * The table name.
   *
   * @name name
   * @type {String}
   * @memberof vdba.Table#
   */
  Object.defineProperty(this, "name", {value: name, enumerable: true});
}

/**
 * Checks whether an index exists.
 *
 * @name hasIndex
 * @function
 * @memberof vdba.Table#
 *
 * @param {String} name       The index name.
 * @param {Function} callback The function to call: fn(error, exists).
 */
Table.prototype.hasIndex = function hasIndex(name, callback) {
  this.database.hasIndex(name, callback);
};

/**
 * Returns an index.
 *
 * @name findIndex
 * @function
 * @memberof vdba.Table#
 *
 * @param {String} name       The index name.
 * @param {Function} callback The function to call: fn(error, exists).
 */
Table.prototype.findIndex = function findIndex(name, callback) {
  this.database.findIndex(name, callback);
};

/**
 * Creates an index on the table.
 *
 * @name createIndex
 * @function
 * @memberof vdba.Table#
 *
 * @param {String} name         The index name.
 * @param {String|String[]} col The column(s).
 * @param {Object} [options]    The index options.
 * @param {Function} [callback] The function to call: fn(error).
 */
Table.prototype.createIndex = function createIndex() {
  this.database.createIndex.apply(this.database, [this].concat(Array.prototype.slice.call(arguments)));
};

/**
 * Drops an index.
 *
 * @name dropIndex
 * @function
 * @memberof vdba.Table#
 *
 * @param {String} name         The index name.
 * @param {Function} [callback] The function to call: fn(error).
 *
 * @example Drop an index
 * tab.drop("ix_username");
 * tab.drop("ix_username", function(error) { ... });
 */
Table.prototype.dropIndex = function dropIndex(name, callback) {
  this.database.dropIndex(name, callback);
};

/**
 * Returns a query object.
 *
 * @name query
 * @function
 * @memberof vdba.Table#
 * @protected
 * @abstract
 *
 * @returns {vdba.Query}
 */
Table.prototype.query = function query() {
  throw new Error("Abstract method.");
};

/**
 * Returns zero, one or several rows.
 *
 * @name find
 * @function
 * @memberof vdba.Table#
 *
 * @param {Object} filter     The condition.
 * @param {Function} callback The function to call: fn(error, result).
 */
Table.prototype.find = function find(filter, callback) {
  this.query().find(filter, callback);
};

/**
 * find() with casting.
 *
 * @name map
 * @function
 * @memberof vdba.Table#
 *
 * @param {Object|Function|String[]} map  The mapping.
 * @param {Object} [filter]               The condition.
 * @param {Function} callback             The function to call: fn(error, result).
 */
Table.prototype.map = function(map, filter, callback) {
  this.query().map(map, filter, callback);
};

/**
 * Returns all rows.
 *
 * @name findAll
 * @function
 * @memberof vdba.Table#
 *
 * @param {Function} callback The function to call: fn(error, result).
 */
Table.prototype.findAll = function findAll(callback) {
  this.query().find(callback);
};

/**
 * findAll() with casting.
 *
 * @name mapAll
 * @function
 * @memberof vdba.Table#
 *
 * @param {Object|Function|String[]} map  The mapping.
 * @param {Function} callback             The function to call: fn(error, result).
 */
Table.prototype.mapAll = function mapAll(map, callback) {
  this.query().mapAll(map, callback);
};

/**
 * Returns one row.
 *
 * @name findOne
 * @function
 * @memberof vdba.Table#
 *
 * @param {Object} [filter]   The condition.
 * @param {Function} callback The function to call: fn(error, row).
 */
Table.prototype.findOne = function findOne(filter, callback) {
  this.query().findOne(filter, callback);
};

/**
 * findOne() with casting.
 *
 * @name mapOne
 * @function
 * @memberof vdba.Table#
 *
 * @param {Object|Function|String[]} map  The mapping.
 * @param {Object} [filter]               The condition.
 * @param {Function} callback             The function to call: fn(error, row).
 */
Table.prototype.mapOne = function mapOne(map, filter, callback) {
  this.query().mapOne(map, filter, callback);
};

/**
 * Returns the number of rows.
 *
 * @name count
 * @function
 * @memberof vdba.Table#
 * @abstract
 *
 * @param {Function} callback The function to call: fn(error, count).
 */
Table.prototype.count = function count() {
  throw new Error("Abstract method.");
};

/**
 * Joins this table with another.
 *
 * @name join
 * @function
 * @memberof vdba.Table#
 *
 * @param {String|vdba.Table} target  The target table name.
 * @param {String} col1               The source column.
 * @param {String} [col2]             The target column.
 * @param {Function} [callback]       The function to call: fn(error, result).
 *
 * @returns {vdba.Query} If the call doesn't pass a callback, it returns a Query;
 *                       otherwise, asynchronous call.
 */
Table.prototype.join = function join(target, col1, col2, callback) {
  //(1) pre: arguments
  if (arguments.length == 3) {
    if (arguments[2] instanceof Function) {
      callback = arguments[2];
      col2 = undefined;
    }
  }

  if (!col2) col2 = col1;

  if (!target) throw new Error("Target table expected.");
  if (!col1) throw new Error("Source column expected.");
  if (!col2) throw new Error("Target column expected.");

  //(2) join or return
  if (callback) {
    this.query().join(target, col1, col2, callback);
  } else {
    return this.query().join(target, col1, col2);
  }
};

/**
 * Inserts one or several rows into the table.
 *
 * @name insert
 * @function
 * @memberof vdba.Table#
 * @abstract
 *
 * @param {object|Object[]} rows  The row(s) to insert.
 * @param {Function} [callback]   The function to call: fn(error).
 */
Table.prototype.insert = function insert() {
  throw new Error("Abstract method.");
};

/**
 * Replaces the content of one or several rows.
 * The record must exist.
 *
 * @name save
 * @function
 * @memberof vdba.Table#
 * @abstract
 *
 * @param {Object|Object[]} rows  The row(s) to save.
 * @param {Function} [callback]   The function to call: fn(error).
 *
 * @example
 * user.save({userId: 1, username: "user01", password: "pwd01"});
 * user.save([{...}, {...}, {...}], function(error) { ... });
 */
Table.prototype.save = function save() {
  throw new Error("Abstract method.");
};

/**
 * Updates zero, one or several rows.
 *
 * @name update
 * @function
 * @memberof vdba.Table#
 * @abstract
 *
 * @param {Object} [where]      The condition.
 * @param {Object} cols         The columns to update.
 * @param {Function} [callback] The function to call: fn(error).
 *
 * @example
 * user.update({state: "locked"}, function(error) { ... });
 * user.update({userId: 1}, {password: "newPwd"}, function(error) { ... });
 */
Table.prototype.update = function update() {
  throw new Error("Abstract method.");
};

/**
 * Removes zero, one or several rows.
 *
 * @name remove
 * @function
 * @memberof vdba.Table#
 * @abstract
 *
 * @param {Object} where        The condition.
 * @param {Function} [callback] The function to call: fn(error).
 *
 * @example TRUNCATE
 * user.remove(function(error) { ... });
 *
 * @example DELETE
 * user.remove({userId: 1}, function(error) { ... });
 */
Table.prototype.remove = function remove() {
  throw new Error("Abstract method.");
};