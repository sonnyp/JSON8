"use strict";

const assert = require("assert");
const diff = require("../lib/diff");

describe("diff", () => {
  const tests = require("./diff.json");

  tests.forEach(function (test) {
    const patch = diff(test.a, test.b);

    it(test.description, () => {
      assert.deepEqual(patch, test.patch);
    });
  });
});
