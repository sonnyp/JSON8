"use strict";

const assert = require("assert");
const { encode, decode } = require("..");

describe("decode", () => {
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

  // https://github.com/HoLyVieR/prototype-pollution-nsec18
  it("prevents prototype pollution", () => {
    assert.throws(
      () => {
        decode("/foo/constructor/bar");
      },
      Error,
      "Prototype pollution attempt"
    );

    assert.throws(
      () => {
        decode("/foo/__proto__/bar");
      },
      Error,
      "Prototype pollution attempt"
    );
  });
});

describe("encode", () => {
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
