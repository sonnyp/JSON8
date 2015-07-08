'use strict'

import assert from 'assert'
import {forEach} from '..'

const INVALID = [
  null,
  undefined,
  function() {},
  43,
  NaN,
  true,
  'foo',
]

describe('forEach', () => {

  it('throws an error if the passed argument is not a structure', () => {
    INVALID.forEach(value => {
      assert.throws(() => {
        forEach(value)
      }, TypeError)
    })
  })

  it('iterates over arrays', () => {
    const struct = ['foo', 'bar']
    let r = 0
    forEach(struct, (item, idx, obj) => {
      assert.equal(item, struct[idx])
      assert.equal(obj, struct)
      r++
    })
    assert.equal(r, struct.length)
  })

  if (global.Set) {
    it('iterates over sets', () => {
      const struct = new Set(['foo', 'bar'])
      let r = 0
      forEach(struct, (item, item2, obj) => {
        assert.strictEqual(item, item2)
        assert(struct.has(item))
        assert.equal(obj, struct)
        r++
      })
      assert.equal(r, struct.size)
    })
  }

  if (global.Map) {
    it('iterates over maps', () => {
      const struct = new Map()
      struct.set(0, 'foo')
      struct.set(1, 'bar')
      let r = 0
      forEach(struct, (value, key, obj) => {
        assert.equal(value, struct.get(key))
        assert.equal(obj, struct)
        r++
      })
      assert.equal(r, struct.size)
    })
  }

  it('iterates over objects', () => {
    const struct = {0: "foo", 1: "bar"}
    let r = 0
    forEach(struct, (value, key, obj) => {
      assert.equal(value, struct[key])
      assert.equal(obj, struct)
      r++
    })
    assert.equal(r, Object.keys(struct).length)
  })

})
