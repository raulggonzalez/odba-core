/**
 * The odba package.
 *
 * @namespace odba
 */
Object.defineProperty(window, "odba", {value: {}, enumerable: true});

Object.defineProperty(odba, "util", {
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

Object.defineProperty(odba, "Combinator", {value: Combinator, enumerable: true});
Object.defineProperty(odba, "Connection", {value: Connection, enumerable: true});
Object.defineProperty(odba, "Database", {value: Database, enumerable: true});
Object.defineProperty(odba, "Driver", {value: Driver, enumerable: true});
Object.defineProperty(odba, "Index", {value: Index, enumerable: true});
Object.defineProperty(odba, "Mapper", {value: Mapper, enumerable: true});
Object.defineProperty(odba, "Query", {value: Query, enumerable: true});
Object.defineProperty(odba, "Result", {value: Result, enumerable: true});
Object.defineProperty(odba, "ResultFilter", {value: ResultFilter, enumerable: true});
Object.defineProperty(odba, "Server", {value: Server, enumerable: true});
Object.defineProperty(odba, "Table", {value: Table, enumerable: true});