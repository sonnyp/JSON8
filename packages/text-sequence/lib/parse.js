"use strict";

const Parser = require("./Parser");

module.exports = function parse(str, parser = new Parser()) {
  const seqs = [];

  parser.onvalue = (type, value) => {
    seqs.push([type, value]);
  };
  parser.write(str);
  parser.end();

  return seqs;
};
