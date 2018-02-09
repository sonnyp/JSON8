"use strict";

const { Transform } = require("stream");
const Parser = require("./Parser");

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
