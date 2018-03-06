"use strict";

const { createReadStream, readFile } = require("fs");
const {promisify} = require('util')
const JSONTextSequence = require("..");
const JSONStream = require("JSONStream");
const pEvent = require("p-event");

const pReadFile = promisify(readFile)

const testJSONTextSequence = async () => {
  const stream = createReadStream(__dirname + "/data.jts");

  stream.pipe(new JSONTextSequence.ParseStream());

  const now = Date.now();
  stream.on("end", () => {
    console.log("json8-text-sequence", Date.now() - now, "ms");
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

const testJSONTextSequenceParse = async () => {
  const now = Date.now();
  JSONTextSequence.parse(await pReadFile(__dirname + "/data.jts", 'utf8'))
  console.log("fs.readFile and json-text-sequence parse (non streaming)", Date.now() - now, "ms");
};


(async () => {
  await testJSONStream();
  await testJSONTextSequence();
  await testRequire();
  await testJSONParse();
  await testJSONTextSequenceParse();
})();
