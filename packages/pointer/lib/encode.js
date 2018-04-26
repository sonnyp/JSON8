"use strict";

const escape = require("./escape");

/**
 * Encode a JSON tokens list
 *
 * @param  {Array}  tokens     - array of tokens
 * @param  {String} separator  - separator to use, defaults to /
 * @return {String}            - JSON Pointer string
 */
module.exports = function encode(tokens, separator) {
  let pointer = "";
  const sep =
    typeof separator === "string" && separator.length > 0 ? separator : "/";

  for (let i = 0, len = tokens.length; i < len; i++) {
    pointer += sep + escape(tokens[i], sep);
  }

  return pointer;
};
