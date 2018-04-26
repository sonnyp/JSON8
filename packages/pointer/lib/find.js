"use strict";

const decode = require("./decode");
const context = require("./context");

/**
 * Get the value at the JSON Pointer location
 *
 * @param  {Object|Array} doc      - JSON document
 * @param  {String|Array} pointer  - JSON Pointer string or tokens array
 * @return {Any}                   - value at the JSON Pointer location - undefined otherwise
 */
module.exports = function find(doc, pointer) {
  const tokens = Array.isArray(pointer) ? pointer : decode(pointer);

  // returns the document
  if (tokens.length === 0) return doc;

  let r;

  try {
    r = context(doc, tokens);
  } catch (e) {
    return undefined;
  }

  const token = r[0];
  const parent = r[1];
  return parent[token];
};
