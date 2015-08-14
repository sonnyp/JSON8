'use strict'

import assert from 'assert'
import {serialize} from '..'

const valid = [
  ['true', true],
  ['false', false],
  ['null', null],
  ['"foo"', 'foo'],
  ['{}', {}],
  ['[]', []],
  ['42', 42],
  ['-0', -0],
  ['-42', -42],
]

if (global.Set)
  valid.push(['[]', new Set()])

if (global.Map)
  valid.push(['{}', new Map()])

const invalid = [
  ['Infinity', Infinity],
  ['-Infinity', -Infinity],
  ['function', function() {}],
  ['undefined', undefined],
  ['NaN', NaN],
]

if (global.Symbol && typeof Symbol() === 'symbol') invalid.push(['symbol', Symbol()])

const forEach = function(obj, fn) {
  obj.forEach(function(item) {
    fn(item[0], item[1])
  })
}

describe('serialize', () => {

  forEach(valid, (k, v) => {
    it('returns ' + k + ' for ' + k, () => {
      assert.deepEqual(serialize(v), k)
    })
  })

  forEach(invalid, (k, v) => {
    it('throws a TypeError for ' + k, () => {
      assert.throws(function() {
        serialize(v)
      }, TypeError)
    })
  })

  if (global.Map) {
    describe('map', function() {
      it('throws an error for non string keys', () => {
        const map = new Map()
        map.set(null, 'hello')
        assert.throws(function() {
          valid(map)
        }, TypeError)
      })
    })
  }

})
