'use strict'

import assert from 'assert'
import {add} from '..'

describe('add', () => {

  it('throws a TypeError if the first argument is not an array', () => {
    const targets = [null, true, function() {}, {}]
    if (global.Map) targets.push(new Map())
    targets.forEach(value => {
      assert.throws(() => {
        add(value, 'foo')
      }, TypeError)
    })
  })

  it('pushes the value if target is an array', () => {
    const target = ['bar']
    add(target, 'foo')
    assert.strictEqual(target.length, 2)
    assert.strictEqual(target[1], 'foo')
  })

  if (global.Set) {
    it('sets the value if target is a set', () => {
      const target = new Set()
      add(target, 'foo')
      add(target, 'foo')
      assert.strictEqual(target.size, 1)
      assert(target.has('foo'))
    })
  }

})
