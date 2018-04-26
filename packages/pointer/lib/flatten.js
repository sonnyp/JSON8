"use strict";

const walk = require("./walk");

module.exports = function index(json) {
  const idxs = Object.create(null);
  walk(json, function(value, pointer) {
    let v;
    if (Array.isArray(value)) {
      v = [];
    } else if (global.Map && value instanceof Map) {
      v = new Map();
    } else if (global.Set && value instanceof Set) {
      v = new Set();
    } else if (typeof value === "object" && value !== null) {
      v = {};
    } else {
      v = value;
    }
    idxs[pointer] = v;
  });
  return idxs;
};
