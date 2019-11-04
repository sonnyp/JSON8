"use strict";

const { RS, LF } = require("./chars");
const { EventEmitter } = require("events");

module.exports = class Parser extends EventEmitter {
  constructor() {
    super();

    this.seq = "";
    this.open = false;
  }

  write(data) {
    if (typeof data !== "string") data = data.toString();
    for (let pos = 0, l = data.length; pos < l; pos++) {
      const char = data[pos];
      this.last = char;
      if (char === RS) {
        this.open = true;
        if (this.seq.length > 0) {
          this.emit("truncated", this.seq);
          this.seq = "";
        }
      } else if (char === LF) {
        if (this.open === false) {
          this.emit("truncated", this.seq);
          this.seq = "";
          continue;
        }
        this.open = false;
        try {
          this.emit("sequence", JSON.parse(this.seq));
        } catch (err) {
          this.emit("invalid", this.seq);
        }
        this.seq = "";
      } else {
        this.seq += char;
      }
    }
  }

  end(data) {
    if (data) this.write(data);
    if (this.seq.length > 0 || this.open === true) {
      this.emit("truncated", this.seq);
      this.seq = "";
    }
    this.emit("end");
  }
};
