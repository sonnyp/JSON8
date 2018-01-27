'use strict'

const isArray = require('./isArray')
const OBJECT = require('./types').OBJECT

module.exports = global.Map
  ? function isObject(obj) {
      return (
        obj instanceof Map ||
        (typeof obj === OBJECT && obj !== null && !isArray(obj))
      )
    }
  : function isObject(obj) {
      return typeof obj === OBJECT && obj !== null && !isArray(obj)
    }
