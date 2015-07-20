'use strict'

import assert from 'assert'
import {size} from '..'

describe('size', () => {

  it('returns size for array', () => {
    assert.equal(size(["foo"]), 1)
  })

  it('returns size for object', () => {
    assert.equal(size({"foo": "bar"}), 1)
  })

  if (global.Set) {
    it('returns size for set', () => {
      assert.equal(size(new Set(['foo'])), 1)
    })
  }

  if (global.Map) {
    it('returns size for map', () => {
      const map = new Map()
      map.set('foo', 'bar')
      assert.equal(size(map), 1)
    })
  }

  it('throws an error if the passed argument is not a structure', () => {
    assert.throws(() => {
      size(null)
    }, TypeError)
  })
})
