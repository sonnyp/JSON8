"use strict";

const walk = require("./walk");

module.exports = function index(json) {
  const dict = Object.create(null);
  walk(json, function(value, pointer) {
    if (typeof value !== "object" || value === null) {
      dict[pointer] = value;
    }
  });
  return dict;
};
