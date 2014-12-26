/**
 * A query.
 *
 * @class odba.Query
 * @abstract
 */
function Query() {

}

/**
 * Returns all records.
 *
 * @name findAll
 * @function
 * @memberof odba.Query#
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
 * @name findAll
 * @function
 * @memberof odba.Query#
 *
 * @param {Object|Function|String[]} map  The mapping.
 * @param {Function} callback             The function to call: fn(error, result).
 */
Query.prototype.mapAll = function mapAll(map, callback) {
  //(1) pre: arguments
  if (!map) {
    throw new Error("Map expected.");
  }

  if (!callback) {
    throw new Error("Callback expected.");
  }

  //(2) find and map
  this.findAll(function(error, result) {
    if (error) {
      callback(error);
    } else {
      callback(undefined, new odba.Mapper().map(map, result));
    }
  });
};

/**
 * Runs the query.
 *
 * @name find
 * @function
 * @memberof odba.Query#
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
 * @memberof odba.Query#
 * @abstract
 *
 * @param {Object|Function|String[]} map  The mapping.
 * @param {Object} [filter]               The condition.
 * @param {Function} callback             The function to call: fn(error, result).
 */
Query.prototype.map = function(map, filter, callback) {
  //(1) pre: arguments
  if (!map) {
    throw new Error("Map expected.");
  }

  if (arguments.length == 2) {
    callback = arguments[1];
    filter = undefined;
  }

  //(2) find and map
  this.find(filter, function(error, result) {
    if (error) {
      callback(error);
    } else {
      callback(undefined, new odba.Mapper().map(map, result));
    }
  });
};

/**
 * Runs the query.
 *
 * @name findOne
 * @function
 * @memberof odba.Query#
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
 * @memberof odba.Query#
 * @abstract
 *
 * @param {Object|Function|String[]} map  The mapping.
 * @param {Object} [filter]               The filter object.
 * @param {Function} callback             The function to call: fn(error, record).
 */
Query.prototype.mapOne = function mapOne(){
  throw new Error("Abstract method.");
};

/**
 * Performs a join.
 *
 * @name join
 * @function
 * @memberof odba.Query#
 * @abstract
 *
 * @param {String|odba.Table} target  The target table.
 * @param {String} col1               The source column.
 * @param {String} [col2]             The target column.
 * @param {Function} [callback]       The function to call: function(error, result).
 *
 * @returns {odba.Query} If no callback is specified, it returns the query.
 *
 * @example Natural join.
 * q.join("session", "userId")
 * q.join("session", "userId", function(error, result) { ... });
 *
 * @example
 * q.join("session", "userId", "userId")
 * q.join("session", "userId", "userId", function(error, result) { ... });
 *
 * @example Restricting records.
 * q.join("session", "userId").find({username: "user01"}, function(error, result) { ... });
 */
Query.prototype.join = function join() {
  throw new Error("Abstract method.");
};