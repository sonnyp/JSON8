"use strict";

const { Transform } = require("stream");
const Serializer = require("./Serializer");

// https://nodejs.org/api/stream.html#stream_implementing_a_transform_stream

module.exports = class SerializeStream extends Transform {
  constructor(options = {}) {
    super(Object.assign({ objectMode: true, decodeStrings: false }, options));
    this.serializer = new Serializer();
    this.serializer.on("data", data => {
      this.push(data);
    });
  }

  _transform(data, encoding, callback) {
    this.serializer.write(data);
    callback();
  }

  _final(callback) {
    this.serializer.end();
    callback();
  }
};
