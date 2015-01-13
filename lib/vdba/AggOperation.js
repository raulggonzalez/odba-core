/**
 * @classdesc An aggregation operation.
 * @class vdba.AggOperation
 * @private
 *
 * @param {String} op     The operation.
 * @param {String} column The column.
 * @param {String} alias  The alias.
 * @param {Object} filter The filter.
 */
function AggOperation(op, column, alias, filter) {
  /**
   * The operation: sum, count, min, max...
   *
   * @name operation
   * @type {String}
   * @memberof vdba.AggOperation#
   */
  Object.defineProperty(this, "name", {value: op, enumerable: true});

  /**
   * The column name.
   *
   * @name column
   * @type {String}
   * @memberof vdba.AggOperation#
   */
  Object.defineProperty(this, "column", {value: column, enumerable: true});

  /**
   * The alias.
   *
   * @name alias
   * @type {String}
   * @memberof vdba.AggOperation#
   */
  Object.defineProperty(this, "alias", {value: alias, enumerable: true});

  /**
   * The filter for the operation result.
   *
   * @name filter
   * @type {Object}
   * @memberof vdba.AggOperation#
   */
  Object.defineProperty(this, "filter", {value: filter, enumerable: true});
}

/**
 * Checks whether the operation has filter.
 *
 * @name hasFilter
 * @function
 * @memberof vdba.AggOperation#
 *
 * @returns {Boolean}
 */
AggOperation.prototype.hasFilter = function hasFilter() {
  return !!this.filter;
};