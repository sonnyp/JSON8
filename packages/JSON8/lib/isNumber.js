'use strict'

var NUMBER = require('./types').NUMBER

module.exports = function isNumber(obj) {
  return (typeof obj === NUMBER && isFinite(obj))
}
