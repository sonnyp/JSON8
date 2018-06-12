"use strict";

const assert = require("assert");
const resolve = require("../lib/resolve");

describe("resolve", () => {
  it.only("resolves", () => {
    assert.equal(resolve("/foo/bar", "0/foo"), "/foo/bar/foo");
    assert.equal(resolve("/foo/bar", "1/foo"), "/foo/foo");
    assert.equal(resolve("/foo/bar", "1/0"), "/foo/0");
  });
});
