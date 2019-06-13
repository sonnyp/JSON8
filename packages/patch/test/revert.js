"use strict";

const assert = require("assert");
const buildRevertPatch = require("../lib/buildRevertPatch");
const apply = require("../lib/apply");
const clone = require("json8/lib/clone");

describe("revert", () => {
  let doc;

  describe("move", () => {
    it("destination of a move operation gets its previous value back", () => {
      doc = { foo: "hello", bar: "world" };
      const patch = [
        {
          op: "move",
          path: "/bar",
          from: "/foo",
        },
      ];

      const applyResult = apply(clone(doc), patch, { reversible: true });

      assert.deepEqual(applyResult.doc, { bar: "hello" });

      const revertPatch = buildRevertPatch(applyResult.revert);

      assert.deepEqual(apply(applyResult.doc, revertPatch).doc, {
        foo: "hello",
        bar: "world",
      });
    });
  });
});
