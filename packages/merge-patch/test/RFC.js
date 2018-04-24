"use strict";

const assert = require("assert");
const apply = require("../lib/apply");
const tests = require("./RFC.json");
const { clone } = require("json8");

describe("RFC", () => {
  tests.forEach(function(test) {
    test = clone(test);
    it("returns " + JSON.stringify(test.result), () => {
      assert.deepEqual(apply(test.original, test.patch), test.result);
    });
  });
});
