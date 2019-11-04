"use strict";

const { Transform } = require("stream");

const serialize = require("./serialize");

// https://nodejs.org/api/stream.html#stream_implementing_a_transform_stream

module.exports = class SerializeStream extends Transform {
  constructor(options = {}) {
    super(Object.assign({ objectMode: true, decodeStrings: false }, options));
  }

  _transform(data, encoding, callback) {
    try {
      callback(null, serialize(data));
    } catch (err) {
      callback(err);
    }
  }
};
