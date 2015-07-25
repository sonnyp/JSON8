'use strict'

import assert from 'assert'
import {unset} from '..'

describe('unset', () => {

  it('throws a TypeError if key argument is not a string', () => {
    assert.throws(() => {
      unset({}, true)
    }, TypeError)
  })

  it('throws a TypeError if target argument is not an object', () => {
    const targets = [null, true, function() {}, []]
    if (global.Set) targets.push(new Set())
    targets.forEach(target => {
      assert.throws(() => {
        unset(target, 'foo')
      }, TypeError)
    })
  })

  it('remove the key from object', () => {
    const target = {"foo": "bar"}
    unset(target, 'foo')
    assert.strictEqual(Object.keys(target).length, 0)
  })

  if (global.Map) {
    it('removes the key from map', () => {
      const target = new Map()
      target.set('foo', 'bar')
      unset(target, 'foo')
      assert(!target.has('foo'))
      assert.strictEqual(target.size, 0)
    })
  }

})
