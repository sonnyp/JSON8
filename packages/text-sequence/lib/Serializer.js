"use strict";

const { RS, LF, CAN } = require("./chars");
const { EventEmitter } = require("events");

module.exports = class Serializer extends EventEmitter {
  constructor() {
    super();
  }

  write(data) {
    let line = "";
    line += RS + JSON.stringify(data);
    const type = typeof data;
    if (data === null || type === "boolean" || type === "number") line += CAN;
    line += LF;
    this.emit("data", line);
  }

  end(data) {
    if (data) this.write(data);
    this.emit("end");
  }
};
