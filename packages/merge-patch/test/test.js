'use strict'

var assert = require('assert')
var patch = require('../index')
var apply = patch.apply

describe('apply', function() {

  it('returns the patch argument if it\'s not an object', function() {
    [true, false, null, [], 42, 'foo'].forEach(function(v) {
      assert.equal(apply({}, v), v)
    })
  })

  it('returns an object if document argument is not an object', function() {
    [true, false, null, [], 42, 'foo'].forEach(function(v) {
      var doc = apply(v, {})
      assert.equal(typeof doc, 'object')
      assert(doc !== null)
    })
  })

  it('throws a TypeError if patch argument is not JSON', function() {
    [undefined, +Infinity, -Infinity, NaN].forEach(function(v) {
      assert.throws(function() {
        apply({}, v)
      }, TypeError)
    })
  })

  it('deletes patch properties with value null', function() {
    var doc = {"foo": "bar"}
    doc = apply(doc, {"foo": null})
    assert.deepEqual(doc, {})
  })

  it('deletes nested patch properties with value null', function() {
    var doc = {"foo": {"bar": "foo"}}
    doc = apply(doc, {"foo": {"bar": null}})
    assert.deepEqual(doc, {"foo": {}})
  })

  it('adds patch properties with non null value', function() {
    var doc = {}
    var patch = {"foo": "bar", "bar": "foo"}
    doc = apply(doc, patch)
    assert.deepEqual(doc, patch)
  })

  it('adds nested patch properties with non null value', function() {
    var doc = {}
    var patch = {"foo": {"bar": "foo"}}
    doc = apply(doc, patch)
    assert.deepEqual(doc, patch)
  })

})

describe('patch', function() {

  it('is an alias to apply method', function() {
    assert.equal(patch.patch, patch.apply)
  })

})
