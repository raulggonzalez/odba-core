describe("vdba.Query", function() {
  var qry = new vdba.Query();

  describe("#mapAll()", function() {
    describe("Error handling", function() {
      it("mapAll()", function() {
        (function() {
          qry.mapAll();
        }).should.throwError("Map expected.");
      });

      it("mapAll(map)", function() {
        (function() {
          qry.mapAll({});
        }).should.throwError("Callback expected.");
      });
    });
  });

  describe("#map()", function() {
    describe("Error handling", function() {
      it("map()", function() {
        (function() {
          qry.map();
        }).should.throwError("Map expected.");
      });

      it("map(map)", function() {
        (function() {
          qry.map({});
        }).should.throwError("Callback expected.");
      });

      it("map(map, filter)", function() {
        (function() {
          qry.map({}, {});
        }).should.throwError("Callback expected.");
      });
    });
  });

  describe("#mapOne()", function() {
    describe("Error handling", function() {
      it("mapOne()", function() {
        (function() {
          qry.mapOne();
        }).should.throwError("Map expected.");
      });

      it("mapOne(map)", function() {
        (function() {
          qry.mapOne({});
        }).should.throwError("Callback expected.");
      });

      it("mapOne(map, filter)", function() {
        (function() {
          qry.mapOne({}, {});
        }).should.throwError("Callback expected.");
      });
    });
  });
});