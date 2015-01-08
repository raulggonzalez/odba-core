describe("vdba.DefinitionCache", function() {
  var Database = vdba.Database;
  var Schema = vdba.Schema;
  var Table = vdba.Table;
  var DefinitionCache = vdba.DefinitionCache;
  var db, sch, sch2, schTbl, schTbl2, sch2Tbl, sch2Tbl2, cache;

  beforeEach(function() {
    cache = new DefinitionCache();
    db = new Database({}, "main");
    sch = new Schema(db, "one");
    sch2 = new Schema(db, "two");
    schTbl = new Table(sch, "one_one");
    schTbl2 = new Table(sch, "one_two");
    sch2Tbl = new Table(sch2, "two_one");
    sch2Tbl2 = new Table(sch2, "two_two");
  });

  describe("Schemas", function() {
    describe("#addSchema()", function() {
      describe("One schema", function() {
        it("addSchema(schema)", function() {
          var item;

          cache.addSchema(sch);
          item = cache.schemas[sch.name];
          item.should.be.instanceOf(DefinitionCache.SchemaItem);
          item.schema.should.be.exactly(sch);
          item.tables.should.be.eql({});
          Object.keys(cache.schemas).should.be.eql([sch.name]);
        });
      });

      describe("Two schemas", function() {
        it("Same schema", function() {
          var item;

          cache.addSchema(sch);
          cache.addSchema(sch);
          item = cache.schemas[sch.name];
          item.should.be.instanceOf(DefinitionCache.SchemaItem);
          item.schema.should.be.exactly(sch);
          item.tables.should.be.eql({});
          Object.keys(cache.schemas).should.be.eql([sch.name]);
        });

        it("Different schemas", function() {
          var item;

          cache.addSchema(sch);
          cache.addSchema(sch2);

          Object.keys(cache.schemas).should.be.eql([sch.name, sch2.name]);

          item = cache.schemas[sch.name];
          item.should.be.instanceOf(DefinitionCache.SchemaItem);
          item.schema.should.be.exactly(sch);
          item.tables.should.be.eql({});

          item = cache.schemas[sch2.name];
          item.should.be.instanceOf(DefinitionCache.SchemaItem);
          item.schema.should.be.exactly(sch2);
          item.tables.should.be.eql({});
        });
      });
    });

    describe("#getSchema()", function() {
      beforeEach(function() {
        cache.addSchema(sch);
      });

      it("getSchema(name)", function() {
        cache.getSchema(sch.name).should.be.exactly(sch);
      });

      it("getSchema('unknown')", function() {
        should.assert(cache.getSchema("unknown") === undefined);
      });
    });

    describe("#hasSchema()", function() {
      beforeEach(function() {
        cache.addSchema(sch);
      });

      it("hasSchema(name)", function() {
        cache.hasSchema(sch.name).should.be.eql(true);
      });

      it("hasSchema('unknown')", function() {
        cache.hasSchema("unknown").should.be.eql(false);
      });
    });

    describe("#removeSchema()", function() {
      beforeEach(function() {
        cache.addSchema(sch);
      });

      it("removeSchema(name)", function() {
        cache.removeSchema(sch.name);
        Object.keys(cache.schemas).should.be.eql([]);
      });

      it("removeSchema('unknown')", function() {
        cache.removeSchema("unknown");
        Object.keys(cache.schemas).should.be.eql([sch.name]);
      });
    });
  });

  describe("Tables", function() {
    describe("#addTable()", function() {
      describe("One table", function() {
        it("addTable(table)", function() {
          var item;

          cache.addTable(schTbl);

          Object.keys(cache.schemas).should.be.eql([sch.name]);

          item = cache.schemas[sch.name];
          item.schema.should.be.exactly(sch);
          Object.keys(item.tables).should.be.eql([schTbl.name]);
        });
      });

      describe("Several tables", function() {
        describe("Same schema", function() {
          it("Same table", function() {
            var item;

            cache.addTable(schTbl);
            cache.addTable(schTbl);

            Object.keys(cache.schemas).should.be.eql([sch.name]);

            item = cache.schemas[sch.name];
            item.schema.should.be.exactly(sch);
            Object.keys(item.tables).should.be.eql([schTbl.name]);
            item.tables[schTbl.name].should.be.exactly(schTbl);
          });

          it("Different tables", function() {
            var item;

            cache.addTable(schTbl);
            cache.addTable(schTbl2);

            Object.keys(cache.schemas).should.be.eql([sch.name]);

            item = cache.schemas[sch.name];
            item.schema.should.be.exactly(sch);
            Object.keys(item.tables).should.be.eql([schTbl.name, schTbl2.name]);
            item.tables[schTbl.name].should.be.exactly(schTbl);
            item.tables[schTbl2.name].should.be.exactly(schTbl2);
          });
        });

        describe("Different schemas", function() {
          it("Different tables", function() {
            var item;

            cache.addTable(schTbl);
            cache.addTable(schTbl2);
            cache.addTable(sch2Tbl);
            cache.addTable(sch2Tbl2);

            Object.keys(cache.schemas).should.be.eql([sch.name, sch2.name]);

            item = cache.schemas[sch.name];
            item.schema.should.be.exactly(sch);
            Object.keys(item.tables).should.be.eql([schTbl.name, schTbl2.name]);
            item.tables[schTbl.name].should.be.exactly(schTbl);
            item.tables[schTbl2.name].should.be.exactly(schTbl2);

            item = cache.schemas[sch2.name];
            item.schema.should.be.exactly(sch2);
            Object.keys(item.tables).should.be.eql([sch2Tbl.name, sch2Tbl2.name]);
            item.tables[sch2Tbl.name].should.be.exactly(sch2Tbl);
            item.tables[sch2Tbl2.name].should.be.exactly(sch2Tbl2);
          });
        });
      });
    });

    describe("#hasTable()", function() {
      beforeEach(function() {
        cache.addTable(schTbl);
        cache.addTable(schTbl2);
        cache.addTable(sch2Tbl);
        cache.addTable(sch2Tbl2);
      });

      it("hasTable(schema, table)", function() {
        cache.hasTable(sch.name, schTbl.name).should.be.eql(true);
      });

      it("hasTable(schema, 'unknown')", function() {
        cache.hasTable(sch.name, "unknown").should.be.eql(false);
      });

      it("hasTable('unknown', table)", function() {
        cache.hasTable("unknown", schTbl.name).should.be.eql(false);
      });

      it("hasTable('unknown', 'unknown')", function() {
        cache.hasTable("unknown", "unknown").should.be.eql(false);
      });
    });

    describe("#getTable()", function() {
      beforeEach(function() {
        cache.addTable(schTbl);
        cache.addTable(schTbl2);
        cache.addTable(sch2Tbl);
        cache.addTable(sch2Tbl2);
      });

      it("getTable(schema, table)", function() {
        cache.getTable(sch.name, schTbl.name).should.be.exactly(schTbl);
      });

      it("getTable(schema, 'unknown')", function() {
        should.assert(cache.getTable(sch.name, "unknown") === undefined);
      });

      it("getTable('unknown', table)", function() {
        should.assert(cache.getTable("unknown", schTbl.name) === undefined);
      });

      it("getTable('unknown', 'unknown')", function() {
        should.assert(cache.getTable("unknown", "unknown") === undefined);
      });
    });

    describe("#removeTable()", function() {
      beforeEach(function() {
        cache.addTable(schTbl);
        cache.addTable(schTbl2);
        cache.addTable(sch2Tbl);
        cache.addTable(sch2Tbl2);
      });

      it("removeTable(schema, table)", function() {
        var item;

        cache.removeTable(sch.name, schTbl.name);

        Object.keys(cache.schemas).should.be.eql([sch.name, sch2.name]);

        item = cache.schemas[sch.name];
        Object.keys(item.tables).should.be.eql([schTbl2.name]);

        item = cache.schemas[sch2.name];
        Object.keys(item.tables).should.be.eql([sch2Tbl.name, sch2Tbl2.name]);
      });

      it("removeTable(schema, 'unknown')", function() {
        var item;

        cache.removeTable(sch.name, "unknown");

        Object.keys(cache.schemas).should.be.eql([sch.name, sch2.name]);

        item = cache.schemas[sch.name];
        Object.keys(item.tables).should.be.eql([schTbl.name, schTbl2.name]);

        item = cache.schemas[sch2.name];
        Object.keys(item.tables).should.be.eql([sch2Tbl.name, sch2Tbl2.name]);
      });

      it("removeTable('unknown', table)", function() {
        var item;

        cache.removeTable("unknown", schTbl.name);

        Object.keys(cache.schemas).should.be.eql([sch.name, sch2.name]);

        item = cache.schemas[sch.name];
        Object.keys(item.tables).should.be.eql([schTbl.name, schTbl2.name]);

        item = cache.schemas[sch2.name];
        Object.keys(item.tables).should.be.eql([sch2Tbl.name, sch2Tbl2.name]);
      });

      it("removeTable('unknown', 'unknown')", function() {
        var item;

        cache.removeTable("unknown", "unknown");

        Object.keys(cache.schemas).should.be.eql([sch.name, sch2.name]);

        item = cache.schemas[sch.name];
        Object.keys(item.tables).should.be.eql([schTbl.name, schTbl2.name]);

        item = cache.schemas[sch2.name];
        Object.keys(item.tables).should.be.eql([sch2Tbl.name, sch2Tbl2.name]);
      });
    });
  });
});