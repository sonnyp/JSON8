'use strict'

import diff from '../lib/diff'
import assert from 'assert'
// import equal from 'json8'

// var eq = function(a, b) {
//   assert(equal(a, b))
// }

describe('diff', () => {

  it('foo', () => {
    assert.deepEqual(diff(true, true), [])
  })

  it('foo', () => {
    assert.deepEqual(diff([], []), [])
  })

  it('foo', () => {
    assert.deepEqual(diff({}, {}), [])
  })

  it('foo2', () => {
    const patch = diff(true, false)
    assert.deepEqual(patch, [{"op": "replace", "path": "", "value": false}])
  })

  it('foo2', () => {
    const patch = diff(true, [])
    assert.deepEqual(patch, [{"op": "replace", "path": "", "value": []}])
  })

  it('foo2', () => {
    const patch = diff([], true)
    assert.deepEqual(patch, [{"op": "replace", "path": "", "value": true}])
  })

  it('foo2', () => {
    const patch = diff([], {})
    assert.deepEqual(patch, [{"op": "replace", "path": "", "value": {}}])
  })

  it('foo2', () => {
    const patch = diff({}, [])
    assert.deepEqual(patch, [{"op": "replace", "path": "", "value": []}])
  })

  it('foo2', () => {
    const patch = diff({"foo": "bar"}, {})
    assert.deepEqual(patch, [{"op": "remove", "path": "/foo"}])
  })

  it('foo2', () => {
    const patch = diff({"foo": "bar"}, {"foo": "foo"})
    assert.deepEqual(patch, [{"op": "replace", "path": "/foo", "value": "foo"}])
  })

  it('foo2', () => {
    const patch = diff({}, {"foo": "foo"})
    assert.deepEqual(patch, [{"op": "add", "path": "/foo", "value": "foo"}])
  })

  //nested

  it('foo2', () => {
    const patch = diff({"foo": {"foo": "bar"}}, {"foo": {"foo": "foo"}})
    assert.deepEqual(patch, [{"op": "replace", "path": "/foo/foo", "value": "foo"}])
  })

  it('foo2', () => {
    const patch = diff({"foo": {}}, {"foo": {"foo": "foo"}})
    assert.deepEqual(patch, [{"op": "add", "path": "/foo/foo", "value": "foo"}])
  })

  it('foo2', () => {
    const patch = diff({"foo": {"foo": "foo"}}, {"foo": {}})
    assert.deepEqual(patch, [{"op": "remove", "path": "/foo/foo"}])
  })

  //oopsie
  //
  it('foo2', () => {
    const patch = diff({}, {"foo": {"foo": "foo"}})
    assert.deepEqual(patch, [{"op": "add", "path": "/foo", "value": {"foo": "foo"}}])
  })
})
