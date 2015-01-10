/**
 * @classdesc An aggregator.
 * @class vdba.Aggregator
 * @private
 */
function Aggregator() {

}

Aggregator.aggregator = new Aggregator();

/**
 * Transforms a column set into a property.
 *
 * @name transform
 * @function
 * @memberof vdba.Aggregator#
 *
 * @param {Object|vdba.Result} object The object to transform.
 * @param {String[]|Object} columns   The column names to transform into a property.
 * @param {String} property           The property name.
 */
Aggregator.prototype.transform = function transform(object, columns, property) {
  //(1) pre: arguments
  if (!object) throw new Error("Object to transform expected.");
  if (!columns) throw new Error("Column names to transform expected.");
  if (!property) throw new Error("Property name expected.");

  //(2) transform
  if (object instanceof vdba.Result) this.transformResult(object, columns, property);
  else this.transformObject(object, columns, property);
};

/**
 * @private
 */
Aggregator.prototype.transformObject = function transformObject(object, columns, property) {
  var i, colNames, value = {};

  //(1) pre: arguments
  if (columns instanceof Array) {
    colNames = columns;
    columns = {};

    for (i = 0; i < colNames.length; ++i) {
      columns[colNames[i]] = true;
    }
  } else {
    colNames = Object.keys(columns);
  }

  //(2) transform
  for (i = 0; i < colNames.length; ++i) {
    var name = colNames[i];
    var toDel = columns[name];

    if (object.hasOwnProperty(name)) value[name] = object[name];
    if (toDel) delete object[name];
  }

  //(3) create the new property
  if (Object.keys(value).length === 0) value = undefined;
  object[property] = value;
};

/**
 * @private
 */
Aggregator.prototype.transformResult = function transformResult(result, columns, property) {
  for (var i = 0; i < result.length; ++i) this.transformObject(result.rows[i], columns, property);
};