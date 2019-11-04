"use strict";

const { Transform } = require("stream");
const Parser = require("./Parser");

// https://nodejs.org/api/stream.html#stream_implementing_a_transform_stream

module.exports = class ParseStream extends Transform {
  constructor(options = {}, parser = new Parser()) {
    super(Object.assign({ objectMode: true, decodeStrings: false }, options));
    this.parser = parser;
    this.parser.on("truncated", seq => {
      this.emit("truncated", seq);
    });
    this.parser.on("invalid", seq => {
      this.emit("invalid", seq);
    });
    this.parser.on("sequence", data => {
      this.push(data);
    });
  }

  _transform(data, encoding, callback) {
    this.parser.write(data);
    callback();
  }

  _final(callback) {
    this.parser.end();
    callback();
  }
};
