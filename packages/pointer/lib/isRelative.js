"use strict";

module.exports = function isRelative(pointer) {
  return /^\d+$/.test(pointer[0]);
};
