describe("odba.Mapper", function() {
  var Result = odba.Result;
  var mapper = new odba.Mapper();

  function User() {}

  function map(row) {
    var res = {};

    res.userId = row.userid;
    res.username = row.username;
    res.password = row.password;

    return res;
  }

  var rows = [
    {userid: 1, username: "user01", password: "pwd01"},
    {userid: 2, username: "user02", password: "pwd02"},
    {userid: 3, username: "user03", password: "pwd03"}
  ];

  var camelRows = [
    {userId: 1, username: "user01", password: "pwd01"},
    {userId: 2, username: "user02", password: "pwd02"},
    {userId: 3, username: "user03", password: "pwd03"}
  ];

  var result = new Result(rows);

  describe("#mapRow()", function() {
    var row = {userid: 1, username: "user01", password: "pwd01"};
    var camelRow = {userId: 1, username: "user01", password: "pwd01"};

    describe("Custom map", function() {
      it("mapRow(fn, row)", function() {
        var res = mapper.mapRow(map, row);
        res.should.be.eql(camelRow);
      });
    });

    describe("Default map", function() {
      it("mapRow({clss: Class}, row)", function() {
        var res = mapper.mapRow({clss: User}, row);
        res.should.be.instanceOf(User);
        res.should.have.properties(row);
      });

      it("mapRow({map: [...]}, row)", function() {
        mapper.mapRow({map: ["userId"]}, row).should.be.eql(camelRow);
      });

      it("mapRow({map: {...}}, row)", function() {
        mapper.mapRow({map: {userid: "userId"}}, row).should.be.eql(camelRow);
      });

      it("mapRow({clss: Class, map: [...], row)", function() {
        var res = mapper.mapRow({clss: User, map: ["userId"]}, row);
        res.should.be.instanceOf(User);
        res.should.have.properties(camelRow);
      });

      it("mapRow({clss: Class, map: {...}, row)", function() {
        var res = mapper.mapRow({clss: User, map: {userid: "userId"}}, row);
        res.should.be.instanceOf(User);
        res.should.have.properties(camelRow);
      });

      it("mapRow([...], row)", function() {
        mapper.mapRow(["userId"], row).should.be.eql(camelRow);
      });
    });
  });

  describe("#mapRows()", function() {
    describe("Custom map", function() {
      it("mapRows(fn, rows)", function() {
        mapper.mapRows(map, rows).should.be.eql(camelRows);
      });
    });

    describe("Default map", function() {
      it("mapRows({clss: Class}, rows)", function() {
        var res = mapper.mapRows({clss: User}, rows);

        for (var i = 0; i < res.length; ++i) {
          var row = res[i];
          var auxRow = rows[i];

          row.should.be.instanceOf(User);
          row.should.have.properties(auxRow);
        }
      });

      it("mapRows({map: [...], rows)", function() {
        mapper.mapRows({map: ["userId"]}, rows).should.be.eql(camelRows);
      });

      it("mapRows(map: {...}, rows)", function() {
        mapper.mapRows({map: {userid: "userId"}}, rows).should.be.eql(camelRows);
      });

      it("mapRows({clss: Class, map: [...]}, rows)", function() {
        var res = mapper.mapRows({clss: User, map: ["userId"]}, rows);

        for (var i = 0; i < res.length; ++i) {
          var row = res[i];
          var camelRow = camelRows[i];

          row.should.be.instanceOf(User);
          row.should.have.properties(camelRow);
        }
      });

      it("mapRows({clss: Class, map: {...}}, rows)", function() {
        var res = mapper.mapRows({clss: User, map: {userid: "userId"}}, rows);

        for (var i = 0; i < res.length; ++i) {
          var row = res[i];
          var camelRow = camelRows[i];

          row.should.be.instanceOf(User);
          row.should.have.properties(camelRow);
        }
      });

      it("mapRows([...], rows)", function() {
        mapper.mapRows(["userId"], rows).should.be.eql(camelRows);
      });
    });
  });

  describe("#mapResult()", function() {
    describe("Custom map", function() {
      it("mapResult(fn, rows)", function() {
        var res = mapper.mapResult(map, result);

        res.should.be.instanceOf(Result);
        res.should.not.be.exactly(result);
        res.rows.should.be.eql(camelRows);
      });
    });

    describe("Default map", function() {
      it("mapResult({clss: Class}, result)", function() {
        var res = mapper.mapResult({clss: User}, result);

        res.should.be.instanceOf(Result);
        res.should.not.be.exactly(result);

        for (var i = 0; i < res.length; ++i) {
          var row = res.rows[i];

          row.should.be.instanceOf(User);
          row.should.have.properties(rows[i]);
        }
      });

      it("mapResult({map: [...], result)", function() {
        var res = mapper.mapResult({map: ["userId"]}, result);
        res.should.be.instanceOf(Result);
        res.should.not.be.exactly(result);
        res.rows.should.be.eql(camelRows);
      });

      it("mapResult(map: {...}, result)", function() {
        var res = mapper.mapResult({map: {userid: "userId"}}, result);
        res.should.be.instanceOf(Result);
        res.should.not.be.exactly(result);
        res.rows.should.be.eql(camelRows);
      });

      it("mapResult({clss: Class, map: [...]}, result)", function() {
        var res = mapper.mapResult({clss: User, map: ["userId"]}, result);

        res.should.be.instanceOf(Result);
        res.should.not.be.exactly(result);

        for (var i = 0; i < res.length; ++i) {
          var row = res.rows[i];

          row.should.be.instanceOf(User);
          row.should.have.properties(camelRows[i]);
        }
      });

      it("mapResult({clss: Class, map: {...}}, result)", function() {
        var res = mapper.mapResult({clss: User, map: {userid: "userId"}}, result);

        res.should.be.instanceOf(Result);
        res.should.not.be.exactly(result);

        for (var i = 0; i < res.length; ++i) {
          var row = res.rows[i];

          row.should.be.instanceOf(User);
          row.should.have.properties(camelRows[i]);
        }
      });

      it("mapResult([...], result)", function() {
        var res = mapper.mapResult(["userId"], result);
        res.should.be.instanceOf(Result);
        res.should.not.be.exactly(result);
        res.rows.should.be.eql(camelRows);
      });
    });
  });

  describe("#map()", function() {
    it("map(map, rows)", function() {
      mapper.map(["userId"], rows).should.be.eql(camelRows);
    });

    it("map(map, result)", function() {
      mapper.map(["userId"], result).should.be.instanceOf(Result);
    });
  });
});