/**
 * A mapper.
 *
 * @class odba.Mapper
 * @protected
 */
function Mapper() {

}

/**
 * Maps the rows as indicated.
 *
 * @name map
 * @function
 * @memberof odba.Mapper#
 *
 * @param {Object|String[]|Function} map  How to map.
 * @param {odba.Result|Object[]} rows     The rows or the result to cast.
 *
 * @returns {Object[]}
 */
Mapper.prototype.map = function(map, rows) {
  var res;

  //(1) map
  if (rows instanceof odba.Result) {
    res = this.mapResult(map, rows);
  } else {
    res = this.mapRows(map, rows);
  }

  //(2) return result
  return res;
};

/**
 * @private
 */
Mapper.prototype.mapRows = function(map, rows) {
  var res = [];

  //(1) map
  for (var i = 0; i < rows.length; ++i) {
    res.push(this.mapRow(map, rows[i]));
  }

  //(2) return result
  return res;
};

/**
 * @private
 */
Mapper.prototype.mapResult = function(map, result) {
  var res;

  //(1) create result
  res = new result.constructor([], result.options);

  //(2) map
  for (var i = 0; i < result.length; ++i) {
    res.rows.push(this.mapRow(map, result.rows[i]));
  }

  //(3) return result
  return res;
};

/**
 * Maps a row.
 *
 * @name mapRow
 * @function
 * @memberof odba.Mapper#
 *
 * @param {Object|String[]|Function} map  How to map.
 * @param {Object} row                    The row to cast.
 *
 * @returns {Object}
 */
Mapper.prototype.mapRow = function(map, row) {
  var instance;

  //(1) cast as needed
  if (map instanceof Function) {
    instance = this.customMap(map, row);
  } else if (map instanceof Array) {
    instance = this.defaultMap({map: map}, row);
  } else if (map instanceof Object) {
    instance = this.defaultMap(map, row);
  } else {
    instance = row;
  }

  //(2) return instance
  return instance;
};

/**
 * @private
 */
Mapper.prototype.defaultMap = function(map, row) {
  var instance, Class, mapping;

  //(1) prepare
  Class = (map.clss || Object);
  mapping = (map.map || {});

  if (typeof(mapping) == "string") {
    mapping = [mapping];
  }

  if (mapping instanceof Array) {
    var aux = {};

    for (var i = 0; i < mapping.length; ++i) {
      var field = mapping[i];
      aux[field.toLowerCase()] = field;
    }

    mapping = aux;
  }

  //(2) create instance
  instance = Object.create(Class.prototype);

  //(3) initialize instance
  for (var key in row) {
    instance[mapping[key] || key] = row[key];
  }

  //(4) return instance
  return instance;
};

/**
 * @private
 */
Mapper.prototype.customMap = function(map, row) {
  return map(row);
};