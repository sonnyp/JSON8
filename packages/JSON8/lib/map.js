'use strict'

var forEach = require('./forEach')
var OBJECT = require('./types').OBJECT

module.exports.map = function(obj, fn, ctx) {
  if (typeof obj !== OBJECT || obj === null)
    throw new TypeError(obj + ' is not a structure')

  var mapped
  var iterator
  if (ctx) fn = fn.bind(ctx)

  if (Array.isArray(obj)) {
    mapped = []
    iterator = function(value) {
      mapped.push(fn(value))
    }
  }
  else if (global.Set && obj instanceof Set) {
    mapped = new Set()
    iterator = function(value) {
      mapped.add(fn(value))
    }
  }
  else if (global.Map && obj instanceof Map) {
    mapped = new Map()
    iterator = function(value, key) {
      mapped.set(key, fn(value))
    }
  }
  else {
    mapped = {}
    iterator = function(value, key) {
      mapped[key] = fn(value)
    }
  }

  forEach(obj, iterator)
}
