"use strict";

const Parser = require("./Parser");

module.exports = function parse(str) {
  const parser = new Parser();
  const seqs = [];
  parser.on("data", data => seqs.push(data));
  parser.write(str);
  return seqs;
};
