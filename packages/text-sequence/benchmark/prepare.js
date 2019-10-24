"use strict";

const { createWriteStream } = require("fs");
const { SerializeStream } = require("..");
const request = require("request");
const JSONStream = require("JSONStream");

const writeJTS = createWriteStream(__dirname + "/data.jts");
const stream = request("http://registry.npmjs.org/browserify");
const versions = stream.pipe(JSONStream.parse("versions.*"));

versions.pipe(new SerializeStream()).pipe(writeJTS);
