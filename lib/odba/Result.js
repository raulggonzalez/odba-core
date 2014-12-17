/**
 * A query result.
 *
 * @class odba.Result
 *
 * @param {Array} rows  The rows.
 */
function Result(rows) {
  /**
   * The rows.
   *
   * @name rows
   * @type {odba.Object[]}
   * @memberof odba.Result#
   */
  Object.defineProperty(this, "rows", {value: rows});
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
 * @param {Object} where  The restriction condition.
 */
Result.prototype.find = function find(where) {
  return new odba.ResultFilter().find(this, where);
};