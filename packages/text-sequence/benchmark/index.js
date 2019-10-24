"use strict";

const { createReadStream } = require("fs");

const Benchmark = require("benchmark");
const JSONTextSequence = require("json-text-sequence");

const JSON8TextSequence = require("..");

const suite = new Benchmark.Suite();

suite
  .add(
    "json-text-sequence",
    deferred => {
      const stream = createReadStream(__dirname + "/data.jts");
      stream.pipe(new JSONTextSequence.parser());
      stream.on("end", () => deferred.resolve());
    },
    { defer: true }
  )
  .add(
    "json8-text-sequence",
    deferred => {
      const stream = createReadStream(__dirname + "/data.jts");
      stream.pipe(new JSON8TextSequence.ParseStream());
      stream.on("end", () => deferred.resolve());
    },
    { defer: true }
  )
  .on("cycle", function(event) {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  .run({ async: true });
