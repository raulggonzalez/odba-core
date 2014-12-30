/**
 * An index.
 *
 * @class vdba.Index
 * @abstract
 * @protected
 *
 * @param
 */
function Index(table, name) {
  /**
   * The table.
   *
   * @name table
   * @type {vdba.Table}
   * @memberof vdba.Index#
   */
  Object.defineProperty(this, "table", {value: table, enumerable: true});

  /**
   * The index name.
   *
   * @name name
   * @type {String}
   * @memberof vdba.Index#
   */
   Object.defineProperty(this, "name", {value: name, enumerable: true});
}

/**
 * The database.
 *
 * @name table
 * @type {vdba.Database}
 * @memberof vdba.Index#
 */
Index.prototype.__defineGetter__("database", function() {
  return this.table.database;
});

/**
 * Is it unique?
 *
 * @name unique
 * @type {Boolean}
 * @memberof vdba.indexeddb.IndexedDBIndex#
 * @abstract
 */
Index.prototype.__defineGetter__("unique", function() {
  throw new Error("Abstract property.");
});