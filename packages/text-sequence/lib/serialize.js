"use strict";

const { RS, LF } = require("./chars");

module.exports = function serialize(value) {
  return RS + JSON.stringify(value) + LF;
};
