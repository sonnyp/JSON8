"use strict";

const { RS, LF } = require("./chars");

const TRUNCATED = "truncated";
const SEQUENCE = "sequence";
const INVALID = "invalid";

function* parse(data) {
  let seq = "";
  let open = false;

  for (let pos = 0, l = data.length; pos < l; pos++) {
    const char = data[pos];
    if (char === RS) {
      open = true;
      if (seq.length > 0) {
        yield [TRUNCATED, seq];
        seq = "";
      }
    } else if (char === LF) {
      if (open === false) {
        yield [TRUNCATED, seq];
        seq = "";
        continue;
      }
      open = false;

      try {
        yield [SEQUENCE, JSON.parse(seq)];
      } catch (err) {
        yield [INVALID, seq];
      }
      seq = "";
    } else {
      seq += char;
    }
  }

  if (seq) {
    yield [TRUNCATED, seq];
  }
}

module.exports = parse;
