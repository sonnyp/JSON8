"use strict";

const { createWriteStream } = require("fs");
const { SerializeStream } = require("..");
const request = require("request");
const JSONStream = require("JSONStream");

(async () => {
  const writeJSON = createWriteStream(__dirname + "/data.json");
  const writeJST = createWriteStream(__dirname + "/data.jts");

  const stream = request("http://registry.npmjs.org/browserify");

  const versions = stream.pipe(JSONStream.parse("versions.*"));

  versions.pipe(JSONStream.stringify()).pipe(writeJSON);
  versions.pipe(new SerializeStream()).pipe(writeJST);
})();
