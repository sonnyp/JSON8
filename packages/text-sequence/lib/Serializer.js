"use strict";

const { RS, LF } = require("./chars");
const { EventEmitter } = require("events");

module.exports = class Serializer extends EventEmitter {
  write(data) {
    this.emit("data", RS + JSON.stringify(data) + LF);
  }

  end(data) {
    if (data) this.write(data);
    this.emit("end");
  }
};
