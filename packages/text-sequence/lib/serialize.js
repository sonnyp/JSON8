"use strict";

const { RS, LF } = require("./chars");

module.exports = function encode(value) {
  return RS + JSON.stringify(value) + LF;
};
