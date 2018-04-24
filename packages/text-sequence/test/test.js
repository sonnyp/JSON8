"use strict";

const test = require("ava");
const parse = require("../lib/parse");
const { createReadStream } = require("fs");
const ParseStream = require("../lib/ParseStream");

test.cb("ParseStream", t => {
  let counter = 0;

  createReadStream(__dirname + "/ParseStream.log", { encoding: "utf8" })
    .pipe(new ParseStream())
    .on("data", data => {
      t.is(data.count, counter);
      counter++;
    })
    .on("end", () => {
      t.is(counter, 10);
      t.end();
    });
});

const { createWriteStream } = require("fs");
const SerializeStream = require("../lib/SerializeStream");

test.cb("SerializeStream", t => {
  let counter = 0;

  const serializer = new SerializeStream();

  serializer.pipe(
    createWriteStream(__dirname + "/SerializeStream.log", {
      encoding: "utf8",
      flags: "w",
    })
  );

  serializer
    .on("data", data => {
      data = parse(data)[0];
      t.is(data.count, counter);
      counter++;
    })
    .on("end", () => {
      t.is(counter, 4);
      t.end();
    });

  serializer.write({ count: 0 });
  serializer.write({ count: 1 });
  serializer.write({ count: 2 });
  serializer.write({ count: 3 });
  serializer.end();
});
