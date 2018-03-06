"use strict";

const test = require("ava");
const parse = require("../lib/parse");

test("truncated string", t => {
  const {message} = t.throws(() => {
    parse('\x1e"hello\x0A', true)
  }, SyntaxError)
  t.is(message, 'Unexpected end of JSON input')
});
