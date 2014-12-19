describe("odba - Browser", function() {
  describe("Namespacing", function() {
    it("!window.Combinator", function() {
      window.should.not.have.property("Combinator");
    });

    it("!window.Connection", function() {
      window.should.not.have.property("Connection");
    });

    it("!window.Database", function() {
      window.should.not.have.property("Database");
    });

    it("!window.Driver", function() {
      window.should.not.have.property("Driver");
    });

    it("!window.Index", function() {
      window.should.not.have.property("Index");
    });

    it("!window.Query", function() {
      window.should.not.have.property("Query");
    });

    it("!window.Result", function() {
      window.should.not.have.property("Result");
    });

    it("!window.ResultFilter", function() {
      window.should.not.have.property("ResultFilter");
    });

    it("!window.Server", function() {
      window.should.not.have.property("Server");
    });

    it("!window.Table", function() {
      window.should.not.have.property("Table");
    });
  });
});