/**
 * A table column.
 *
 * @class vdba.Column
 * @abstract
 * @protected
 *
 * @param {String} name     The column name.
 * @param {String} type     The column type.
 * @param {Object} options  The column options.
 */
function Column(name, type, options) {
  //(1) pre: arguments
  if (!name) throw new Error("Column name expected.");
  if (!type) throw new Error("Column type expected.");
  if (!options) options = {};

  //(2) initialize
  /**
   * The column name.
   *
   * @name name
   * @type {String}
   * @memberof vdba.Column#
   */
  Object.defineProperty(this, "name", {value: name, enumerable: true});

  /**
   * The column type.
   *
   * @name type
   * @type {String}
   * @memberof vdba.Column#
   */
  Object.defineProperty(this, "type", {value: type, enumerable: true});

  /**
   * The column options.
   *
   * @name options
   * @type {Object}
   * @memberof vdba.Column#
   * @protected
   */
  Object.defineProperty(this, "options", {value: options});
}

/**
 * Indicates if the column is nullable.
 *
 * @name nullable
 * @type {Boolean}
 * @memberof vdba.Column#
 */
Column.prototype.__defineGetter__("nullable", function() {
  return !!this.options.nullable;
});

/**
 * Indicates if the column is primary key.
 *
 * @name primaryKey
 * @type {Boolean}
 * @memberof vdba.Column#
 */
Column.prototype.__defineGetter__("primaryKey", function() {
  return !!this.options.primaryKey;
});

/**
 * Alias of primaryKey.
 *
 * @name pk
 * @type {Boolean}
 * @memberof vdba.Column#
 */
Column.prototype.__defineGetter__("pk", function() {
  return this.primaryKey;
});

/**
 * Checks whether the column stores a set.
 *
 * @name isSet
 * @function
 * @memberof vdba.Column#
 *
 * @returns {Boolean}
 */
Column.prototype.isSet = function isCollection() {
  return /^set<.+>$/.test(this.type);
};

/**
 * Checks whether the column stores a BLOB.
 *
 * @name isBlob
 * @function
 * @memberof vdba.Column#
 *
 * @returns {Boolean}
 */
Column.prototype.isBlob = function isBlob() {
  return this.type == "blob";
};

/**
 * Checks whether the column stores a boolean.
 *
 * @name isBoolean
 * @function
 * @memberof vdba.Column#
 *
 * @returns {Boolean}
 */
Column.prototype.isBoolean = function isBoolean() {
  return this.type == "boolean";
};

/**
 * Checks wheteher the column stores a date.
 *
 * @name isDate
 * @function
 * @memberof vdba.Column#
 *
 * @returns {Boolean}
 */
Column.prototype.isDate = function isDate() {
  return this.type == "date";
};

/**
 * Checks whether the column stores a time.
 *
 * @name isTime
 * @function
 * @memberof vdba.Column#
 *
 * @returns {Boolean}
 */
Column.prototype.isTime = function isTime() {
  return this.type == "time";
};

/**
 * Checks whether the column stores a date-time.
 *
 * @name isDateTime
 * @function
 * @memberof vdba.Column#
 *
 * @returns {Boolean}
 */
Column.prototype.isDateTime = function isDateTime() {
  return this.type == "datetime";
};