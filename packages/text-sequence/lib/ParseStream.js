"use strict";

const { Transform } = require("stream");
const Parser = require("./Parser");

// https://nodejs.org/api/stream.html#stream_implementing_a_transform_stream

module.exports = class ParseStream extends Transform {
  constructor(options = {}) {
    super(Object.assign({ objectMode: true, decodeStrings: false }, options));
    this.parser = new Parser();
    this.parser.on("data", data => {
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
