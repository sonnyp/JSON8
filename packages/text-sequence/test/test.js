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

const SerializeStream = require("../lib/SerializeStream");

test.cb("SerializeStream", t => {
  let counter = 0;

  const stream = new SerializeStream();

  // const { createWriteStream } = require("fs");
  // stream.pipe(
  //   createWriteStream(__dirname + "/SerializeStream.log", {
  //     encoding: "utf8",
  //     flags: "w",
  //   })
  // );

  stream
    .on("data", data => {
      data = Array.from(parse(data))[0][1];
      t.is(data.count, counter);
      counter++;
    })
    .on("end", () => {
      t.is(counter, 4);
      t.end();
    });

  stream.write({ count: 0 });
  stream.write({ count: 1 });
  stream.write({ count: 2 });
  stream.write({ count: 3 });
  stream.end();
});

test.cb("SerializeStream exception handling", t => {
  const stream = new SerializeStream();

  stream.on("error", err => {
    t.true(err.message.startsWith("Converting circular structure to JSON"));
    t.end();
  });

  // circular
  const foo = {};
  foo.bar = foo;

  stream.write(foo);
});
