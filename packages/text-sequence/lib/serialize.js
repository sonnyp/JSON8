"use strict";

const Serializer = require("./Serializer");

module.exports = function serialize(array) {
  const serializer = new Serializer();
  let str = "";
  serializer.on("data", (data) => (str += data));
  for (let i = 0; i < array.length; i++) {
    serializer.write(array[i]);
  }
  return str;
};
