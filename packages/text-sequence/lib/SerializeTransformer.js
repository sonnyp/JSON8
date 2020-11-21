"use strict";

const serialize = require("./serialize");

class SerializeTransformer {
  transform(chunk, controller) {
    controller.enqueue(serialize(chunk));
  }
}

module.exports = SerializeTransformer;
