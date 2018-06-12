"use strict";

const decode = require("./decode");
const encode = require("./encode");

const isRelative = require("./isRelative");
const isAbsolute = require("./isAbsolute");

module.exports = function resolve(pointer, relativePointer) {
  if (!isAbsolute(pointer)) throw new Error(pointer + " is not absolute");
  if (!isRelative(relativePointer))
    throw new Error(relativePointer + " is not relative");

  const pointerTokens = decode(pointer);

  let prefix = "";
  let idx = 0;

  for (; idx < relativePointer.length; idx++) {
    const c = relativePointer[idx];
    if (/^\d+$/.test(c)) prefix += c;
    else break;
  }

  if (prefix !== "0") {
    pointerTokens.splice(-prefix);
  }

  const sufix = relativePointer.slice(idx);

  return encode(pointerTokens.concat(decode(sufix)));
};
