/**
 * A query result.
 *
 * @class vdba.Result
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
   * @memberof vdba.Result#
   */
  Object.defineProperty(this, "rows", {value: rows});

  /**
   * The result options.
   *
   * @name options
   * @type {Object}
   * @memberof vdba.Result#
   */
  Object.defineProperty(this, "options", {value: options || {}});
}

/**
 * The number of records.
 *
 * @name length
 * @type {Number}
 * @memberof vdba.Result#
 */
Result.prototype.__defineGetter__("length", function() {
  return this.rows.length;
});

/**
 * Returns the rows satisfying the restriction.
 *
 * @name find
 * @function
 * @memberof vdba.Result#
 *
 * @param {Object} [where]  The restriction condition.
 *
 * @returns {Object[]}
 */
Result.prototype.find = function find(where) {
  return new vdba.ResultFilter().find(this, where);
};

/**
 * Returns the rows satisfying the restriction casted as
 * indicated.
 *
 * @name map
 * @function
 * @memberof vdba.Result#
 *
 * @param {Object} map      The mapping.
 * @param {Object} [where]  The restriction condition.
 *
 * @returns {Object[]}
 */
Result.prototype.map = function(map, where) {
  return new vdba.Mapper().map(map, this.find(where));
};