describe("vdba.Mapper", function() {
  var mapper = vdba.Mapper.mapper;

  function User() {}

  function map(row) {
    var res = {};

    res.userId = row.userid;
    res.username = row.username;
    res.password = row.password;

    return res;
  }

  var rows, camelRows;

  beforeEach(function() {
    rows = [
      {userid: 1, username: "user01", password: "pwd01"},
      {userid: 2, username: "user02", password: "pwd02"},
      {userid: 3, username: "user03", password: "pwd03"}
    ];

    camelRows = [
      {userId: 1, username: "user01", password: "pwd01"},
      {userId: 2, username: "user02", password: "pwd02"},
      {userId: 3, username: "user03", password: "pwd03"}
    ];
  });

  describe("#mapRow()", function() {
    var row, camelRow;

    beforeEach(function() {
      row = {userid: 1, username: "user01", password: "pwd01"};
      camelRow = {userId: 1, username: "user01", password: "pwd01"};
    });

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

  describe("#map()", function() {
    describe("Custom map", function() {
      it("map(fn, rows)", function() {
        mapper.map(map, rows).should.be.eql(camelRows);
      });
    });

    describe("Default map", function() {
      it("map({clss: Class}, rows)", function() {
        var res = mapper.map({clss: User}, rows);

        for (var i = 0; i < res.length; ++i) {
          var row = res[i];
          var auxRow = rows[i];

          row.should.be.instanceOf(User);
          row.should.have.properties(auxRow);
        }
      });

      it("map({map: [...], rows)", function() {
        mapper.map({map: ["userId"]}, rows).should.be.eql(camelRows);
      });

      it("map(map: {...}, rows)", function() {
        mapper.map({map: {userid: "userId"}}, rows).should.be.eql(camelRows);
      });

      it("map({clss: Class, map: [...]}, rows)", function() {
        var res = mapper.map({clss: User, map: ["userId"]}, rows);

        for (var i = 0; i < res.length; ++i) {
          var row = res[i];
          var camelRow = camelRows[i];

          row.should.be.instanceOf(User);
          row.should.have.properties(camelRow);
        }
      });

      it("map({clss: Class, map: {...}}, rows)", function() {
        var res = mapper.map({clss: User, map: {userid: "userId"}}, rows);

        for (var i = 0; i < res.length; ++i) {
          var row = res[i];
          var camelRow = camelRows[i];

          row.should.be.instanceOf(User);
          row.should.have.properties(camelRow);
        }
      });

      it("map([...], rows)", function() {
        mapper.map(["userId"], rows).should.be.eql(camelRows);
      });
    });
  });
});