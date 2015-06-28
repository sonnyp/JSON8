'use strict'

var assert = require('assert')
var operations = require('../lib/operations')

describe('copy', function() {

  var doc

  var copy = function(path, dest) {
    return operations.copy(doc, path, dest)
  }

  describe('object location', function() {

    it('copy the object if the parent exists and is valid', function() {
      doc = {bar: 'foo'}
      copy('/bar', '/foo')
      assert.deepEqual(doc.bar, doc.foo)
    })

    it('doesn\'t shallow copy objects', function() {
      doc = {bar: []}
      copy('/bar', '/foo')
      assert.deepEqual(doc.bar, doc.foo)
    })

    it('throws an error if the parent does not exists', function() {
      doc = {}
      assert.throws(function() {
        copy('/foo/bar', '/bar/foo')
      }, Error)
    })

    it('throws an error if the parent is not valid', function() {
      doc = {foo: 'bar'}
      assert.throws(function() {
        copy('/foo/bar', '/bar/foo')
      }, Error)
    })

  })

  describe('array location', function() {

    it('sets the value if the parent exists and is valid', function() {
      doc = {'foo': ['bar']}
      copy('/foo/0', '/foo/1')
      assert.deepEqual(doc.foo[0], doc.foo[1])
    })

    it('throws an error if the parent does not exists', function() {
      doc = {'foo': []}
      assert.throws(function() {
        copy('/foo/0/bar', '/foo/bar')
      }, Error)
    })

    it('throws an error if the parent is not valid', function() {
      doc = {foo: true}
      assert.throws(function() {
        copy('/foo/bar', '/bar/foo')
      }, Error)
    })

  })

})
