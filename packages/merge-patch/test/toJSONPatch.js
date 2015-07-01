'use strict'

var assert = require('assert')
var toJSONPatch = require('../lib/toJSONPatch')

describe('toJSONPatch', function() {

  it('converts path properties with null value as a delete operation', function() {
    var patch = toJSONPatch({"foo": null})
    assert.deepEqual(patch, [{"op": "delete", "path": "/foo"}])
  })

  it('converts nested path properties with null value as a delete operation', function() {
    var patch = toJSONPatch({"foo": {"bar": null}})
    assert.deepEqual(patch, [{"op": "delete", "path": "/foo/bar"}])
  })

  it('converts path properties with non null value as an add operation', function() {
    var patch = toJSONPatch({"foo": "hello"})
    assert.deepEqual(patch, [{"op": "add", "path": "/foo", "value": "hello"}])
  })

  it('converts nested path properties with non null value as an add operation', function() {
    var patch = toJSONPatch({"foo": {"bar": "hello"}})
    assert.deepEqual(patch, [{"op": "add", "path": "/foo/bar", "value": "hello"}])
  })

  it('returns a replace operation targeting the whole document if the patch is not an object', function() {
    [true, null, 42, [], 'foo'].forEach(function(v) {
      var patch = toJSONPatch(v)
      assert.deepEqual(patch, [{"op": "replace", "path": "", "value": v}])
    })
  })

})
