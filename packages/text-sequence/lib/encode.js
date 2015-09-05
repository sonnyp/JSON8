'use strict'

var RS = '\x1e'
var LF = '\n'
var CAN = '\x0A'

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
