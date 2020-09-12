"use strict";

/* eslint-disable no-console */
/* eslint-env node */

const benchmark = require("benchmark");
const ooPointer = require("./index");

const jsonpointer = require("jsonpointer"); // https://github.com/janl/node-jsonpointer
const jsonpointerjs = require("jsonpointer.js"); // https://github.com/alexeykuzmin/jsonpointer.js
const manuelstofer = require("json-pointer"); // https://github.com/manuelstofer/json-pointer
const flitbit = require("json-ptr").JsonPointer; // https://github.com/flitbit/json-ptr

const doc = {
  foo: [1, 2, 3, 4], // eslint-disable-line no-magic-numbers
  baz: [
    {
      qux: "hello",
    },
  ],
};

const pointer = "/baz/0/qux";
const compiled = ooPointer.compile(pointer);

const janlCompiled = jsonpointer.compile(pointer);

const evaluate = jsonpointerjs.get(doc);

const ptr = flitbit.create(pointer);

const suite = benchmark.Suite("pointer");

suite
  .add("find", function () {
    ooPointer.find(doc, pointer);
  })
  .add("compiled", function () {
    compiled(doc);
  })
  .add("compile + compiled", function () {
    ooPointer.compile(pointer)(doc);
  })
  .add("janl/node-jsonpointer get", function () {
    jsonpointer.get(doc, pointer);
  })
  .add("janl/node-jsonpointer compiled get", function () {
    janlCompiled.get(doc);
  })
  .add("alexeykuzmin/jsonpointer.js get", function () {
    jsonpointer.get(doc, pointer);
  })
  .add("alexeykuzmin/jsonpointer.js evaluate", function () {
    evaluate(pointer);
  })
  .add("manuelstofer/json-pointer get", function () {
    manuelstofer.get(doc, pointer);
  })
  .add("flitbit/json-ptr get", function () {
    flitbit.get(doc, pointer);
  })
  .add("flitbit/json-ptr compiled", function () {
    ptr.get(doc);
  })
  .on("cycle", function (event) {
    console.log(event.target.toString());
  })
  .on("complete", function () {
    console.log("Fastest is " + suite.filter("fastest").map("name"));
  })
  .run();
