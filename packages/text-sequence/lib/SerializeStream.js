"use strict";

const { Transform } = require("stream");
const Serializer = require("./Serializer");

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
