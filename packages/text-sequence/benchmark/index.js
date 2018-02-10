"use strict";

const Benchmark = require("benchmark");
const JSONStream = require("JSONStream");
const JSONTextSequence = require("..");
const { readFileSync, createReadStream } = require("fs");

var suite = new Benchmark.Suite("parse");
const versions = JSON.parse(readFileSync(__dirname + "/data.json")).map(
  version => JSON.stringify(version)
);

suite
  .add("JSONStream", {
    defer: true,
    fn: deferrred => {
      const stream = JSONStream.parse("*");
      stream.on("error", console.error);
      stream.on("end", () => {
        deferrred.resolve();
      });

      stream.write("[");
      versions.forEach((version, idx) => {
        stream.write(version);
        if (idx < versions.length) stream.write(",");
      });
      stream.end("]");
    }
  })
  .add("json8-text-sequence", {
    defer: true,
    fn: deferrred => {
      const stream = new JSONTextSequence.ParseStream();
      stream.on("error", console.error);
      stream.on("finish", () => {
        deferrred.resolve();
      });

      versions.forEach((version, idx) => {
        stream.write(version);
      });
      stream.end();
    }
  })
  // add listeners
  .on("cycle", function(event) {
    console.log(String(event.target));
  })
  .on("complete", function() {
    console.log("Fastest is " + this.filter("fastest").map("name"));
  })
  // run async
  .run({ async: true });
