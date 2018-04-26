"use strict";

const ooPointer = require("json8-pointer");
const walk = require("./walk");
const decode = ooPointer.decode;

/**
 * @typedef OperationResult
 * @type Object
 * @property {Any}   doc       - The patched document
 * @property {Array} previous  - The previous/replaced value if any
 */

/**
 * Get the value at the JSON Pointer location
 *
 * @param  {Object|Array} doc   - JSON document
 * @param  {String|Array} path  - JSON Pointer string or tokens path
 * @return {Any}                - value at the JSON Pointer location
 */
module.exports = function get(doc, path) {
  const tokens = decode(path);

  // returns the document
  if (tokens.length === 0) return doc;

  const r = walk(doc, tokens);
  const token = r[0];
  const parent = r[1];

  return parent[token];
};
