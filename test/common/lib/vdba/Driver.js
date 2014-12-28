describe("vdba.Driver", function() {
  var Driver = vdba.Driver;

  describe("#register()", function() {
    describe("Error handling", function() {
      it("register()", function() {
        (function() {
          Driver.register();
        }).should.throwError("Driver expected.");
      });

      it("register(undefined)", function() {
        (function() {
          Driver.register(undefined);
        }).should.throwError("Driver expected.");
      });

      it("register(null)", function() {
        (function() {
          Driver.register(null);
        }).should.throwError("Driver expected.");
      });
    });

    it("register(IndexedDB)", function() {
      var drv = new Driver("IndexedDB");

      Driver.register(drv);
      Driver.cache.indexeddb.should.be.exactly(drv);
    });

    it("register(Cassandra)", function() {
      var drv = new Driver("Cassandra", "C*");

      Driver.register(drv);
      Driver.cache.cassandra.should.be.exactly(drv);
      Driver.cache["c*"].should.be.exactly(drv);
    });
  });

  describe("#getDriver()", function() {
    describe("Error handling", function() {
      it("getDriver()", function() {
        (function() {
          Driver.getDriver();
        }).should.throwError("Driver name expected.");
      });
    });

    it("getDriver(name)", function() {
      var drv = Driver.getDriver("Cassandra");
      drv.name.should.be.eql("Cassandra");
    });

    it("getDriver(alias)", function() {
      var drv = Driver.getDriver("C*");
      drv.name.should.be.eql("Cassandra");
    });

    it("getDriver('Unknown')", function() {
      should.assert(Driver.getDriver("Unknown") === undefined);
    });
  });
});