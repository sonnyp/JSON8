'use strict'

var chars = require('./chars')
var RS = chars.RS
var LF = chars.LS
var CAN = chars.CAN

module.exports = function encode(array) {
  var seqs = ''
  for (var i = 0, l = array.length; i < l; i++) {
    var item = array[i]
    var type = typeof item
    seqs += RS + JSON.stringify(item)
    if (item === null || type === 'boolean' || type === 'number') seqs += CAN
    seqs += LF
  }
  return seqs
}
