'use strict'

const types = require('./types')
const OBJECT = types.OBJECT
const STRING = types.STRING
const BOOLEAN = types.BOOLEAN
const NUMBER = types.NUMBER

module.exports = function valid(obj) {
  const type = typeof obj
  switch (type) {
    case STRING:
    case BOOLEAN:
      return true
    case NUMBER:
      return isFinite(obj)
  }

  if (obj === null) return true
  else if (type !== OBJECT) return false

  let i, l, item

  if (global.Set && obj instanceof Set) {
    const values = obj.values()
    for (i = 0, l = obj.size; i < l; i++)
      if (!valid(values.next().value)) return false
    return true
  }

  if (global.Map && obj instanceof Map) {
    const entries = obj.entries()
    for (i = 0, l = obj.size; i < l; i++) {
      item = entries.next().value
      if (typeof item[0] !== 'string') return false
      else if (!valid(item[1])) return false
    }
    return true
  }

  if (Array.isArray(obj)) {
    for (i = 0, l = obj.length; i < l; i++) if (!valid(obj[i])) return false
    return true
  }

  const keys = Object.keys(obj)
  for (i = 0, l = keys.length; i < l; i++)
    if (!valid(obj[keys[i]])) return false
  return true
}
