/**
 * @classdesc A database.
 * @class vdba.Database
 * @abstract
 * @protected
 *
 * @param {Connection} cx The connection to the creates it.
 * @param {String} name   The database name.
 */
function Database(cx, name) {
  //(1) pre: arguments
  if (!name)  throw new Error("Database name expected.");

  //(2) initialize
  /**
   * The connection to use.
   *
   * @name connection
   * @type {vdba.sqlite.SQLiteConnection}
   * @memberof vdba.sqlite.SQLiteDatabase#
   */
  Object.defineProperty(this, "connection", {value: cx});

  /**
   * The database name.
   *
   * @name name
   * @type {String}
   * @memberof vdba.Database#
   */
  Object.defineProperty(this, "name", {value: name.toLowerCase(), enumerable: true});

  /**
   * The table definition cache.
   *
   * @name definitionCache
   * @type {vdba.DefinitionCache}
   * @memberof vdba.Database#
   * @protected
   */
  Object.defineProperty(this, "definitionCache", {value: new vdba.DefinitionCache()});
}

/**
 * Checks whether a schema exists.
 *
 * @name hasSchema
 * @function
 * @memberof vdba.Database#
 *
 * @param {String} name       The schema name.
 * @param {Function} callback The function to call: fn(error, exists).
 */
Database.prototype.hasSchema = function hasSchema(name, callback) {
  //(1) pre: arguments
  if (!name) throw new Error("Schema name expected.");
  if (!callback) throw new Error("Callback expected.");

  //(2) check
  this.findSchema(name, function(error, sch) {
    if (error) callback(error);
    else callback(undefined, !!sch);
  });
};

/**
 * Finds a schema.
 *
 * @name findSchema
 * @function
 * @memberof vdba.Database#
 *
 * @param {String} name       The schema name.
 * @param {Function} callback The function to call: fn(error, schema).
 */
Database.prototype.findSchema = function findSchema(name, callback) {
  var self = this, sch;

  //(1) pre: arguments
  if (!name) throw new Error("Schema name expected.");
  if (!callback) throw new Error("Callback expected.");

  //(2) find
  sch = this.definitionCache.getSchema(name);

  if (sch) {
    callback(undefined, sch);
  } else {
    this.readSchema(name, function(error, sch) {
      if (error) {
        callback(error);
      } else {
        if (sch) self.definitionCache.addSchema(sch);
        callback(undefined, sch);
      }
    });
  }
};

/**
 * Reads a schema.
 * This method is called by the driver internally for getting the schema info.
 *
 * @name readSchema
 * @function
 * @memberof vdba.Database#
 * @protected
 * @abstract
 *
 * @param {String} name       The schema name.
 * @param {Function} callback The function to call: fn(error, schema).
 */
Database.prototype.readSchema = function readSchema() {
  throw new Error("Abstract method.");
};

if (SPEC_TYPE > 1) {
  /**
   * Creates a schema.
   *
   * @name createSchema
   * @function
   * @memberof vdba.Database#
   * @abstract
   *
   * @param {String} name         The schema name.
   * @param {Object} [options]    The create options.
   * @param {Function} [callback] The function to call: fn(error).
   */
  Database.prototype.createSchema = function createSchema() {
    throw new Error("Abstract method.");
  };

  /**
   * Drops a schema.
   *
   * @name dropSchema
   * @function
   * @memberof vdba.Database#
   * @abstract
   *
   * @param {String} name         The schema names.
   * @param {Object} [options]    The drop options.
   * @param {Function} [callback] The function to call: fn(error).
   */
  Database.prototype.dropSchema = function dropSchema() {
    throw new Error("Abstract method.");
  };
}

/**
 * Checks whether a table exists.
 *
 * @name hasTable
 * @function
 * @memberof vdba.Database#
 *
 * @param {String} schema     The schema name.
 * @param {String} table      The table name.
 * @param {Object} [columns]  The table schema (columns).
 * @param {Function} callback The function to call: fn(exists).
 */
Database.prototype.hasTable = function hasTable(schema, table, columns, callback) {
  //(1) pre: arguments
  if (arguments.length == 3 && arguments[2] instanceof Function) {
    callback = arguments[2];
    columns = undefined;
  }

  if (!schema) throw new Error("Schema name expected.");
  if (!table) throw new Error("Table name expected.");
  if (!callback) throw new Error("Callback expected.");

  //(2) find
  this.findTable(schema, table, function(error, tbl) {
    if (error) {
      callback(error);
    } else {
      if (tbl) callback(undefined, (columns ? tbl.checkSchema(columns) : true));
      else callback(undefined, false);
    }
  });
};

/**
 * Checks whether severall tables exist.
 *
 * @name hasTables
 * @function
 * @memberof vdba.Database#
 *
 * @param {String} schema     The schema name.
 * @param {String[]} tables   The table names.
 * @param {Function} callback The function to call: fn(error, exist).
 */
Database.prototype.hasTables = function hasTables(schema, tables, callback) {
  var self = this, i;

  //(1) pre: arguments
  if (!schema) throw new Error("Schema name expected.");
  if (!tables || (tables instanceof Array && tables.length === 0)) throw new Error("Table names expected.");
  if (!callback) throw new Error("Callback expected.");

  //(2) check
  i = 0;
  check();

  //helper functions
  function check() {
    if (i < tables.length) {
      self.hasTable(schema, tables[i], function(error, exists) {
        if (error) {
          callback(error);
        } else {
          if (exists) {
            ++i;
            check();
          } else {
            callback(undefined, false);
          }
        }
      });
    } else {
      callback(undefined, true);
    }
  }
};

/**
 * Returns a table.
 *
 * @name findTable
 * @function
 * @memberof vdba.Database#
 *
 * @param {String} schema     The schema name.
 * @param {String} table      The table name.
 * @param {Function} callback The function to call: fn(error, table).
 */
Database.prototype.findTable = function findTable(schema, table, callback) {
  var self = this, tbl;

  //(1) pre: arguments
  if (!schema) throw new Error("Schema name expected.");
  if (!table) throw new Error("Table name expected.");
  if (!callback) throw new Error("Callback expected.");

  //(2) find
  tbl = this.definitionCache.getTable(schema, table);

  if (tbl) {
    callback(undefined, tbl);
  } else {
    this.readTable(schema, table, function(error, tbl) {
      if (error) {
        callback(error);
      } else {
        if (tbl) self.definitionCache.addTable(tbl);
        callback(undefined, tbl);
      }
    });
  }
};

/**
 * Reads the table info.
 * The user must use the findTable() method; the readTable() method is used
 * by the driver internally.
 *
 * @name readTable
 * @function
 * @memberof vdba.Database#
 * @abstract
 * @protected
 *
 * @param {String} schema     The schema name.
 * @param {String} table      The table name.
 * @param {Function} callback The function to call: fn(error, table).
 */
Database.prototype.readTable = function readTable() {
  throw new Error("Abstract method.");
};

if (SPEC_TYPE > 1) {
  /**
   * Creates a new table.
   *
   * @name createTable
   * @function
   * @memberof vdba.Database#
   * @abstract
   *
   * @param {String} schema       The schema name.
   * @param {String} table        The table name.
   * @param {Object} [columns]    The columns.
   * @param {Object} [options]    The creation options.
   * @param {Function} [callback] The function to call: fn(error, table).
   */
  Database.prototype.createTable = function createTable() {
    throw new Error("Abstract method.");
  };

  /**
   * Drops a table.
   *
   * @name dropTable
   * @function
   * @memberof vdba.Database#
   * @abstract
   *
   * @param {String} schema       The schema name.
   * @param {String} table        The table name.
   * @param {Function} [callback] The function to call: fn(error).
   */
  Database.prototype.dropTable = function dropTable() {
    throw new Error("Abstract method.");
  };

  /**
   * Finds an index.
   *
   * @name findIndex
   * @function
   * @memberof vdba.Database#
   * @abstract
   *
   * @param {String} schema     The schema name.
   * @param {String} index      The index name.
   * @param {Function} callback The function to call: fn(error, index).
   */
  Database.prototype.findIndex = function findIndex() {
    throw new Error("Abstract method.");
  };

  /**
   * Checks whether an index exists.
   *
   * @name hasIndex
   * @function
   * @memberof vdba.Database#
   *
   * @param {String} schema     The schema name.
   * @param {String} index      The index name.
   * @param {Function} callback The function to call: fn(error, exists).
   */
  Database.prototype.hasIndex = function hasIndex(schema, index, callback) {
    //(1) pre: arguments
    if (!schema) throw new Error("Schema expected.");
    if (!index) throw new Error("Index name expected.");
    if (!callback) throw new Error("Callback expected.");

    //(2) find index
    this.findIndex(schema, index, function(error, ix) {
      if (error) callback(error);
      else callback(undefined, !!ix);
    });
  };

  /**
   * Creates an index on a table.
   *
   * @name createIndex
   * @function
   * @memberof vdba.Database#
   * @abstract
   *
   * @param {String} schema         The schema name.
   * @param {String} table          The table name.
   * @param {String} index          The index name.
   * @param {String|String[]} cols  The indexing columns.
   * @param {Object} [options]      The index options.
   * @param {Function} [callback]   The function to call: fn(error).
   */
  Database.prototype.createIndex = function createIndex() {
    throw new Error("Abstract method.");
  };

  /**
   * Drops an index.
   *
   * @name dropIndex
   * @function
   * @memberof vdba.Database#
   * @abstract
   *
   * @param {String} schema       The schema name.
   * @param {String} index        The index name.
   * @param {Function} [callback] The function to call: fn(error).
   */
  Database.prototype.dropIndex = function dropIndex() {
    throw new Error("Abstract method.");
  };
}