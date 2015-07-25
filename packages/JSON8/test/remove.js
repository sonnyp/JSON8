'use strict'

import assert from 'assert'
import {remove} from '..'

describe('remove', () => {

  it('throws a TypeError if the first argument is not an array', () => {
    const targets = [null, true, function() {}, {}]
    if (global.Map) targets.push(new Map())
    targets.forEach(value => {
      assert.throws(() => {
        remove(value, 'foo')
      }, TypeError)
    })
  })

  it('remove the value (once) if target is an array', () => {
    const target = ['bar', 'bar']
    remove(target, 'bar')
    assert.strictEqual(target.length, 1)
  })

  if (global.Set) {
    it('removes the value if target is a set', () => {
      const target = new Set()
      target.add('foo')
      remove(target, 'foo')
      assert(!target.has('foo'))
      assert.strictEqual(target.size, 0)
    })
  }

})
