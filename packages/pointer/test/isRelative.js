"use strict";

const assert = require("assert");
const isRelative = require("../lib/isRelative");

describe("isRelative", () => {
  it("returns true for relative pointers", () => {
    assert(isRelative("0"));
    assert(isRelative("1/0"));
    assert(isRelative("2/highly/nested/objects"));
    assert(isRelative("0#"));
    assert(isRelative("1#"));
  });

  it("returns false for non relative pointers", () => {
    assert(!isRelative(""));
    assert(!isRelative("/"));
    assert(!isRelative("a"));
    assert(!isRelative("Infinity"));
  });
});
