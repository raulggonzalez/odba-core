/**
 * @classdesc A join.
 * @class vdba.Join
 * @protected
 *
 * @param {String} type       The join type: inner or left.
 * @param {String} mode       The join mode: 1-1 or 1-*.
 * @param {vdba.Table} target The target table.
 * @param {String} col1       The source column.
 * @param {String} col2       The target column.
 */
function Join(type, mode, target, col1, col2) {
  //(1) pre: arguments
  if (!type) throw new Error("Join type expected.");
  if (!mode) throw new Error("Join mode expected.");
  if (!target)  throw new Error("Target table expected.");
  if (!col1) throw new Error("Source column name expected.");
  if (!col2) throw new Error("Target column name expected.");

  //(2) initialize
  /**
   * The join type: inner or left.
   *
   * @name type
   * @type {String}
   * @memberof vdba.Join#
   */
  Object.defineProperty(this, "type", {value: type.toLowerCase(), enumerable: true});

  /**
   * The join mode: none, 1-1 or 1-*.
   *
   * @name mode
   * @type {String}
   * @memberof vdba.Join#
   */
  Object.defineProperty(this, "mode", {value: mode, enumerable: true});

  /**
   * The target target.
   *
   * @name target
   * @type {String|vdba.Table}
   * @memberof vdba.Join#
   */
  Object.defineProperty(this, "target", {value: target, enumerable: true, writable: true});

  /**
   * The source column.
   *
   * @name sourceColumn
   * @type {String}
   * @memberof vdba.Join#
   */
  Object.defineProperty(this, "sourceColumn", {value: col1, enumerable: true});

  /**
   * The target column.
   *
   * @name targetColumn
   * @type {String}
   * @memberof vdba.Join#
   */
  Object.defineProperty(this, "targetColumn", {value: col2, enumerable: true});
}