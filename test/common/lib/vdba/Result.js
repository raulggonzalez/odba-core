describe("vdba.Result", function() {
  var Result = vdba.Result;
  var result, rows;

  beforeEach(function() {
    rows = [
      {userId: 1, username: "user01", password: "pwd01", nick: "u01", emails: ["user01@test.com", "u01@test.com"]},
      {userId: 2, username: "user02", password: "pwd02", nick: "u02", emails: ["user02@test.com"]},
      {userId: 3, username: "user03", password: "pwd03"},
      {userId: 4, username: "usr04", password: "pwd04"},
      {userId: 5, username: "usr05", password: "pwd05"},
      {userId: 6, username: "usr06", password: "pwd06"},
      {userId: 7, username: "UsEr07", password: undefined},
      {userId: 8, username: "UsEr08", password: undefined},
      {userId: 9, username: "UsR09", password: null},
      {userId: 10, username: "UsR10", password: null}
    ];

    result = new Result(rows);
  });

  describe("Properties", function() {
    it("length", function() {
      result.length.should.be.eql(10);
    });

    it("rows", function() {
      result.rows.should.be.eql(rows);
    });
  });

  describe("#find()", function() {
    it("find()", function() {
      result.find().rows.should.be.eql(rows);
    });

    it("find({})", function() {
      result.find({}).rows.should.be.eql(rows);
    });

    it("find({prop: val})", function() {
      result.find({userId: 1}).rows.should.be.eql([rows[0]]);
    });

    it("find({prop: {$like: val}}", function() {
      result.find({username: {$like: "user*"}}).rows.should.be.eql([rows[0], rows[1], rows[2]]);
    });
  });
});