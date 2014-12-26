/**
 * A query.
 *
 * @class vdba.Query
 * @abstract
 */
function Query() {

}

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
 *
 * @example
 * q.mapAll(["userId"], function(error, result) { ... });
 * q.mapAll({clss: User}, function(error, result) { ... });
 * q.mapAll({clss: User, map: ["userId"]}, function(error, result) { ... });
 * q.mapAll({clss: User, map: {userid: "userId"}}, function(error, result) { ... });
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
 * Performs a join.
 *
 * @name join
 * @function
 * @memberof vdba.Query#
 * @abstract
 *
 * @param {String|vdba.Table} target  The target table.
 * @param {String} col1               The source column.
 * @param {String} [col2]             The target column.
 * @param {Function} [callback]       The function to call: function(error, result).
 *
 * @returns {vdba.Query} If no callback is specified, it returns the query.
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