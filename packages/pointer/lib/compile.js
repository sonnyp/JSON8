"use strict";

const decode = require("./decode");

module.exports = function compile(pointer) {
  const tokens = Array.isArray(pointer) ? pointer : decode(pointer);

  let str = "return doc";
  for (const token of tokens) {
    str += "['" + token.replace(/\\/, "\\\\").replace(/'/, "\\'") + "']";
  }

  return Function("doc", str); // eslint-disable-line no-new-func
};
