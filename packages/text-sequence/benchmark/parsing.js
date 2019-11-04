"use strict";

const Benchmark = require("benchmark");

const suite = new Benchmark.Suite();

const parse = require("../lib/parse");
const iterator = require("../lib/iterator");

// const { readFileSync } = require("fs");
// const bigstr = readFileSync(__dirname + "/data.jts", "utf8");
const str = '\x1e"hello"\x0A\x1ehello\x0A';

suite
  .add("iterator", () => {
    // eslint-disable-next-line no-unused-vars,no-empty
    for (const foo of iterator(str)) {
    }
  })
  .add("parse", () => {
    parse(str);
  })
  .on("cycle", function(event) {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
