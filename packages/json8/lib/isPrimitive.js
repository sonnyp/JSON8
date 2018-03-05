'use strict'

const types = require('./types')
const BOOLEAN = types.BOOLEAN
const STRING = types.STRING
const NUMBER = types.NUMBER

module.exports = function isPrimitive(obj) {
  if (obj === null) return true

  const type = typeof obj
  if (type === NUMBER && isFinite(obj)) return true

  return type === BOOLEAN || type === STRING || obj === null
}
