'use strict'

var assert = require('assert')
var extras = require('../lib/extras')

describe('get', function() {

  var doc

  var get = function(path) {
    return extras.get(doc, path)
  }

  describe('object location', function() {

    it('returns the value if the location exists', function() {
      doc = {'foo': 'bar'}
      var r = get('/foo')
      assert.strictEqual(r, 'bar')
    })

    it('returns undefined if the location does not exists', function() {
      doc = {}
      var r = get('/foo')
      assert.strictEqual(r, undefined)
    })

    it('throws an error if the path cannot be walked', function() {
      doc = {}
      assert.throws(function() {
        get('/foo/bar')
      }, Error)
    })

  })

  describe('array location', function() {

    it('returns the value if the location exists', function() {
      doc = {'foo': ['bar']}
      var r = get('/foo/0')
      assert.strictEqual(r, 'bar')
    })

    it('returns undefined if the value does not exists', function() {
      doc = {'foo': []}
      var r = get('/foo/0')
      assert.strictEqual(r, undefined)
    })

    it('throws an error if the path cannot be walked', function() {
      doc = {'foo': []}
      assert.throws(function() {
        get('/foo/0/bar')
      }, Error)
    })

  })

})
