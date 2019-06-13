"use strict";

const ooPointer = require("json8-pointer");
const encode = ooPointer.encode;
const decode = ooPointer.decode;

/**
 * Return the reverse operation to a JSON Patch operation
 * @param  {Object}       patch     - JSON Patch operation object
 * @param  {Any}          previous  - previous value for add, replace and move operations
 * @param  {Number}       idx       - index of the item for array
 * @return {Array}
 */
function reverse(patch, previous, idx) {
  const op = patch.op;
  const path = patch.path;

  if (op === "copy" || (op === "add" && previous === undefined)) {
    if (idx === undefined) return [{ op: "remove", path: path }];

    // for item pushed to array with -
    const tokens = decode(path);
    tokens[tokens.length - 1] = idx.toString();
    return [{ op: "remove", path: encode(tokens) }];
  }
  if (op === "replace") return [{ op: "replace", path: path, value: previous }];
  if (op === "move") {
    const patches = [{ op: "move", path: patch.from, from: path }];

    if (previous) {
      patches.push({ op: "add", path: path, value: previous });
    }

    return patches;
  }
  if (op === "add" || op === "remove")
    return [{ op: "add", path: path, value: previous }];
  if (op === "test") return [{ op: "test", path: path, value: patch.value }];
}

/**
 * Builds and returns a valid JSON Patch from a revert value
 * @param  {Array} revert   - revert value from the apply or patch method with {reversible: true}
 * @return {Array} patches  - JSON Patch
 */
module.exports = function buildRevertPatch(revert) {
  const patch = [];

  for (let i = 0, len = revert.length; i < len; i++) {
    const item = revert[i];
    patch.unshift.apply(patch, reverse(item[0], item[1], item[2]));
  }

  return patch;
};
