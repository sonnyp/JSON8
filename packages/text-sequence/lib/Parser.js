"use strict";

const { RS, LF, CAN } = require("./chars");
const { EventEmitter } = require("events");

module.exports = class Parser extends EventEmitter {
  constructor() {
    super();

    this.seq = "";
  }

  write(data) {
    if (typeof data !== "string") data = data.toString();
    for (let i = 0, l = data.length; i < l; i++) {
      const char = data[i];
      if (char === RS) {
        this.seq = "";
      } else if (char === CAN) {
        this.emit("data", JSON.parse(this.seq));
        this.seq = "";
        i++;
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
