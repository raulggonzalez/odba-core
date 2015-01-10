describe("vdba.Aggregator", function() {
  var agg, object, objects, result;
  var transformedObjects = [
    {userId: 1, username: "user01", password: "pwd01", profile: {nick: "u01", emails: ["user01@test.com", "u01@test.com"]}},
    {userId: 2, username: "user02", password: "pwd02", profile: {nick: "u02", emails: ["user02@test.com"]}},
    {userId: 3, username: "user03", password: "pwd03", profile: {nick: "u03", emails: ["user03@test.com", "u03@test.com"]}}
  ];
  var transformedObject = transformedObjects[0];

  beforeEach(function() {
    agg = vdba.Aggregator.aggregator;
    objects = [
      {userId: 1, username: "user01", password: "pwd01", nick: "u01", emails: ["user01@test.com", "u01@test.com"]},
      {userId: 2, username: "user02", password: "pwd02", nick: "u02", emails: ["user02@test.com"]},
      {userId: 3, username: "user03", password: "pwd03", nick: "u03", emails: ["user03@test.com", "u03@test.com"]}
    ];
    object = objects[0];
    result = new vdba.Result(objects);
  });

  describe("#transformObject()", function() {
    it("transformObject(object, array, property)", function() {
      agg.transformObject(object, ["nick", "emails"], "profile");
      object.should.be.eql(transformedObject);
    });

    it("transformObject(object, object, property)", function() {
      var transObj = vdba.util._extend({}, transformedObject);
      transObj.profile = vdba.util._extend({userId: object.userId}, transObj.profile);

      agg.transformObject(object, {nick: true, emails: true, userId: false}, "profile");
      object.should.be.eql(transObj);
    });

    it("transformObject(object, object, property) - Nothing to transform", function() {
      var transObj = vdba.util._extend({profile: undefined}, object);

      agg.transformObject(object, ["unknown"], "profile");
      object.should.be.eql(transObj);
    });
  });

  describe("#transformResult()", function() {
    it("transformResult()", function() {
      agg.transformResult(result, ["nick", "emails"], "profile");
      result.rows.should.be.eql(transformedObjects);
    });
  });

  describe("#transform()", function() {
    describe("Error handling", function() {
      it("transform()", function() {
        (function() {
          agg.transform();
        }).should.throwError("Object to transform expected.");
      });

      it("transform(object)", function() {
        (function() {
          agg.transform({});
        }).should.throwError("Column names to transform expected.");
      });

      it("transform(object, columns)", function() {
        (function() {
          agg.transform({}, {});
        }).should.throwError("Property name expected.");
      });
    });

    describe("An object", function() {
      it("transform(object, columns, property)", function() {
        agg.transform(object, ["nick", "emails"], "profile");
        object.should.be.eql(transformedObject);
      });
    });

    describe("A result", function() {
      it("transform(result, columns, property)", function() {
        agg.transform(result, ["nick", "emails"], "profile");
        result.rows.should.be.eql(transformedObjects);
      });
    });
  });
});