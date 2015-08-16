'use strict'

var STRING = require('./types').STRING

module.exports = function isString(obj) {
  return typeof obj === STRING
}
