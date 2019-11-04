"use strict";

const Parser = require("./Parser");

class ParseTransformer {
  constructor(parser = new Parser()) {
    this.parser = parser;
  }
  oninvalid() {}
  ontruncated() {}
  start(controller) {
    this.parser.onvalue = (type, value) => {
      if (type === "sequence") {
        controller.enqueue(value);
      } else if (type === "truncated") {
        this.ontruncated(value, controller);
      } else {
        this.oninvalid(value, controller);
      }
    };
  }
  transform(chunk) {
    if (typeof chunk !== "string") chunk = chunk.toString();
    this.parser.write(chunk);
  }
  flush() {
    this.parser.end();
  }
}

module.exports = ParseTransformer;
