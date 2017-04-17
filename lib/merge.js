'use strict'

var OBJECT = require('./types').OBJECT

var isObject = function(obj) {
  return typeof obj === OBJECT && obj !== null && !Array.isArray(obj)
}

var defaultOptions = Object.create(null)
defaultOptions.object = 'replace' // replace/merge
defaultOptions.array = 'replace' // replace/concat/merge
defaultOptions.undefined = 'replace' // replace/deleteg
defaultOptions.new = 'include' // include/exclude

var combine = function(a, b, options) {
  var opts = isObject(options) ? options : defaultOptions

  // options as fn?

  var keys = Object.keys(b)
  for (var i = 0, l = keys.length; i < l; i++) {
    var key = keys[i]
    var ac = a[key]
    var bc = b[key]

    if (isObject(ac) && isObject(bc) && opts.object === 'merge')
      a[key] = combine(ac, bc)
    else if (opts.undefined === 'delete')
      delete a[key]
    else if (Array.isArray(a) && Array.isArray(b) && opts.array === 'concat')
      a[key] = ac.concat(bc)
    else
      a[key] = bc
  }
  return a
}

module.exports = function merge(a, b, options) {
  if (!isObject(a))
    throw new TypeError(a + ' is not an object')
  if (!isObject(b))
    throw new TypeError(b + ' is not an object')

  return combine(a, b, options)
}

var merge = module.exports

var a = {
  foo: 'bar',
  truc: {
    foo: 'bar'
  }
}

var b = {
  bar: 'foo',
  truc: {
    bar: 'foo'
  }
}


console.log(merge(a, b))
