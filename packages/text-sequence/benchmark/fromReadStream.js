"use strict";

const { createReadStream } = require("fs");
const JSONTextSequence = require("..");
const JSONStream = require("JSONStream");
const pEvent = require("p-event");

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

(async () => {
  await testJSONStream();
  await testJSONTextSequence();
})();
