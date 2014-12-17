//imports
var util = require("util");

//api
var odba = module.exports;

/**
 * The odba package.
 *
 * @namespace odba
 */
Object.defineProperty(odba, "util", {
  value: {
    inherits: util.inherits,
    _extend: util._extend
  }
});

Object.defineProperty(odba, "Combinator", {value: Combinator, enumerable: true});
Object.defineProperty(odba, "Connection", {value: Connection, enumerable: true});
Object.defineProperty(odba, "Database", {value: Database, enumerable: true});
Object.defineProperty(odba, "Driver", {value: Driver, enumerable: true});
Object.defineProperty(odba, "Index", {value: Index, enumerable: true});
Object.defineProperty(odba, "Query", {value: Query, enumerable: true});
Object.defineProperty(odba, "Result", {value: Result, enumerable: true});
Object.defineProperty(odba, "ResultFilter", {value: ResultFilter, enumerable: true});
Object.defineProperty(odba, "Table", {value: Table, enumerable: true});