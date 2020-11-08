"use strict";

const { RS, LF } = require("./chars");
const { EventEmitter } = require("events");

const TRUNCATED = "truncated";
const SEQUENCE = "sequence";
const INVALID = "invalid";

class Parser extends EventEmitter {
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
          this.emit(TRUNCATED, this.seq);
          this.seq = "";
        }
      } else if (char === LF) {
        if (this.open === false) {
          this.emit(TRUNCATED, this.seq);
          this.seq = "";
          continue;
        }
        this.open = false;
        try {
          this.emit(SEQUENCE, JSON.parse(this.seq));
        } catch (err) {
          this.emit(INVALID, this.seq);
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
      this.emit(TRUNCATED, this.seq);
      this.seq = "";
    }
    this.emit("end");
  }
}

module.exports = Parser;
