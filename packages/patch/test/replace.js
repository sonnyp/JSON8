'use strict'

var assert = require('assert')
var operations = require('../lib/operations')

describe('replace', function() {

  var doc

  var replace = function(path, obj) {
    return operations.replace(doc, path, obj)
  }

  describe('object location', function() {

    it('replaces the value if the parent exists and is valid', function() {
      doc = {'foo': 'hello'}
      var obj = {bar: 'foo'}
      var r = replace('/foo', {bar: 'foo'})
      assert.deepEqual(r[0].foo, obj)
    })

    it('throws an error if the parent does not exists', function() {
      doc = {}
      assert.throws(function() {
        replace('/foo/bar', {bar: 'foo'})
      }, Error)
    })

    it('throws an error if the parent is not valid', function() {
      doc = {foo: 'bar'}
      assert.throws(function() {
        replace('/foo/bar', {bar: 'foo'})
      }, Error)
    })

  })

  describe('array location', function() {

    it('replaces the value if the parent exists and is valid', function() {
      doc = {'foo': ['bar']}
      var r = replace('/foo/0', 'barfoo')
      assert.deepEqual(r[0], {foo: ['barfoo']})
    })

    it('throws an error if the parent does not exists', function() {
      doc = {'foo': []}
      assert.throws(function() {
        replace('/foo/0/bar', 'foobar')
      }, Error)
    })

    it('throws an error if the parent is not valid', function() {
      doc = {foo: true}
      assert.throws(function() {
        replace('/foo/bar', {bar: 'foo'})
      }, Error)
    })

  })

})
