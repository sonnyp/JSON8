"use strict";

const validArrayToken = require("json8-pointer").validArrayToken;
const OBJECT = "object";

/**
 * Walk a JSON document with a tokens array
 *
 * @param {Object|Array} doc     - JSON document
 * @param {Array}        tokens  - array of tokens
 * @return {Array}               - [token, target]
 */
module.exports = function walk(doc, tokens) {
  const length = tokens.length;

  let i = 0;
  let target = doc;
  let token;

  while (i < length - 1) {
    token = tokens[i++];

    if (token === '__proto__' ||
      (token == 'prototype' && i>0 && tokens[i-1] == 'constructor')
    ) {
      throw new Error("Prototype pollution attempt detected");
    }

    if (Array.isArray(target)) validArrayToken(token, target.length);
    else if (typeof target !== OBJECT || target === null)
      throw new Error("Cannot be walked");

    target = target[token];
  }

  token = tokens[i];

  if (Array.isArray(target)) validArrayToken(token, target.length);
  else if (typeof target !== OBJECT || target === null)
    throw new Error("Invalid target");

  return [token, target];
};
