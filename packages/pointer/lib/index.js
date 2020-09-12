"use strict";

const walk = require("./walk");

module.exports = function index(json) {
  const idxs = Object.create(null);
  walk(json, function (value, pointer) {
    idxs[pointer] = value;
  });
  return idxs;
};
