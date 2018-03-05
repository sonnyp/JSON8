'use strict'

const NUMBER = require('./types').NUMBER

module.exports = function isNumber(obj) {
  return typeof obj === NUMBER && isFinite(obj)
}
