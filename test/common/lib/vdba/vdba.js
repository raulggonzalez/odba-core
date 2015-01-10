describe("vdba", function() {
  describe("Namespacing", function() {
    it("vdba.Aggregator", function() {
      vdba.should.have.property("Aggregator");
    });

    it("vdba.Column", function() {
      vdba.should.have.property("Column");
    });

    it("vdba.Combinator", function() {
      vdba.should.have.property("Combinator");
    });

    it("vdba.Connection", function() {
      vdba.should.have.property("Connection");
    });

    it("vdba.Database", function() {
      vdba.should.have.property("Database");
    });

    it("vdba.DefinitionCache", function() {
      vdba.should.have.property("DefinitionCache");
    });

    it("vdba.Driver", function() {
      vdba.should.have.property("Driver");
    });

    it("vdba.Filter", function() {
      vdba.should.have.property("Filter");
    });

    it("vdba.Index", function() {
      vdba.should.have.property("Index");
    });

    it("vdba.Join", function() {
      vdba.should.have.property("Join");
    });

    it("vdba.Mapper", function() {
      vdba.should.have.property("Mapper");
    });

    it("vdba.Query", function() {
      vdba.should.have.property("Query");
    });

    it("vdba.Result", function() {
      vdba.should.have.property("Result");
    });

    it("vdba.Schema", function() {
      vdba.should.have.property("Schema");
    });

    it("vdba.Server", function() {
      vdba.should.have.property("Server");
    });

    it("vdba.Table", function() {
      vdba.should.have.property("Table");
    });
  });
});