"use strict";

const test = require("ava");
const serialize = require("../lib/serialize");
const parse = require("../lib/parse");

test("serialize", t => {
  t.is(serialize(["hello"]), '\x1e"hello"\x0A');
  t.is(serialize([true]), "\x1etrue\x0A");
  t.is(serialize([false]), "\x1efalse\x0A");
  t.is(serialize([null]), "\x1enull\x0A");
  t.is(serialize([0]), "\x1e0\x0A");
  t.is(serialize([-1]), "\x1e-1\x0A");
  t.is(serialize([1]), "\x1e1\x0A");
  t.is(serialize([]), "");
});

test("parser", t => {
  t.deepEqual(parse('\x1e"hello"\x0A'), ["hello"]);
  t.deepEqual(parse("\x1etrue\x0A"), [true]);
  t.deepEqual(parse("\x1efalse\x0A"), [false]);
  t.deepEqual(parse("\x1enull\x0A"), [null]);
  t.deepEqual(parse("\x1e0\x0A"), [0]);
  t.deepEqual(parse("\x1e-1\x0A"), [-1]);
  t.deepEqual(parse("\x1e1\x0A"), [1]);
  t.deepEqual(parse(""), []);
  // Multiple consecutive RS octets do not denote empty
  // sequence elements between them and can be ignored.
  // https://tools.ietf.org/html/rfc7464#section-2.1
  t.deepEqual(parse("\x1e\x1e"), []);
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
