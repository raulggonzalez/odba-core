describe("vdba", function() {
  describe("Namespacing", function() {
    it("vdba.Combinator", function() {
      vdba.should.have.property("Combinator");
    });

    it("vdba.Connection", function() {
      vdba.should.have.property("Connection");
    });

    it("vdba.Database", function() {
      vdba.should.have.property("Database");
    });

    it("vdba.Driver", function() {
      vdba.should.have.property("Driver");
    });

    it("vdba.Index", function() {
      vdba.should.have.property("Index");
    });

    it("vdba.Query", function() {
      vdba.should.have.property("Query");
    });

    it("vdba.Result", function() {
      vdba.should.have.property("Result");
    });

    it("vdba.ResultFilter", function() {
      vdba.should.have.property("ResultFilter");
    });

    it("vdba.Server", function() {
      vdba.should.have.property("Server");
    });

    it("vdba.Table", function() {
      vdba.should.have.property("Table");
    });
  });
});