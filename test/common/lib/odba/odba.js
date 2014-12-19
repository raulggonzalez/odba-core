describe("odba", function() {
  describe("Namespacing", function() {
    it("odba.Combinator", function() {
      odba.should.have.property("Combinator");
    });

    it("odba.Connection", function() {
      odba.should.have.property("Connection");
    });

    it("odba.Database", function() {
      odba.should.have.property("Database");
    });

    it("odba.Driver", function() {
      odba.should.have.property("Driver");
    });

    it("odba.Index", function() {
      odba.should.have.property("Index");
    });

    it("odba.Query", function() {
      odba.should.have.property("Query");
    });

    it("odba.Result", function() {
      odba.should.have.property("Result");
    });

    it("odba.ResultFilter", function() {
      odba.should.have.property("ResultFilter");
    });

    it("odba.Server", function() {
      odba.should.have.property("Server");
    });

    it("odba.Table", function() {
      odba.should.have.property("Table");
    });
  });
});