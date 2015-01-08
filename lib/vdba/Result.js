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
 * @returns {vdba.Result}
 */
Result.prototype.find = function find(where) {
  vdba.Filter.filter.filter(this.rows, where);
  return this;
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
 * @returns {vdba.Result}
 */
Result.prototype.map = function(map, where) {
  vdba.Mapper.mapper.map(map, this.find(where));
  return this;
};

/**
 * Casts a columns from the current types to the specified types.
 *
 * @name cast
 * @function
 * @memberof vdba.Result#
 *
 * @param {Object} columns  The columns to cast.
 */
Result.prototype.cast = function cast(columns) {
  for (var i = 0; i < this.length; ++i) Result.castRow(this.rows[i], columns);
};

/**
 * Casts a row from the current types to the specified types.
 *
 * @name castRow
 * @function
 * @memberof vdba.Result
 *
 * @param {Object} row      The row.
 * @param {Object} columns  The columns.
 *
 * @returns {Object} The same row to chain.
 */
Result.castRow = function castRow(row, columns) {
  for (var i = 0, colNames = Object.keys(columns); i < colNames.length; ++i) {
    var col = columns[colNames[i]];

    if (row.hasOwnProperty(col.name)) {
      var curVal, newVal;

      curVal = row[col.name];

      if (col.type == "boolean") newVal = Boolean(curVal);
      else if (col.type == "date") newVal = new Date(curVal);
      else if (col.type == "datetime") newVal = new Date(curVal);
      else if (col.type == "integer") newVal = parseInt(curVal);
      else if (col.type == "real") newVal = parseFloat(curVal);
      else if (col.type == "text") newVal = String(curVal);
      else if (col.type == "time") newVal = new Date(curVal);
      else newVal = curVal;

      row[col.name] = newVal;
    }
  }

  return row;
};

/**
 * Limits the number of rows.
 *
 * @name limit
 * @function
 * @memberof vdba.Result#
 *
 * @param {Integer} count   The maximum number of rows to return.
 * @param {Integer} [start] The row where to start to return. Default: 0.
 *
 * @returns {vdba.Result} The same result to chain if needed.
 */
Result.prototype.limit = function limit(count, start) {
  //(1) pre: arguments
  if (count === undefined || count === null) throw new Error("Count expected.");
  if (start === undefined || start === null) start = 0;

  //(2) limit
  this.rows.slice(start, count);
};

/**
 * Transforms the specified columns into a property.
 *
 * @name transform
 * @function
 * @memberof vdba.Result#
 *
 * @param {String[]|Object} columns The columns to transform into a property.
 * @param {String} property         The new property name.
 *
 * @returns {vdba.Result} The same result for chainning if needed.
 */
Result.prototype.transform = function transform(columns, property) {
  var agg = vdba.Aggregator.aggregator;

  //(1) transform
  agg.transform.apply(agg, [this.rows].concat(Array.prototype.slice.call(arguments)));

  //(2) return
  return this;
};