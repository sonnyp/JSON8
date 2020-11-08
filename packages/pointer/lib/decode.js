"use strict";

/**
 * decode a JSON Pointer string
 *
 * @param  {String} pointer    - JSON Pointer string to decode
 * @param  {String} separator  - separator to use, defaults to /
 * @return {Array}             - array of tokens
 */
module.exports = function decode(pointer, separator) {
  if (Array.isArray(pointer)) return pointer;

  const sep =
    typeof separator === "string" && separator.length > 0 ? separator : "/";

  if (pointer.length === 0) return [];

  if (pointer.charAt(0) !== sep) throw new Error("Invalid pointer: " + pointer);

  const tokens = [""];
  let c = 0;

  for (let i = 1, len = pointer.length; i < len; i++) {
    const l = pointer.charAt(i);
    if (l === sep) {
      const token = tokens[tokens.length - 1];
      if (token === "constructor" || token === "__proto__") {
        throw new Error("Prototype pollution attempt");
      }
      tokens.push("");
      c++;
    } else if (l === "~") {
      if (pointer.charAt(i + 1) === "1") {
        tokens[c] += sep;
        i++;
      } else if (pointer.charAt(i + 1) === "0") {
        tokens[c] += "~";
        i++;
      } else {
        tokens[c] += l;
      }
    } else {
      tokens[c] += l;
    }
  }

  return tokens;
};
