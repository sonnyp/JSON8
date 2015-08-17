'use strict'

import assert from 'assert'
import toJSONPatch from '../lib/toJSONPatch'
import tests from './RFC.json'
import {apply} from 'json8-patch'
import {clone} from 'json8'

describe('toJSONPatch', () => {

  it('converts path properties with null value as a remove operation', () => {
    const patch = toJSONPatch({"foo": null})
    assert.deepEqual(patch, [{"op": "remove", "path": "/foo"}])
  })

  it('converts nested path properties with null value as a remove operation', () => {
    const patch = toJSONPatch({"foo": {"bar": null}})
    assert.deepEqual(patch, [{"op": "remove", "path": "/foo/bar"}])
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

  describe('RFC', function() {

    tests.forEach(function(test) {
      test = clone(test)

      if (test['json-patch'] === false) {
        it('throws an error for ' + JSON.stringify(test.patch) + ' apply on ' + JSON.stringify(test.original), () => {
          const patch = toJSONPatch(test.patch)
          assert.throws(function() {
            apply(test.original, patch)
          })
        })
      }
      else {
        it('returns ' + JSON.stringify(test.result), () => {
          const patch = toJSONPatch(test.patch)
          assert.deepEqual(apply(test.original, patch).doc, test.result)
        })
      }
    })

  })

})
