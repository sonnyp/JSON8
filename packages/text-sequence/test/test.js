"use strict";

const test = require("ava");
const serialize = require("../lib/serialize");
const parse = require("../lib/parse");

test("serialize", t => {
  t.is(serialize(["hello"]), '\x1e"hello"\n');
  t.is(serialize([true]), "\x1etrue\x0A\n");
  t.is(serialize([false]), "\x1efalse\x0A\n");
  t.is(serialize([null]), "\x1enull\x0A\n");
  t.is(serialize([0]), "\x1e0\x0A\n");
  t.is(serialize([-1]), "\x1e-1\x0A\n");
  t.is(serialize([1]), "\x1e1\x0A\n");
});

test("parser", t => {
  t.deepEqual(parse('\x1e"hello"\n'), ["hello"]);
  t.deepEqual(parse("\x1etrue\x0A\n"), [true]);
  t.deepEqual(parse("\x1efalse\x0A\n"), [false]);
  t.deepEqual(parse("\x1enull\x0A\n"), [null]);
  t.deepEqual(parse("\x1e0\x0A\n"), [0]);
  t.deepEqual(parse("\x1e-1\x0A\n"), [-1]);
  t.deepEqual(parse("\x1e1\x0A\n"), [1]);
});

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
      flags: "w"
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
