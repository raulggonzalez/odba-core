/**
 * @classdesc A mapper.
 * @class vdba.Mapper
 * @protected
 */
function Mapper() {

}

Mapper.mapper = new Mapper();

/**
 * Maps the rows as indicated.
 *
 * @name map
 * @function
 * @memberof vdba.Mapper#
 *
 * @param {Object|String[]|Function} map  How to map.
 * @param {Object[]} rows                 The rows or the result to cast.
 *
 * @returns {Object[]} The same array with the rows mapped.
 */
Mapper.prototype.map = function(map, rows) {
  //(1) map
  for (var i = 0; i < rows.length; ++i) {
    rows[i] = this.mapRow(map, rows[i]);
  }

  //(2) return
  return rows;
};

/**
 * Maps a row.
 *
 * @name mapRow
 * @function
 * @memberof vdba.Mapper#
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