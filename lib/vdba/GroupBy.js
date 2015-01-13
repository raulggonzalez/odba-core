/**
 * @classdesc A group-by clause.
 * @class vdba.GroupBy
 *
 * @param {String|String[]} column  The grouping column(s).
 */
function GroupBy(columns) {
  //(1) pre: arguments
  if (typeof(columns) == "string") columns = [columns];

  //(2) initialize
  /**
   * The grouping column(s).
   *
   * @name columns
   * @type {String[]}
   * @memberof vdba.GroupBy#
   */
  Object.defineProperty(this, "columns", {value: columns, enumerable: true});

  /**
   * The agg operations.
   *
   * @name aggregations
   * @type {vdba.AggOperation[]}
   * @memberof vdba.GroupBy#
   */
  Object.defineProperty(this, "aggregations", {value: [], enumerable: true});
}

/**
 * Adds an aggregation.
 *
 * @name add
 * @function
 * @memberof vdba.GroupBy#
 *
 * @param {vdba.AggOperation} op  The operation.
 */
GroupBy.prototype.add = function add(agg) {
  this.aggregations.push(agg);
};

/**
 * Checks whether some aggregation has defined some filter.
 *
 * @name hasFilter
 * @function
 * @memberof vdba.GroupBy#
 *
 * @returns {Boolean}
 */
GroupBy.prototype.hasFilter = function hasFilter() {
  var res;

  //(1) check
  res = false;
  for (var i = 0; i < this.aggregations.length; ++i) {
    if (this.aggregations[i].hasFilter()) {
      res = true;
      break;
    }
  }

  //(2) return
  return res;
};

/**
 * Returns the filter.
 *
 * @name filter
 * @type {Object}
 * @memberof vdba.GroupBy#
 */
GroupBy.prototype.__defineGetter__("filter", function() {
  var res = {};

  //(1) build
  for (var i = 0; i < this.aggregations.length; ++i) {
    var agg = this.aggregations[i];
    if (agg.hasFilter()) res[agg.alias] = agg.filter.value;
  }

  //(2) return
  return res;
});