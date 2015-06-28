'use strict'

var assert = require('assert')
var pointer = require('../index')
var parse = pointer.parse
var serialize = pointer.serialize

describe('parse', function() {

  it('returns [\'foo\', \'bar\']', function() {
    var r = parse('/foo/bar')
    assert.deepEqual(r, ['foo', 'bar'])
  })

  it('returns [""]', function() {
    var r = parse('/')
    assert.deepEqual(r, [''])
  })

  it('returns []', function() {
    var r = parse('')
    assert.deepEqual(r, [])
  })

})

describe('serialize', function() {

  it('should return /foo/bar', function() {
    var s = serialize(['foo', 'bar'])
    assert.deepEqual(s, '/foo/bar')
  })

  it('should return ""', function() {
    var s = serialize([])
    assert.deepEqual(s, '')
  })

  it('should return /', function() {
    var s = serialize([''])
    assert.deepEqual(s, '/')
  })

})
