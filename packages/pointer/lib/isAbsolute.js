"use strict";

module.exports = function isAbsolute(pointer) {
  return pointer === "" || pointer[0] === "/";
};
