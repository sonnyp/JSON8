'use strict'

/*
  https://tools.ietf.org/html/rfc6901#page-5
 */

var assert = require('assert')
var pointer = require('../index')

describe('RFC', function() {

  var doc = {
    "foo": ["bar", "baz"],
    "": 0,
    "a/b": 1,
    "c%d": 2,
    "e^f": 3,
    "g|h": 4,
    "i\\j": 5,
    "k\"l": 6,
    " ": 7,
    "m~n": 8
  }

  var find = function(p) {
    return pointer.find(doc, p)
  }

  it('returns the whole document', function() {
    var r = find('')
    assert.strictEqual(r, doc)
    assert.deepEqual(r, doc)
  })

  it('returns ["bar", "baz"]', function() {
    var r = find('/foo')
    assert.strictEqual(r, doc.foo)
    assert.deepEqual(r, ['bar', 'baz'])
  })

  it('returns "bar"', function() {
    var r = find('/foo/0')
    assert.strictEqual(r, doc.foo[0])
    assert.strictEqual(r, 'bar')
  })

  it('returns 0', function() {
    var r = find('/')
    assert.strictEqual(r, doc[''])
    assert.strictEqual(r, 0)
  })

  it('returns 1', function() {
    var r = find('/a~1b')
    assert.strictEqual(r, doc['a/b'])
    assert.strictEqual(r, 1)
  })

  it('returns 2', function() {
    var r = find('/c%d')
    assert.strictEqual(r, doc['c%d'])
    assert.strictEqual(r, 2)
  })

  it('returns 3', function() {
    var r = find('/e^f')
    assert.strictEqual(r, doc['e^f'])
    assert.strictEqual(r, 3)
  })

  it('returns 4', function() {
    var r = find('/g|h')
    assert.strictEqual(r, doc['g|h'])
    assert.strictEqual(r, 4)
  })

  it('returns 5', function() {
    var r = find('/i\\j')
    assert.strictEqual(r, doc['i\\j'])
    assert.strictEqual(r, 5)
  })

  it('returns 6', function() {
    var r = find('/k\"l')
    assert.strictEqual(r, doc['k\"l'])
    assert.strictEqual(r, 6)
  })

  it('returns 7', function() {
    var r = find('/ ')
    assert.strictEqual(r, doc[' '])
    assert.strictEqual(r, 7)
  })

  it('returns 8', function() {
    var r = find('/m~0n')
    assert.strictEqual(r, doc['m~n'])
    assert.strictEqual(r, 8)
  })

})
