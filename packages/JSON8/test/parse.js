'use strict'

import assert from 'assert'
import {parse} from '..'

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

const invalid = [
  ['Infinity', Infinity],
  ['-Infinity', -Infinity],
  ['function () {}', function() {}],
  ['undefined', undefined],
  ['NaN', NaN],
]

if (global.Symbol && typeof Symbol() === 'symbol') invalid.push(['symbol', Symbol()])

const forEach = function(obj, fn) {
  obj.forEach(function(item) {
    fn(item[0], item[1])
  })
}

describe('parse', () => {

  forEach(valid, (k, v) => {
    it('returns ' + k + ' for ' + k, () => {
      const parsed = parse(k)
      if (k === '{}')
        assert.equal(typeof parsed, 'object')
      else if (k === '[]')
        assert(Array.isArray(parsed))
      else
        assert.strictEqual(parsed, v)
    })
  })

  forEach(invalid, (k) => {
    it('throws a SyntaxError for ' + k, () => {
      assert.throws(function() {
        parse(k)
      }, SyntaxError)
    })
  })

  if (global.Map) {
    it('parse objects as Maps if enabled', () => {
      const str = '{"foo":"bar"}'
      const parsed = parse(str, {map: true})
      assert(parsed instanceof Map)
      assert.equal(parsed.get('foo'), 'bar')
    })
  }

  if (global.Set) {
    it('parse arrays as Sets if enabled', () => {
      const str = '["foo"]'
      const parsed = parse(str, {set: true})
      assert(parsed instanceof Set)
      assert.equal(parsed.has('foo'), true)
    })
  }

})
