"use strict";

const { RS, LF } = require("./chars");
const { EventEmitter } = require("events");

module.exports = class Parser extends EventEmitter {
  constructor() {
    super();

    this.seq = "";
  }

  write(data) {
    if (typeof data !== "string") data = data.toString();
    for (let pos = 0, l = data.length; pos < l; pos++) {
      const char = data[pos];
      if (char === RS) {
        this.seq = "";
      } else if (char === LF) {
        this.emit("data", JSON.parse(this.seq));
        this.seq = "";
      } else {
        this.seq += char;
      }
    }
  }

  end(data) {
    if (data) this.write(data);
    this.emit("end");
  }
};
