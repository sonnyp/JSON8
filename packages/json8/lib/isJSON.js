'use strict'

const types = require('./types')
const NUMBER = types.NUMBER
const OBJECT = types.OBJECT
const BOOLEAN = types.BOOLEAN
const STRING = types.STRING

module.exports = function isJSON(obj) {
  const type = typeof obj
  return (
    type === BOOLEAN ||
    type === STRING ||
    type === OBJECT ||
    (type === NUMBER && isFinite(obj))
  )
}
