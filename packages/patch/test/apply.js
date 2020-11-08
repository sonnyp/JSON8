"use strict";

const assert = require("assert").strict;
const apply = require("../lib/apply");

describe("apply", () => {
  // https://github.com/HoLyVieR/prototype-pollution-nsec18
  it("prevents prototype pollution", () => {
    let doc = {};

    assert.throws(
      () => {
        doc = apply(doc, [
          {
            op: "add",
            path: "/__proto__/polluted",
            value: "Yes! Its Polluted",
          },
        ]);
      },
      Error,
      "Prototype pollution attempt"
    );

    assert.equal({}.polluted, undefined);
    assert.equal(doc.polluted, undefined);

    assert.throws(
      () => {
        doc = apply(doc, [
          {
            op: "add",
            path: "/constructor/polluted",
            value: "Yes! Its Polluted",
          },
        ]);
      },
      Error,
      "Prototype pollution attempt"
    );

    assert.equal({}.polluted, undefined);
    assert.equal(doc.polluted, undefined);
  });
});
