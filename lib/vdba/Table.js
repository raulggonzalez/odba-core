/**
 * @classdesc A table.
 * @class vdba.Table
 * @abstract
 * @protected
 *
 * @param {vdba.Schema} schema  The schema.
 * @param {String} name         The table name.
 * @param {Object} columns      The columns.
 */
function Table(schema, name, columns) {
  //(1) pre: arguments
  if (!schema) throw new Error("Schema expected.");
  if (!name) throw new Error("Table name expected.");
  if (!columns) columns = {};

  //(2) initialize
  /**
   * The schema object.
   *
   * @name schema
   * @type {vdba.Schema}
   * @memberof vdba.Table#
   */
  Object.defineProperty(this, "schema", {value: schema, enumerable: true});

  /**
   * The table name.
   *
   * @name name
   * @type {String}
   * @memberof vdba.Table#
   */
  Object.defineProperty(this, "name", {value: name.toLowerCase(), enumerable: true});

  /**
   * The table columns.
   *
   * @name columns
   * @type {Object}
   * @memberof vdba.Table#
   */
  Object.defineProperty(this, "columns", {value: columns, enumerable: true});
}


Table.prototype.__defineGetter__("columnNames", function() {
  return Object.keys(this.columns);
});

/**
 * The database.
 *
 * @name database
 * @type {vdba.Database}
 * @memberof vdba.Table#
 */
Table.prototype.__defineGetter__("database", function() {
  return this.schema.database;
});

/**
 * The qualified name.
 *
 * @name qualifiedName
 * @type {String}
 * @memberof vdba.Table#
 */
Table.prototype.__defineGetter__("qualifiedName", function() {
  return (this.schema.isDefault() ? "" : this.schema.name + ".") + this.name;
});

/**
 * Alias of qualifiedName.
 *
 * @name qn
 * @type {String}
 * @memberof vdba.Table#
 */
Table.prototype.__defineGetter__("qn", function() {
  return this.qualifiedName;
});

/**
 * The full qualified name.
 *
 * @name fullQualifiedName
 * @type {String}
 * @memberof vdba.Table#
 */
Table.prototype.__defineGetter__("fullQualifiedName", function() {
  return this.database.name + "." + this.qualifiedName;
});

/**
 * Alias of fullQualifiedName.
 *
 * @name fqn
 * @type {String}
 * @memberof vdba.Table#
 */
Table.prototype.__defineGetter__("fqn", function() {
  return this.fullQualifiedName;
});

/**
 * Checks whether the table has the specified columns.
 *
 * @name checkSchema
 * @function
 * @memberof vdba.Table#
 *
 * @param {Object} columns  The columns to check.
 * @returns {Boolean}
 */
Table.prototype.checkSchema = function checkSchema(columns) {
  var res;

  //(1) pre: arguments
  if (!columns) columns = {};

  //(2) check
  res = true;

  for (var i = 0, colNames = Object.keys(columns); i < colNames.length; ++i) {
    var name = colNames[i];
    var chkCol = columns[name];
    var tblCol = this.columns[name];

    if (typeof(chkCol) != "object") chkCol = {type: chkCol};

    if (chkCol && tblCol) {
      if (chkCol.hasOwnProperty("type") && chkCol.type != tblCol.type) res = false;
      if (chkCol.hasOwnProperty("nullable") && chkCol.nullable != tblCol.nullable) res = false;
      if (chkCol.hasOwnProperty("primaryKey") && chkCol.primaryKey != tblCol.primaryKey) res = false;
      if (chkCol.hasOwnProperty("pk") && chkCol.pk != tblCol.primaryKey) res = false;
    } else {
      res = false;
    }

    if (!res) break;
  }

  //(3) return result
  return res;
};

if (SPEC_TYPE > 1) {
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
    this.database.hasIndex.apply(this.database, [this.schema.name].concat(Array.prototype.slice.call(arguments)));
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
    this.database.findIndex.apply(this.database, [this.schema.name].concat(Array.prototype.slice.call(arguments)));
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
    this.database.createIndex.apply(this.database, [this.schema.name, this.name].concat(Array.prototype.slice.call(arguments)));
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
   */
  Table.prototype.dropIndex = function dropIndex(name, callback) {
    this.database.dropIndex(this.schema.name, name, callback);
  };
}

/**
 * Returns a query object.
 *
 * @name query
 * @function
 * @memberof vdba.Table#
 * @abstract
 *
 * @returns {vdba.Query}
 */
Table.prototype.query = function query() {
  throw new Error("Abstract method.");
};

/**
 * Similar to this.query().limit(count, start, callback).
 *
 * @name limit
 * @function
 * @memberof vdba.Table#
 *
 * @param {Integer} count       The maximum number of rows.
 * @param {Integer} [start]     The position of the first row to return.
 * @param {Function} [callback] The function to call: fn(error, result).
 *
 * @returns {vdba.Query}
 */
Table.prototype.limit = function limit(count, start, callback) {
  var q = this.query();
  return q.limit.apply(q, Array.prototype.slice.call(arguments));
};

/**
 * Similar to this.query().filter(where, callback).
 *
 * @name filter
 * @function
 * @memberof vdba.Table#
 *
 * @param {Object} filter       The filter.
 * @param {Function} [callback] The function to call: fn(error, result).
 *
 * @returns {vdba.Query}
 */
Table.prototype.filter = function filter(where, callback) {
  var q = this.query();
  return q.filter.apply(q, Array.prototype.slice.call(arguments));
};

/**
 * Similar to this.query().find(filter, callback).
 *
 * @name find
 * @function
 * @memberof vdba.Table#
 *
 * @param {Object} filter     The condition.
 * @param {Function} callback The function to call: fn(error, result).
 *
 * @returns {vdba.Query}
 */
Table.prototype.find = function find() {
  var q = this.query();
  return q.find.apply(q, Array.prototype.slice.call(arguments));
};

/**
 * Similar to this.query().map(map, filter, callback).
 *
 * @name map
 * @function
 * @memberof vdba.Table#
 *
 * @param {Object|Function|String[]} map  The mapping.
 * @param {Object} [filter]               The condition.
 * @param {Function} callback             The function to call: fn(error, result).
 *
 * @returns {vdba.Query}
 */
Table.prototype.map = function() {
  var q = this.query();
  return q.map.apply(q, Array.prototype.slice.call(arguments));
};

/**
 * Similar to this.query().findAll(callback).
 *
 * @name findAll
 * @function
 * @memberof vdba.Table#
 *
 * @param {Function} callback The function to call: fn(error, result).
 *
 * @returns {vdba.Query}
 */
Table.prototype.findAll = function findAll() {
  var q = this.query();
  return q.findAll.apply(q, Array.prototype.slice.call(arguments));
};

/**
 * Similar to this.query().mapAll(map, callback).
 *
 * @name mapAll
 * @function
 * @memberof vdba.Table#
 *
 * @param {Object|Function|String[]} map  The mapping.
 * @param {Function} callback             The function to call: fn(error, result).
 *
 * @returns {vdba.Query}
 */
Table.prototype.mapAll = function mapAll() {
  var q = this.query();
  return q.mapAll.apply(q, Array.prototype.slice.call(arguments));
};

/**
 * Similar to this.query().findOne(filter, callback).
 *
 * @name findOne
 * @function
 * @memberof vdba.Table#
 *
 * @param {Object} [filter]   The condition.
 * @param {Function} callback The function to call: fn(error, row).
 *
 * @returns {vdba.Query}
 */
Table.prototype.findOne = function findOne() {
  var q = this.query();
  return q.findOne.apply(q, Array.prototype.slice.call(arguments));
};

/**
 * Similar to this.query().mapOne(map, filter, callback).
 *
 * @name mapOne
 * @function
 * @memberof vdba.Table#
 *
 * @param {Object|Function|String[]} map  The mapping.
 * @param {Object} [filter]               The condition.
 * @param {Function} callback             The function to call: fn(error, row).
 *
 * @returns {vdba.Query}
 */
Table.prototype.mapOne = function mapOne() {
  var q = this.query();
  return q.mapOne.apply(q, Array.prototype.slice.call(arguments));
};

/**
 * Gets the number of rows.
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
 * Similar to this.query().join(target, col1, col2, callback).
 *
 * @name join
 * @function
 * @memberof vdba.Table#
 *
 * @param {String|vdba.Table} target  The target table.
 * @param {String} col1               The source column.
 * @param {String} [col2]             The target column.
 * @param {Function} [callback]       The function to call: fn(error, result).
 *
 * @returns {vdba.Query}
 */
Table.prototype.join = function join() {
  var q = this.query();
  return q.join.apply(q, Array.prototype.slice.call(arguments));
};

/**
 * Similar to this.query().joinoo(target, col1, col2, callback).
 *
 * @name joinoo
 * @function
 * @memberof vdba.Table#
 *
 * @param {String|vdba.Table} target  The target table.
 * @param {String} col1               The source column.
 * @param {String} [col2]             The target column.
 * @param {Function} [callback]       The function to call: fn(error, result).
 *
 * @returns {vdba.Query}
 */
Table.prototype.joinoo = function joinoo() {
  var q = this.query();
  return q.joinoo.apply(q, Array.prototype.slice.call(arguments));
};

/**
 * Similar to this.query().joinom(target, col1, col2, callback).
 *
 * @name joinom
 * @function
 * @memberof vdba.Table#
 *
 * @param {String|vdba.Table} target  The target table.
 * @param {String} col1               The source column.
 * @param {String} [col2]             The target column.
 * @param {Function} [callback]       The function to call: fn(error, result).
 *
 * @returns {vdba.Query}
 */
Table.prototype.joinom = function joinom() {
  var q = this.query();
  return q.joinom.apply(q, Array.prototype.slice.call(arguments));
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
 * @param {Object} [options]      The insert options.
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
 * @param {Object} [filter]     The filter.
 * @param {Object} cols         The columns to update.
 * @param {Object} [options]    The update options.
 * @param {Function} [callback] The function to call: fn(error).
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
 * @param {Object} filter       The filter.
 * @param {Object} [options]    The delete options.
 * @param {Function} [callback] The function to call: fn(error).
 */
Table.prototype.remove = function remove() {
  throw new Error("Abstract method.");
};

/**
 * Removes all rows from a table.
 *
 * @name truncate
 * @function
 * @memberof vdba.Table#
 * @abstract
 *
 * @param {Function} callback The function to call: fn(error).
 */
Table.prototype.truncate = function truncate() {
  throw new Error("Abstract method.");
};