"use strict";

const { createReadStream, readFile } = require("fs");
const {promisify} = require('util')
const JSON8TextSequence = require("..");
const JSONStream = require("JSONStream");
const JSONTextSequence = require('json-text-sequence')
const pEvent = require("p-event");

const pReadFile = promisify(readFile)

const testJSON8TextSequence = async () => {
  const stream = createReadStream(__dirname + "/data.jts");

  stream.pipe(new JSON8TextSequence.ParseStream());

  const now = Date.now();
  stream.on("end", () => {
    console.log("json8-text-sequence", Date.now() - now, "ms");
  });
  return pEvent(stream, "end");
};

const testJSONTextSequence = async () => {
  const stream = createReadStream(__dirname + "/data.jts");

  stream.pipe(new JSONTextSequence.parser());

  const now = Date.now();
  stream.on("end", () => {
    console.log("json-text-sequence", Date.now() - now, "ms");
  });
  return pEvent(stream, "end");
};

const testJSONStream = async () => {
  const stream = createReadStream(__dirname + "/data.json");

  stream.pipe(JSONStream.parse());

  const now = Date.now();
  stream.on("end", () => {
    console.log("JSONStream", Date.now() - now, "ms");
  });
  return pEvent(stream, "end");
};


const testRequire = async () => {
  const now = Date.now();
  require(__dirname + "/data.json")
  console.log("require (non streaming)", Date.now() - now, "ms");
};

const testJSONParse = async () => {
  const now = Date.now();
  JSON.parse(await pReadFile(__dirname + "/data.json", 'utf8'))
  console.log("fs.readFile and JSON.parse (non streaming)", Date.now() - now, "ms");
};

const testJSON8TextSequenceParse = async () => {
  const now = Date.now();
  JSON8TextSequence.parse(await pReadFile(__dirname + "/data.jts", 'utf8'))
  console.log("fs.readFile and json8-text-sequence parse (non streaming)", Date.now() - now, "ms");
};


(async () => {
  await testJSONStream();
  await testJSON8TextSequence();
  await testJSONTextSequence();
  await testRequire();
  await testJSONParse();
  await testJSON8TextSequenceParse();
})();
