'use strict'

const BOOLEAN = require('./types').BOOLEAN

module.exports = function isBoolean(obj) {
  return typeof obj === BOOLEAN
}
