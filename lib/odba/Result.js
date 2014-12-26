/**
 * A query result.
 *
 * @class odba.Result
 *
 * @param {Array} rows        The rows.
 * @param {Object} [options]  The options.
 */
function Result(rows, options) {
  /**
   * The rows.
   *
   * @name rows
   * @type {Object[]}
   * @memberof odba.Result#
   */
  Object.defineProperty(this, "rows", {value: rows});

  /**
   * The result options.
   *
   * @name options
   * @type {Object}
   * @memberof odba.Result#
   */
  Object.defineProperty(this, "options", {value: options || {}});
}

/**
 * The number of records.
 *
 * @name length
 * @type {Number}
 * @memberof odba.Result#
 */
Result.prototype.__defineGetter__("length", function() {
  return this.rows.length;
});

/**
 * Returns the rows satisfying the restriction.
 *
 * @name find
 * @function
 * @memberof odba.Result#
 *
 * @param {Object} [where]  The restriction condition.
 *
 * @returns {Object[]}
 */
Result.prototype.find = function find(where) {
  return new odba.ResultFilter().find(this, where);
};

/**
 * Returns the rows satisfying the restriction casted as
 * indicated.
 *
 * @name map
 * @function
 * @memberof odba.Result#
 *
 * @param {Object} map      The mapping.
 * @param {Object} [where]  The restriction condition.
 *
 * @returns {Object[]}
 */
Result.prototype.map = function(map, where) {
  return new odba.Mapper().map(map, this.find(where));
};