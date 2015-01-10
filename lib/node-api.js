//imports
var util = require("util");

//api
var vdba = module.exports;

/**
 * The vdba package.
 *
 * @namespace vdba
 */
Object.defineProperty(vdba, "util", {
  value: {
    inherits: util.inherits,
    _extend: util._extend
  }
});

Object.defineProperty(vdba, "Aggregator", {value: Aggregator, enumerable: true});
Object.defineProperty(vdba, "Column", {value: Column, enumerable: true});
Object.defineProperty(vdba, "Combinator", {value: Combinator, enumerable: true});
Object.defineProperty(vdba, "Connection", {value: Connection, enumerable: true});
Object.defineProperty(vdba, "Database", {value: Database, enumerable: true});
Object.defineProperty(vdba, "DefinitionCache", {value: DefinitionCache, enumerable: false});
Object.defineProperty(vdba, "Driver", {value: Driver, enumerable: true});
Object.defineProperty(vdba, "Filter", {value: Filter, enumerable: true});
Object.defineProperty(vdba, "Index", {value: Index, enumerable: true});
Object.defineProperty(vdba, "Join", {value: Join, enumerable: true});
Object.defineProperty(vdba, "Mapper", {value: Mapper, enumerable: true});
Object.defineProperty(vdba, "Query", {value: Query, enumerable: true});
Object.defineProperty(vdba, "Result", {value: Result, enumerable: true});
Object.defineProperty(vdba, "Schema", {value: Schema, enumerable: true});
Object.defineProperty(vdba, "Server", {value: Server, enumerable: true});
Object.defineProperty(vdba, "Table", {value: Table, enumerable: true});