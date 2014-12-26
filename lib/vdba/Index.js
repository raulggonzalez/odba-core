/**
 * An index.
 *
 * @class vdba.Index
 * @abstract
 */
function Index() {

}

/**
 * The database.
 *
 * @name table
 * @type {vdba.Database}
 * @memberof vdba.Index#
 * @abstract
 */
Index.prototype.__defineGetter__("database", function() {
  throw new Error("Abstract property.");
});

/**
 * The table.
 *
 * @name table
 * @type {vdba.Table}
 * @memberof vdba.Index#
 * @abstract
 */
Index.prototype.__defineGetter__("table", function() {
  throw new Error("Abstract property.");
});

/**
 * The index name.
 *
 * @name name
 * @type {String}
 * @memberof vdba.Index#
 * @abstract
 */
Index.prototype.__defineGetter__("name", function() {
  throw new Error("Abstract property.");
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