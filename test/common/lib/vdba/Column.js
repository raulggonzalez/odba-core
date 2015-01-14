describe("vdba.Column", function() {
  var userId, username, password, nick;

  before(function() {
    userId = new vdba.Column("userId", "sequence", {id: true});
    username = new vdba.Column("uername", "text", {unique: true, required: true});
    password = new vdba.Column("password", "text", {required: true});
    nick = new vdba.Column("nick", "text");
  });

  describe("#checkDefinition()", function() {
    describe("Error handling", function() {
      it("checkDefinition()", function() {
        (function() {
          userId.checkDefinition();
        }).should.throwError("Column definition to check expected.");
      });
    });

    describe("checkDefinition(String)", function() {
      it("checkDefinition('type') : true", function() {
        userId.checkDefinition("sequence").should.be.eql(true);
      });

      it("checkDefinition('type') : false", function() {
        userId.checkDefinition("integer").should.be.eql(false);
      });
    });

    describe("checkDefinition(Object)", function() {
      describe("Simple", function() {
        it("checkDefinition({type: type}) : true", function() {
          userId.checkDefinition({type: "sequence"}).should.be.eql(true);
        });

        it("checkDefinition({type: type}) : false", function() {
          userId.checkDefinition({type: "int"}).should.be.eql(false);
        });

        it("checkDefinition({id: true}) : true", function() {
          userId.checkDefinition({id: true}).should.be.eql(true);
        });

        it("checkDefinition({id: true}) : false", function() {
          username.checkDefinition({id: true}).should.be.eql(false);
        });

        it("checkDefinition({unique: true}) : true", function() {
          username.checkDefinition({unique: true}).should.be.eql(true);
        });

        it("checkDefinition({unique: true}) : false", function() {
          password.checkDefinition({unique: true}).should.be.eql(false);
        });

        it("checkDefinition({unique: true}) : true - Id column", function() {
          userId.checkDefinition({unique: true}).should.be.eql(true);
        });

        it("checkDefinition({required: true}) : true", function() {
          username.checkDefinition({required: true}).should.be.eql(true);
        });

        it("checkDefinition({required: true}) : false", function() {
          nick.checkDefinition({required: true}).should.be.eql(false);
        });

        it("checkDefinition({required: true}) : true - Id column", function() {
          userId.checkDefinition({required: true}).should.be.eql(true);
        });

        it("checkDefinition({unknown: value}) : false", function() {
          userId.checkDefinition({unknown: true}).should.be.eql(false);
        });
      });

      describe("Compound", function() {
        it("checkDefinition({type: value, required: value}) : true - true and true", function() {
          username.checkDefinition({type: "text", required: true}).should.be.eql(true);
        });

        it("checkDefinition({type: value, required: value}) : false - true and false", function() {
          username.checkDefinition({type: "text", required: false}).should.be.eql(false);
        });

        it("checkDefinition({type: value, required: value}) : false - false and true", function() {
          username.checkDefinition({type: "blob", required: true}).should.be.eql(false);
        });

        it("checkDefinition({type: value, required: value}) : false - false and false", function() {
          username.checkDefinition({type: "blob", required: false}).should.be.eql(false);
        });
      });
    });
  });
});