"use strict";

const { RS, LF } = require("./chars");

const TRUNCATED = "truncated";
const SEQUENCE = "sequence";
const INVALID = "invalid";

class Parser {
  constructor() {
    this.seq = "";
    this.open = false;
  }

  onvalue() {}
  onend() {}

  write(data) {
    if (typeof data !== "string") data = data.toString();
    for (let pos = 0, l = data.length; pos < l; pos++) {
      const char = data[pos];
      if (char === RS) {
        this.open = true;
        if (this.seq.length > 0) {
          this.onvalue(TRUNCATED, this.seq);
          this.seq = "";
        }
      } else if (char === LF) {
        if (this.open === false) {
          this.onvalue(TRUNCATED, this.seq);
          this.seq = "";
          continue;
        }
        this.open = false;
        try {
          this.onvalue(SEQUENCE, JSON.parse(this.seq));
        } catch (err) {
          this.onvalue(INVALID, this.seq);
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
      this.onvalue(TRUNCATED, this.seq);
      this.seq = "";
    }
    this.onend();
  }
}

module.exports = Parser;
