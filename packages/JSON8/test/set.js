'use strict'

import assert from 'assert'
import {set} from '..'

describe('set', () => {

  it('throws a TypeError if key argument is not a string', () => {
    assert.throws(() => {
      set({}, true, 'foo')
    }, TypeError)
  })

  it('throws a TypeError if target argument is not an object', () => {
    const targets = [null, true, function() {}, []]
    if (global.Set) targets.push(new Set())
    targets.forEach(target => {
      assert.throws(() => {
        set(target, 'foo', 'bar')
      }, TypeError)
    })
  })

  it('adds the key/value to object', () => {
    const target = {}
    set(target, 'foo', 'bar')
    assert.strictEqual(target.foo, 'bar')
    assert.strictEqual(Object.keys(target).length, 1)
  })

  if (global.Map) {
    it('adds the key/value to set', () => {
      const target = new Map()
      set(target, 'foo', 'bar')
      assert.strictEqual(target.size, 1)
      assert.strictEqual(target.get('foo'), 'bar')
    })
  }

})
