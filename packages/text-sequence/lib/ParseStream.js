"use strict";

const { Transform } = require("stream");

const Parser = require("./Parser");

// https://nodejs.org/api/stream.html#stream_implementing_a_transform_stream

function onvalue(type, value) {
  if (type === "sequence") {
    this.push(value);
    return;
  }

  this.emit(type, value);
}

module.exports = class ParseStream extends Transform {
  constructor(options = {}, parser = new Parser()) {
    super(Object.assign({ objectMode: true, decodeStrings: false }, options));
    this.parser = parser;
    this.parser.onvalue = onvalue.bind(this);
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
