'use strict'

const types = require('./types')
const OBJECT = types.OBJECT
const ARRAY = types.ARRAY
const STRING = types.STRING
const BOOLEAN = types.BOOLEAN
const NUMBER = types.NUMBER
const NULL = types.NULL
const type = require('./type')

function toArray(set) {
  const array = []
  set.forEach(function(item) {
    array.push(item)
  })
  return array
}

function toObject(map) {
  const object = Object.create(null)
  map.forEach(function(value, key) {
    object[key] = value
  })
  return object
}

module.exports = function equal(a, b) {
  const ta = type(a)
  const tb = type(b)

  if (ta !== tb) return false

  const t = ta

  switch (t) {
    case NUMBER:
      if (a === 0 && 1 / a === -Infinity) return b === 0 && 1 / b === -Infinity
      return a === b
    case STRING:
    case NULL:
    case BOOLEAN:
      return a === b
  }

  let i, l
  if (t === ARRAY) {
    if (global.Set) {
      if (a instanceof Set) a = toArray(a)
      if (b instanceof Set) b = toArray(b)
    }
    if (a.length !== b.length) return false
    for (i = 0, l = a.length; i < l; i++) if (!equal(a[i], b[i])) return false
    return true
  }

  if (t === OBJECT) {
    if (global.Map) {
      if (a instanceof Map) a = toObject(a)
      if (b instanceof Map) b = toObject(b)
    }
    const keys = Object.keys(a)
    if (keys.length !== Object.keys(b).length) return false
    for (i = 0, l = keys.length; i < l; i++) {
      const key = keys[i]
      if (b.hasOwnProperty && !b.hasOwnProperty(key)) return false
      if (!equal(b[key], a[key])) return false
    }
    return true
  }

  return true
}
