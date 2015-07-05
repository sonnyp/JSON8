'use strict'

import assert from 'assert'
import toJSONPatch from '../lib/toJSONPatch'

describe('toJSONPatch', () => {

  it('converts path properties with null value as a deconste operation', () => {
    const patch = toJSONPatch({"foo": null})
    assert.deepEqual(patch, [{"op": "delete", "path": "/foo"}])
  })

  it('converts nested path properties with null value as a deconste operation', () => {
    const patch = toJSONPatch({"foo": {"bar": null}})
    assert.deepEqual(patch, [{"op": "delete", "path": "/foo/bar"}])
  })

  it('converts path properties with non null value as an add operation', () => {
    const patch = toJSONPatch({"foo": "hello"})
    assert.deepEqual(patch, [{"op": "add", "path": "/foo", "value": "hello"}])
  })

  it('converts nested path properties with non null value as an add operation', () => {
    const patch = toJSONPatch({"foo": {"bar": "hello"}})
    assert.deepEqual(patch, [{"op": "add", "path": "/foo/bar", "value": "hello"}])
  })

  it('returns a replace operation targeting the whole document if the patch is not an object', () => {
    [true, null, 42, [], 'foo'].forEach((v) => {
      const patch = toJSONPatch(v)
      assert.deepEqual(patch, [{"op": "replace", "path": "", "value": v}])
    })
  })

})
