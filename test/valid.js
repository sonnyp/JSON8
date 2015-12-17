import assert from 'assert'
import {valid} from '..'

/*eslint-disable object-shorthand*/
const VALID = {
  'true': true,
  'false': false,
  'null': null,
  '"foo"': 'foo',
  '{}': {},
  '[]': [],
  '42': 42,
  '-0': -0,
  '-42': -42,
  'map': new Map(),
  'set': new Set(),
}

const INVALID = {
  "Infinity": Infinity,
  "-Infinity": -Infinity,
  "function": function() {},
  "undefined": undefined,
  "NaN": NaN,
}
/*eslint-enable object-shorthand*/

const forEach = function(obj, fn) {
  for (const i in obj)
    fn(i, obj[i])
}

if (global.Symbol && typeof Symbol() === 'symbol') INVALID.symbol = Symbol()

describe('valid', () => {

  forEach(VALID, (k, v) => {
    it('returns true for ' + k, () => {
      assert.strictEqual(valid(v), true)
    })
  })

  forEach(INVALID, (k, v) => {
    it('returns false for ' + k, () => {
      assert.strictEqual(valid(v), false)
    })
  })

  describe('map', function() {
    it('return false for non string keys', () => {
      const map = new Map()
      map.set(null, 'hello')
      assert.strictEqual(valid(map), false)
    })
  })

})
