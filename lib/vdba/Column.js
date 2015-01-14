/**
 * @classdesc A table column.
 * @class vdba.Column
 * @abstract
 * @protected
 *
 * @param {String} name       The column name.
 * @param {String} type       The column type.
 * @param {Object} [options]  The column options.
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
   */
  Object.defineProperty(this, "options", {value: options, enumerable: true});
}

/**
 * Indicates if the column is required, that is, it doesn't accept a null value.
 *
 * @name required
 * @type {Boolean}
 * @memberof vdba.Column#
 */
Column.prototype.__defineGetter__("required", function() {
  return (this.id ? true : !!this.options.required);
});

/**
 * Alias of !required.
 *
 * @name nullable
 * @type {Boolean}
 * @memberof vdba.Column#
 */
Column.prototype.__defineGetter__("nullable", function() {
  return !this.required;
});

/**
 * Alias of !required.
 *
 * @name optional
 * @type {Boolean}
 * @memberof vdba.Column#
 */
Column.prototype.__defineGetter__("optional", function() {
  return !this.required;
});

/**
 * Indicates if the column is the primary key.
 *
 * @name id
 * @type {Boolean}
 * @memberof vdba.Column#
 */
Column.prototype.__defineGetter__("id", function() {
  return !!this.options.id;
});

/**
 * Alias of id.
 *
 * @name primaryKey
 * @type {Boolean}
 * @memberof vdba.Column#
 */
Column.prototype.__defineGetter__("primaryKey", function() {
  return this.id;
});

/**
 * Alias of id.
 *
 * @name pk
 * @type {Boolean}
 * @memberof vdba.Column#
 */
Column.prototype.__defineGetter__("pk", function() {
  return this.id;
});

/**
 * Indicates if the column is unique.
 *
 * @name unique
 * @type {Boolean}
 * @memberof vdba.Column#
 */
Column.prototype.__defineGetter__("unique", function() {
  return (this.id ? true : !!this.options.unique);
});

/**
 * Checks whether the columns complies the specified definition.
 *
 * @name checkDefinition
 * @function
 * @memberof vdba.Column#
 *
 * @param {String|Object} def The definition. If string, this indicates the type.
 *
 * @returns {Boolean}
 */
Column.prototype.checkDefinition = function checkDefinition(def) {
  var res;

  //(1) pre: arguments
  if (!def) throw new Error("Column definition to check expected.");
  if (typeof(def) != "object") def = {type: def};

  //(1) check
  res = true;

  for (var i = 0, props = Object.keys(def); i < props.length && res; ++i) {
    var prop = props[i];

    if (["id", "required", "type", "unique"].indexOf(prop) < 0) res = false;
    else res = (this[prop] == def[prop]);
  }

  //(2) return
  return res;
};

/**
 * Checks whether the column stores a set.
 *
 * @name isSet
 * @function
 * @memberof vdba.Column#
 *
 * @returns {Boolean}
 */
Column.prototype.isSet = function isSet() {
  return /^set<.+>$/.test(this.type);
};

/**
 * Checks whether the column stores a set of integers.
 *
 * @name isSetOfIntegers
 * @function
 * @memberof vdba.Column#
 *
 * @returns {Boolean}
 */
Column.prototype.isSetOfIntegers = function isSetOfIntegers() {
  return (this.type == "set<integer>");
};

/**
 * Checks whether the column stores a set of texts.
 *
 * @name isSetOfTexts
 * @function
 * @memberof vdba.Column#
 *
 * @returns {Boolean}
 */
Column.prototype.isSetOfTexts = function isSetOfTexts() {
  return (this.type == "set<text>");
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

/**
 * Checks whether the column stores a number.
 *
 * @name isNumber
 * @function
 * @memberof vdba.Colummn#
 *
 * @returns {Boolean}
 */
Column.prototype.isNumber = function isNumber() {
  return this.type == "integer" || this.type == "real";
};

/**
 * Checks whether the column stores a number.
 *
 * @name isInteger
 * @function
 * @memberof vdba.Column#
 *
 * @returns {Boolean}
 */
Column.prototype.isInteger = function isInteger() {
  return this.type == "integer";
};

/**
 * Checks whether the column stores a real.
 *
 * @name isReal
 * @function
 * @memberof vdba.Column#
 *
 * @returns {Boolean}
 */
Column.prototype.isReal = function isReal() {
  return this.type == "real";
};

/**
 * Checks whether the column stores a text.
 *
 * @name isText
 * @function
 * @memberof vdba.Column#
 *
 * @returns {Boolean}
 */
Column.prototype.isText = function isText() {
  return this.type == "text";
};