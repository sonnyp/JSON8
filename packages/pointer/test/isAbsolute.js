"use strict";

const assert = require("assert");
const isAbsolute = require("../lib/isAbsolute");

describe("isAbsolute", () => {
  it("returns true for absolute pointers", () => {
    assert(isAbsolute(""));
    assert(isAbsolute("/"));
    assert(isAbsolute("/0"));
  });

  it("returns false for non absolute pointers", () => {
    assert(!isAbsolute("0"));
    assert(!isAbsolute("1/0"));
    assert(!isAbsolute("2/highly/nested/objects"));
    assert(!isAbsolute("0#"));
    assert(!isAbsolute("1#"));
    assert(!isAbsolute("a"));
    assert(!isAbsolute("Infinity"));
  });
});
