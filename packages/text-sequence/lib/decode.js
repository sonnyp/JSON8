'use strict'

var RS = '\x1e'
var LF = '\n'

module.exports = function decode(str) {
  var seqs = []
  var seq = ''
  for (var i = 0, l = str.length; i < l; i++) {
    if (str[i] === RS) {
      if (!seq) {
        seq = str[++i]
      }
    }
    else if (str[i] === LF) {
      seqs.push(seq)
      seq = ''
    }
    else {
      seq += str[i]
    }
  }
  return seqs
}
