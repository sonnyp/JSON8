'use strict'

var decode = require('./decode')

module.exports = function compile(pointer) {
  var tokens = Array.isArray(pointer) ? pointer : decode(pointer)

  var str = 'return doc'
  for (var i =0; i<tokens.length; i++) {
    str+= "['" + tokens[i].replace(/\\/, '\\\\').replace(/\'/, '\\\'') + "']"
  }

  return Function('doc', str) // eslint-disable-line no-new-func
}
