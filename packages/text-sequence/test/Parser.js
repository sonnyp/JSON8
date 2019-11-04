"use strict";

const test = require("ava");
const Parser = require("../lib/Parser");
const assert = require("assert");

function catchEvents(str) {
  const parser = new Parser();
  const events = [];
  let ended = false;
  ["invalid", "sequence", "truncated"].forEach(event => {
    parser.on(event, (...args) => {
      events.push([event, ...args]);
    });
  });
  parser.on("end", () => {
    ended = true;
  });
  parser.write(str);
  parser.end();
  assert(ended === true);
  // console.log(events);
  return events;
}

test("invalid json", t => {
  t.deepEqual(catchEvents('\x1e"hello\x0A'), [["invalid", '"hello']]);
  t.deepEqual(catchEvents("\x1e'hello'\x0A"), [["invalid", "'hello'"]]);
  t.deepEqual(catchEvents("\x1e[\x0A"), [["invalid", "["]]);
  t.deepEqual(catchEvents("\x1e{\x0A"), [["invalid", "{"]]);
  t.deepEqual(catchEvents("\x1efoobar\x0A"), [["invalid", "foobar"]]);
});

test("truncated", t => {
  t.deepEqual(catchEvents("\x1enull\x1e"), [
    ["truncated", "null"],
    ["truncated", ""],
  ]);
  t.deepEqual(catchEvents("\x0Anull\x0A"), [
    ["truncated", ""],
    ["truncated", "null"],
  ]);
  t.deepEqual(catchEvents('\x1e"foo"\x0Abar'), [
    ["sequence", "foo"],
    ["truncated", "bar"],
  ]);
  t.deepEqual(catchEvents('\x1e"foo"\x1ebar'), [
    ["truncated", '"foo"'],
    ["truncated", "bar"],
  ]);
  t.deepEqual(catchEvents("123\x0A"), [["truncated", "123"]]);
  t.deepEqual(catchEvents("\x1e123"), [["truncated", "123"]]);
  t.deepEqual(catchEvents("\x1e"), [["truncated", ""]]);
  t.deepEqual(catchEvents("\x0A"), [["truncated", ""]]);
});

test("empty sequence", t => {
  t.deepEqual(catchEvents("\x1e\x0A"), [["invalid", ""]]);
  t.deepEqual(catchEvents(""), []);
  // Multiple consecutive RS octets do not denote empty
  // sequence elements between them and can be ignored.
  // https://tools.ietf.org/html/rfc7464#section-2.1
  t.deepEqual(catchEvents("\x1e\x1e"), [["truncated", ""]]);
  t.deepEqual(catchEvents("\x1e\x0A\x1e"), [
    ["invalid", ""],
    ["truncated", ""],
  ]);
});

test("valid json", t => {
  t.deepEqual(catchEvents('\x1e"hello"\x0A'), [["sequence", "hello"]]);
  t.deepEqual(catchEvents("\x1etrue\x0A"), [["sequence", true]]);
  t.deepEqual(catchEvents("\x1efalse\x0A"), [["sequence", false]]);
  t.deepEqual(catchEvents("\x1enull\x0A"), [["sequence", null]]);
  t.deepEqual(catchEvents("\x1e0\x0A"), [["sequence", 0]]);
  t.deepEqual(catchEvents("\x1e-1\x0A"), [["sequence", -1]]);
  t.deepEqual(catchEvents("\x1e1\x0A"), [["sequence", 1]]);
});
