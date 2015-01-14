describe("vdba.Table", function() {
  var Table = vdba.Table;
  var Column = vdba.Column;
  var user;

  before(function() {
    user = new Table({name: "auth"}, "user", {
      userId: new Column("userId", "sequence", {id: true}),
      username: new Column("username", "text", {unique: true, required: true}),
      password: new Column("password", "text", {required: true})
    });
  });

  describe("#checkDefinition()", function() {
    describe("Error handling", function() {
      it("checkDefinition()", function() {
        (function() {
          user.checkDefinition();
        }).should.throwError("Column(s) to check expected.");
      });
    });

    describe("No columns", function() {
      it("checkDefinition({})", function() {
        user.checkDefinition({}).should.be.eql(true);
      });
    });

    describe("One column", function() {
      it("checkDefinition({col: 'type'}) : true", function() {
        user.checkDefinition({userId: "sequence"}).should.be.eql(true);
      });

      it("checkDefinition({col: 'type'}) : false", function() {
        user.checkDefinition({userId: "text"}).should.be.eql(false);
      });

      it("checkDefinition({col: {type: 'type'}}) : true", function() {
        user.checkDefinition({userId: {type: "sequence"}}).should.be.eql(true);
      });

      it("checkDefinition({col: {type: 'type'}}) : false", function() {
        user.checkDefinition({userId: {type: "text"}}).should.be.eql(false);
      });
    });

    describe("Two columns", function() {
      it("checkDefinition(columns) : true - true and true", function() {
        user.checkDefinition({userId: "sequence", username: "text"}).should.be.eql(true);
      });

      it("checkDefinition(columns) : false - true and false", function() {
        user.checkDefinition({userId: "sequence", username: "integer"}).should.be.eql(false);
      });

      it("checkDefinition(columns) : false - false and true", function() {
        user.checkDefinition({userId: "text", username: "text"}).should.be.eql(false);
      });

      it("checkDefinition(columns) : false - false and false", function() {
        user.checkDefinition({userId: "text", username: "sequence"}).should.be.eql(false);
      });
    });
  });
});