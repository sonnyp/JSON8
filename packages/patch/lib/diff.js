"use strict";

const encode = require("json8-pointer").encode;
const equal = require("json8/lib/equal");
const type = require("json8/lib/type");
const ARRAY = "array";
const OBJECT = "object";

module.exports = function diff(a, b, pre) {
  let patches = [];
  const prefix = pre || [];

  const at = type(a);
  const bt = type(b);

  if (bt !== at) {
    if (at === undefined)
      patches.push({ op: "add", path: encode(prefix), value: b });
    else patches.push({ op: "replace", path: encode(prefix), value: b });
    return patches;
  } else if (bt !== ARRAY && bt !== OBJECT) {
    if (!equal(a, b))
      patches.push({ op: "replace", path: encode(prefix), value: b });
    return patches;
  }

  if (a === b) return patches;

  // both are arrays
  if (Array.isArray(b)) {
    let i, l, elem, diffSet;
    if (a.length === 0 && b.length === 0) return patches;
    if (equal(a, b)) return patches;
    for (i = 0, l = a.length, diffSet = new Set(b); i < l; i++) {
      elem = a[i];
      if (!diffSet.has(elem))
        patches.push({ op: "remove", path: `${encode(prefix)}/${i}` });
    }

    for (i = 0, l = b.length, diffSet = new Set(a); i < l; i++) {
      elem = b[i];
      if (!diffSet.has(elem))
        patches.push({
          op: "add",
          path: `${encode(prefix)}/${i}`,
          value: elem,
        });
    }
  }
  // both are objects
  else if (bt === OBJECT) {
    let i, l, keys, k;
    keys = Object.keys(b);
    for (i = 0, l = keys.length; i < l; i++) {
      k = keys[i];
      patches = patches.concat(diff(a[k], b[k], prefix.concat([k])));
    }

    keys = Object.keys(a);
    for (i = 0, l = keys.length; i < l; i++) {
      k = keys[i];
      if (b[k] !== undefined) continue;
      patches.push({ op: "remove", path: encode(prefix.concat([k])) });
    }
  }

  return patches;
};
