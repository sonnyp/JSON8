"use strict";

const decode = require("./decode");
const context = require("./context");

module.exports = function unflatten(indexes) {
  const keys = Object.keys(indexes);
  const json = indexes[""];
  for (let i = 0; i < keys.length; i++) {
    const key = keys[i];
    if (key === "") continue;
    const idx = decode(key);
    const res = context(json, idx);
    const target = res[1];
    const token = res[0];
    if (typeof Map !== "undefined" && target instanceof Map) {
      target.set(token, indexes[key]);
    } else if (typeof Set !== "undefined" && target instanceof Set) {
      target.add(indexes[key]);
    } else if (Array.isArray(target)) {
      target.push(indexes[key]);
    } else {
      target[token] = indexes[key];
    }
  }
  return json;
};
