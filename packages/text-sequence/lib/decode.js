'use strict'

var chars = require('./chars')
var RS = chars.RS
var LF = chars.LS
var CAN = chars.CAN

module.exports = function decode(str) {
  var seqs = []
  var seq = ''
  for (var i = 0, l = str.length; i < l; i++) {
    if (str[i] === RS) {
      if (!seq) {
        seq = str[++i]
      }
    }
    else if (str[i] === CAN) {
      seqs.push(JSON.parse(seq))
      seq = ''
      i++
    }
    else if (str[i] === LF) {
      seqs.push(JSON.parse(seq))
      seq = ''
    }

    else {
      seq += str[i]
    }
  }
  return seqs
}
