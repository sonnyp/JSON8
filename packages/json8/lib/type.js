'use strict'

const types = require('./types')
const OBJECT = types.OBJECT
const ARRAY = types.ARRAY
const NULL = types.NULL
const STRING = types.STRING
const BOOLEAN = types.BOOLEAN
const NUMBER = types.NUMBER

module.exports = function type(obj) {
  const t = typeof obj

  if (t === BOOLEAN || t === STRING) return t
  else if (t === NUMBER && isFinite(obj)) return NUMBER
  else if (t === OBJECT) {
    if (Array.isArray(obj)) return ARRAY
    else if (global.Set && obj instanceof Set) return ARRAY
    else if (global.Map && obj instanceof Map) return OBJECT
    else if (obj === null) return NULL
    else if (t === OBJECT) return OBJECT
  }
}
