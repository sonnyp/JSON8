'use strict'

var RS = '\x1e'
var LF = '\n'

module.exports = function encode(array) {
  var str = ''
  for (var i = 0, l = array.length; i < l; i++) {
    str += (RS + JSON.stringify(array[i]) + LF)
  }
  return str
}
