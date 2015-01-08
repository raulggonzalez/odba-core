/**
 * A query.
 *
 * @class vdba.Query
 * @abstract
 */
function Query() {
  /**
   * The limit info: count and start.
   *
   * @name limitTo
   * @type {Object}
   * @memberof vdba.Query#
   * @protected
   */
  Object.defineProperty(this, "limitTo", {value: {count: undefined, start: 0}});

  /**
   * The filter, that is, the where clause.
   *
   * @name filter
   * @type {Object}
   * @memberof vdba.Query#
   * @protected
   */
  Object.defineProperty(this, "filterBy", {value: {}, writable: true});

  /**
   * The order by. Each field indicates the order: ASC or DESC.
   *
   * @name orderBy
   * @type {Object}
   * @memberof vdba.Query#
   * @protected
   */
  Object.defineProperty(this, "orderBy", {value: {}, writable: true});

  /**
   * The JOINs.
   *
   * @name joins
   * @type {vdba.Join[]}
   * @memberof vdba.Query#
   * @protected
   */
  Object.defineProperty(this, "joins", {value: []});
}

/**
 * Filters the rows that comply the specified filter.
 *
 * @name where
 * @function
 * @memberof vdba.Query#
 *
 * @param {Object} where       The filter.
 * @param {Function} [callback] The function to call: fn(error, result).
 *
 * @returns {vdba.Query}  The same query to chain if needed.
 */
Query.prototype.filter = function filter(where, callback) {
  //(1) pre: arguments
  if (!where) throw new Error("Filter expected.");

  //(2) configure
  this.filterBy = where;

  //(3) run if needed
  if (callback) this.find(callback);

  //(4) return
  return this;
};

/**
 * Limits the result to a maximum number of rows.
 *
 * @name limit
 * @function
 * @memberof vdba.Query#
 *
 * @param {Integer} count       The maximum number to return.
 * @param {Integer} [start]     The position where to start to return. Default: 0.
 * @param {Function} [callback] The function to call: fn(error, result).
 *
 * @returns {vdba.Query}  The same query to chain if needed.
 */
Query.prototype.limit = function limit(count, start, callback) {
  //(1) pre: arguments
  if (arguments.length == 2 && arguments[1] instanceof Function) {
    callback = arguments[1];
    start = undefined;
  }

  if (!count) throw new Error("Count expected.");
  if (start === undefined || start === null) start = 0;

  //(2) configure query
  this.limitTo.count = count;
  this.limitTo.start = start;

  //(3) run if needed
  if (callback) this.find(callback);

  //(4) return
  return this;
};

/**
 * Checks whether a limit has been set.
 *
 * @name hasLimit
 * @function
 * @memberof vdba.Query#
 *
 * @returns {Boolean}
 */
Query.prototype.hasLimit = function hasLimit() {
  return (this.limitTo.count > 0 || this.limitTo.start > 0);
};

/**
 * Sorts by the specified columns. The order mode are: ASC and DESC,
 * being ASC the default.
 *
 * @name sort
 * @function
 * @memberof vdba.Query#
 *
 * @param {String|String[]|Object} columns  The ordering column(s).
 * @param {Function} [callback]             The function to call: fn(error, result).
 *
 * @returns {vdba.Query}  The same query to chain if needed.
 */
Query.prototype.sort = function sort(columns, callback) {
  var cols = {};

  //(1) pre: arguments
  if (!columns) {
    throw new Error("Ordering column(s) expected.");
  } else if (typeof(columns) == "string") {
    cols[columns] = "ASC";
  } else if (columns instanceof Array) {
    if (columns.length === 0) throw new Error("Ordering column(s) expected.");
    else for (var i = 0; i < columns.length; ++i) cols[columns[i]] = "ASC";
  } else if (typeof(columns) == "object") {
    if (Object.keys(columns).length === 0) throw new Error("Ordering column(s) expected.");
    else cols = columns;
  } else {
    throw new Error("Ordering column(s) expected.");
  }

  //(2) configure query
  this.orderBy = cols;

  //(3) run if needed
  if (callback) this.find(callback);

  //(4) return
  return this;
};

/**
 * Checks whether an order by has been set.
 *
 * @name hasOrderBy
 * @function
 * @memberof vdba.Query#
 *
 * @returns {Boolean}
 */
Query.prototype.hasOrderBy = function hasOrderBy() {
  return (this.orderBy && Object.keys(this.orderBy).length > 0);
};

/**
 * Returns all records.
 *
 * @name findAll
 * @function
 * @memberof vdba.Query#
 * @abstract
 *
 * @param {Function} callback The function to call: fn(error, result).
 */
Query.prototype.findAll = function findAll() {
  throw new Error("Abstract method.");
};

/**
 * findAll() with casting.
 *
 * @name mapAll
 * @function
 * @memberof vdba.Query#
 *
 * @param {Object|Function|String[]} map  The mapping.
 * @param {Function} callback             The function to call: fn(error, result).
 */
Query.prototype.mapAll = function mapAll(map, callback) {
  //(1) pre: arguments
  if (!map) throw new Error("Map expected.");
  if (!callback) throw new Error("Callback expected.");

  //(2) find and map
  this.findAll(function(error, result) {
    if (error) callback(error);
    else callback(undefined, new vdba.Mapper().map(map, result));
  });
};

/**
 * Runs the query.
 *
 * @name find
 * @function
 * @memberof vdba.Query#
 * @abstract
 *
 * @param {Object} [filter]   The filter object.
 * @param {Function} callback The function to call: fn(error, result).
 */
Query.prototype.find = function find() {
  throw new Error("Abstract method.");
};

/**
 * find() with casting.
 *
 * @name map
 * @function
 * @memberof vdba.Query#
 *
 * @param {Object|Function|String[]} map  The mapping.
 * @param {Object} [filter]               The condition.
 * @param {Function} callback             The function to call: fn(error, result).
 */
Query.prototype.map = function(map, filter, callback) {
  //(1) pre: arguments
  if (arguments.length == 2) {
    if (arguments[1] instanceof Function) {
      callback = arguments[1];
      filter = undefined;
    }
  }

  if (!map) throw new Error("Map expected.");
  if (!callback) throw new Error("Callback expected.");

  //(2) find and map
  this.find(filter, function(error, result) {
    if (error) {
      callback(error);
    } else {
      callback(undefined, new vdba.Mapper().map(map, result));
    }
  });
};

/**
 * Runs the query.
 *
 * @name findOne
 * @function
 * @memberof vdba.Query#
 * @abstract
 *
 * @param {Object} [filter]   The filter object.
 * @param {Function} callback The function to call: fn(error, record).
 */
Query.prototype.findOne = function findOne() {
  throw new Error("Abstract method.");
};

/**
 * findOne() with casting.
 *
 * @name mapOne
 * @function
 * @memberof vdba.Query#
 *
 * @param {Object|Function|String[]} map  The mapping.
 * @param {Object} [filter]               The filter object.
 * @param {Function} callback             The function to call: fn(error, record).
 */
Query.prototype.mapOne = function mapOne(map, filter, callback){
  //(1) pre: arguments
  if (arguments.length == 2) {
    if (arguments[1] instanceof Function) {
      callback = arguments[1];
      filter = undefined;
    }
  }

  if (!map) throw new Error("Map expected.");
  if (!callback) throw new Error("Callback expected.");

  //(2) find and map
  this.findOne(filter, function(error, row) {
    if (error) {
      callback(error);
    } else {
      if (!row) callback();
      else callback(undefined, new vdba.Mapper().mapRow(map, row));
    }
  });
};

/**
 * Performs an inner join.
 *
 * @name join
 * @function
 * @memberof vdba.Query#
 *
 * @param {String|vdba.Table} target  The target table.
 * @param {String} col1               The source column.
 * @param {String} [col2]             The target column.
 * @param {Function} [callback]       The function to call: function(error, result).
 *
 * @returns {vdba.Query} The query to chain if needed.
 */
Query.prototype.join = function join(target, col1, col2, callback) {
  //(1) pre: arguments
  if (arguments.length == 3) {
    if (arguments[2] instanceof Function) {
      callback = arguments[2];
      col2 = undefined;
    }
  }

  if (!target) throw new Error("Target table expected.");
  if (!col1) throw new Error("Source column name expected.");
  if (!col2) col2 = col1;

  //(2) configure query
  this.joins.push(new vdba.Join("inner", "none", target, col1, col2));

  //(3) find if needed
  if (callback) this.find(callback);

  //(4) return
  return this;
};

/**
 * Performs an one-to-one inner join.
 *
 * @name joinoo
 * @function
 * @memberof vdba.Query#
 *
 * @param {String|vdba.Table} target  The target table.
 * @param {String} col1               The source column.
 * @param {String} [col2]             The target column.
 * @param {Function} [callback]       The function to call: function(error, result).
 *
 * @returns {vdba.Query} The query to chain if needed.
 */
Query.prototype.joinoo = function joinoo(target, col1, col2, callback) {
  //(1) pre: arguments
  if (arguments.length == 3) {
    if (arguments[2] instanceof Function) {
      callback = arguments[2];
      col2 = undefined;
    }
  }

  if (!target) throw new Error("Target table expected.");
  if (!col1) throw new Error("Source column name expected.");
  if (!col2) col2 = col1;

  //(2) configure query
  this.joins.push(new vdba.Join("inner", "1-1", target, col1, col2));

  //(3) find if needed
  if (callback) this.find(callback);

  //(4) return
  return this;
};

/**
 * Performs an one-to-many inner join.
 *
 * @name joinom
 * @function
 * @memberof vdba.Query#
 *
 * @param {String|vdba.Table} target  The target table.
 * @param {String} col1               The source column.
 * @param {String} [col2]             The target column.
 * @param {Function} [callback]       The function to call: function(error, result).
 *
 * @returns {vdba.Query} The query to chain if needed.
 */
Query.prototype.joinom = function joinoo(target, col1, col2, callback) {
  //(1) pre: arguments
  if (arguments.length == 3) {
    if (arguments[2] instanceof Function) {
      callback = arguments[2];
      col2 = undefined;
    }
  }

  if (!target) throw new Error("Target table expected.");
  if (!col1) throw new Error("Source column name expected.");
  if (!col2) col2 = col1;

  //(2) configure query
  this.joins.push(new vdba.Join("inner", "1-*", target, col1, col2));

  //(3) find if needed
  if (callback) this.find(callback);

  //(4) return
  return this;
};

/**
 * Checks whether the query is multi table.
 *
 * @name isMultiTable
 * @function
 * @memberof vdba.Query#
 *
 * @returns {Boolean}
 */
Query.prototype.isMultiTable = function isMultiTable() {
  return (this.joins.length > 0);
};

/**
 * Checks whether the query is simple, that is, only one table.
 *
 * @name isSimple
 * @function
 * @memberof vdba.Query#
 *
 * @returns {Boolean}
 */
Query.prototype.isSimple = function isSimple() {
  return !this.isMultiTable();
};