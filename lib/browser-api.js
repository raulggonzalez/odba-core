/**
 * The vdba package.
 *
 * @namespace vdba
 */
Object.defineProperty(window, "vdba", {value: {}, enumerable: true});

Object.defineProperty(vdba, "util", {
  value: {
    inherits: function inherits(child, parent) {
      child.super_ = parent;
      child.prototype = Object.create(parent.prototype, {
        constructor: {
          value: child,
          enumerable: false,
          writable: true,
          configurable: true
        }
      });
    },

    _extend: function(origin, add) {
      if (typeof(add) == "object") {
        for (var i = 0, keys = Object.keys(add); i < keys.length; ++i) {
          var k = keys[i];
          origin[k] = add[k];
        }
      }

      return origin;
    },

    getBrowserName: function() {
      return window.chrome ? "Chrome" : "Other";
    }
  }
});

Object.defineProperty(vdba, "AggOperation", {value: AggOperation, enumerable: false});
Object.defineProperty(vdba, "Aggregator", {value: Aggregator, enumerable: true});
Object.defineProperty(vdba, "Column", {value: Column, enumerable: true});
Object.defineProperty(vdba, "Combinator", {value: Combinator, enumerable: true});
Object.defineProperty(vdba, "Connection", {value: Connection, enumerable: true});
Object.defineProperty(vdba, "Database", {value: Database, enumerable: true});
Object.defineProperty(vdba, "DefinitionCache", {value: DefinitionCache, enumerable: false});
Object.defineProperty(vdba, "Driver", {value: Driver, enumerable: true});
Object.defineProperty(vdba, "Filter", {value: Filter, enumerable: true});
Object.defineProperty(vdba, "GroupBy", {value: GroupBy, enumerable: true});
Object.defineProperty(vdba, "Index", {value: Index, enumerable: true});
Object.defineProperty(vdba, "Join", {value: Join, enumerable: true});
Object.defineProperty(vdba, "Mapper", {value: Mapper, enumerable: true});
Object.defineProperty(vdba, "Query", {value: Query, enumerable: true});
Object.defineProperty(vdba, "Result", {value: Result, enumerable: true});
Object.defineProperty(vdba, "Schema", {value: Schema, enumerable: true});
Object.defineProperty(vdba, "Server", {value: Server, enumerable: true});
Object.defineProperty(vdba, "Table", {value: Table, enumerable: true});