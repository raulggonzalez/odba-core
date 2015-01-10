/**
 * @classdesc A table cache.
 * @class vdba.DefinitionCache
 * @protected
 */
function DefinitionCache() {
  /**
   * The schemas.
   * Each schema is indexed by its name.
   *
   * @name schemas
   * @type {Object}
   * @memberof vdba.DefinitionCache#
   * @private
   */
  Object.defineProperty(this, "schemas", {value: {}, configurable: true});
}

DefinitionCache.SchemaItem = function SchemaItem(schema) {
  Object.defineProperty(this, "schema", {value: schema});
  Object.defineProperty(this, "tables", {value: {}});
};

/**
 * Checks whether a schema is cached.
 *
 * @name hasSchema
 * @function
 * @memberof vdba.DefinitionCache#
 *
 * @param {String} schema The schema name.
 * @returns {Boolean}
 */
DefinitionCache.prototype.hasSchema = function hasSchema(schema) {
  return !!this.schemas[schema];
};

/**
 * Returns a schema.
 *
 * @name getSchema
 * @function
 * @memberof vdba.DefinitionCache#
 *
 * @param {String} schema The schema name.
 *
 * @returns {vdba.Schema} The schema or undefined if the schema is not cached.
 */
DefinitionCache.prototype.getSchema = function getSchema(schema) {
  var item;

  //(1) get
  item = this.schemas[schema];
  if (item) item = item.schema;

  //(2) return
  return item;
};

/**
 * Adds a schema to the cache.
 *
 * @name addSchema
 * @function
 * @memberof vdba.DefinitionCache#
 *
 * @param {vdba.Schema} schema  The schema.
 * @returns {DefinitionCache.SchemaItem}
 */
DefinitionCache.prototype.addSchema = function addSchema(schema) {
  this.removeSchema(schema.name);
  return (this.schemas[schema.name] = new DefinitionCache.SchemaItem(schema));
};

/**
 * Removes a schema from the cache.
 *
 * @name removeSchema
 * @function
 * @memberof vdba.DefinitionCache#
 *
 * @param {String} schema The schema name.
 */
DefinitionCache.prototype.removeSchema = function removeSchema(schema) {
  delete this.schemas[schema];
};

/**
 * Checks whether a table is cached.
 *
 * @name hasTable
 * @function
 * @memberof vdba.DefinitionCache#
 *
 * @param {String} schema The schema name.
 * @param {String} table  The table name.
 *
 * @returns {Boolean}
 */
DefinitionCache.prototype.hasTable = function hasTable(schema, table) {
  var item;

  //(1) get schema
  item = this.schemas[schema];

  //(2) check
  return (item ? !!item.tables[table] : false);
};

/**
 * Returns a table.
 *
 * @name getTable
 * @function
 * @memberof vdba.DefinitionCache#
 *
 * @param {String} schema The schema name.
 * @param {String} table  The table name.
 *
 * @returns {vdba.Table} The table or undefined if the table is not cached.
 */
DefinitionCache.prototype.getTable = function getTable(schema, table) {
  var item;

  //(1) get table
  item = this.schemas[schema];
  if (item) item = item.tables[table];

  //(2) return
  return item;
};

/**
 * Adds a table to the cache.
 *
 * @name addTable
 * @function
 * @memberof vdba.DefinitionCache#
 *
 * @param {vdba.Table} table  The table.
 */
DefinitionCache.prototype.addTable = function addTable(table) {
  var schema;

  //(1) get schema
  schema = this.schemas[table.schema.name];
  if (!schema) schema = this.addSchema(table.schema);

  //(2) add
  schema.tables[table.name] = table;
};

/**
 * Removes a table of the cache.
 *
 * @name remove
 * @function
 * @memberof vdba.DefinitionCache#
 *
 * @param {String} schema The schema name.
 * @param {String} table  The table name.
 */
DefinitionCache.prototype.removeTable = function removeTable(schema, table) {
  var item;

  //(1) get schema
  item = this.schemas[schema];

  //(2) delete
  if (item) delete item.tables[table];
};