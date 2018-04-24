"use strict";

const assert = require("assert");
const { encode, decode } = require("..");

describe("parse", () => {
  it("returns ['foo', 'bar']", () => {
    const r = decode("/foo/bar");
    assert.deepEqual(r, ["foo", "bar"]);
  });

  it('returns [""]', () => {
    const r = decode("/");
    assert.deepEqual(r, [""]);
  });

  it("returns []", () => {
    const r = decode("");
    assert.deepEqual(r, []);
  });
});

describe("serialize", () => {
  it("should return /foo/bar", () => {
    const s = encode(["foo", "bar"]);
    assert.deepEqual(s, "/foo/bar");
  });

  it('should return ""', () => {
    const s = encode([]);
    assert.deepEqual(s, "");
  });

  it("should return /", () => {
    const s = encode([""]);
    assert.deepEqual(s, "/");
  });
});
