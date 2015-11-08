import assert from 'assert'
import {is, isObject, isPrimitive, isNull, isJSON, isArray, isStructure, isNumber, isString, isBoolean} from '..'

const primitives = {
  'null': null,
  'true': true,
  'false': false,
  '\'foo\'': 'string',
  'positive integer': 42,
  'negative integer': -42,
  'positive float': 4.2,
  'negative float': -4.2,
}

const numbers = {
  'positive integer': 42,
  'negative integer': -42,
  'positive float': 4.2,
  'negative float': -4.2,
}

const structures = {
  '[]': [],
  '{}': {},
  'map': new Map(),
  'set': new Set(),
}

const VALID = {}
for (const p in primitives)
  VALID[p] = primitives[p]
for (const s in structures)
  VALID[s] = structures[s]

/*eslint-disable object-shorthand*/
const INVALID = {
  'Infinity': Infinity,
  '-Infinity': -Infinity,
  'NaN': NaN,
  'undefined': undefined,
  'function': () => {},
}
/*eslint-enable object-shorthand*/

const ALL = {}
for (const valid in VALID)
  ALL[valid] = VALID[valid]
for (const invalid in INVALID)
  ALL[invalid] = INVALID[invalid]

if (global.Symbol && typeof Symbol() === 'symbol') INVALID.symbol = Symbol()

const forEach = function(obj, fn) {
  for (const i in obj) {
    fn(i, obj[i])
  }
}

const forEachBut = function(obj, but, fn) {
  if (isObject(but))
    but = Object.keys(but)
  else
    but = isArray(but) ? but : [but]

  forEach(obj, function(k, v) {
    if (but.indexOf(k) === -1)
      fn(k, v)
  })
}

const validBut = function(but, fn) {
  forEachBut(VALID, but, fn)
}

const invalidBut = function(but, fn) {
  forEachBut(INVALID, but, fn)
}

const allBut = function(but, fn) {
  validBut(but, fn)
  invalidBut(but, fn)
}

describe('is', () => {

  it('throws an error if the type is unknown', () => {
    assert.throws(() => {
      is('foo', 'bar')
    }, Error)
  })

  describe('JSON', () => {
    forEach(VALID, (k, v) => {
      it('returns true for ' + k, () => {
        assert.strictEqual(is(v, 'JSON'), true)
        assert.strictEqual(isJSON(v), true)
      })
    })

    forEach(INVALID, (k, v) => {
      it('returns false for ' + k, () => {
        assert.strictEqual(is(v, 'JSON'), false)
        assert.strictEqual(isJSON(v), false)
      })
    })
  })

  describe('structure', () => {
    forEach(structures, (k, v) => {
      it('returns true for ' + k, () => {
        assert.strictEqual(is(v, 'structure'), true)
        assert.strictEqual(isStructure(v), true)
      })
    })

    allBut(structures, (k, v) => {
      it('returns false for ' + k, () => {
        assert.strictEqual(is(v, 'structure'), false)
        assert.strictEqual(isStructure(v), false)
      })
    })
  })

  describe('object', () => {
    it('returns true for {}', () => {
      assert.strictEqual(is({}, 'object'), true)
      assert.strictEqual(isObject({}), true)
    })

    it('returns true for map', () => {
      assert.strictEqual(is(new Map(), 'object'), true)
      assert.strictEqual(isObject(new Map()), true)
    })

    allBut(['{}', 'map'], (k, v) => {
      it('returns false for ' + k, () => {
        assert.strictEqual(is(v, 'object'), false)
        assert.strictEqual(isObject(v), false)
      })
    })
  })

  describe('array', () => {
    it('returns true for []', () => {
      assert.strictEqual(is([], 'array'), true)
      assert.strictEqual(isArray([]), true)
    })

    it('returns true for set', () => {
      assert.strictEqual(is(new Set(), 'array'), true)
      assert.strictEqual(isArray(new Set()), true)
    })

    allBut(['[]', 'set'], (k, v) => {
      it('returns false for ' + k, () => {
        assert.strictEqual(isArray(v), false)
      })
    })
  })

  describe('primitive', () => {
    forEach(primitives, (k, v) => {
      it('returns true for ' + k, () => {
        assert.strictEqual(is(v, 'primitive'), true)
        assert.strictEqual(isPrimitive(v), true)
      })
    })

    allBut(primitives, (k, v) => {
      it('returns false for ' + k, () => {
        assert.strictEqual(is(v, 'primitive'), false)
        assert.strictEqual(isPrimitive(v), false)
      })
    })
  })

  describe('number', () => {
    forEach(numbers, (k, v) => {
      it('returns true for ' + k, () => {
        assert.strictEqual(is(v, 'number'), true)
        assert.strictEqual(isNumber(v), true)
      })
    })

    allBut(numbers, (k, v) => {
      it('returns false for ' + k, () => {
        assert.strictEqual(is(v, 'number'), false)
        assert.strictEqual(isNumber(v), false)
      })
    })
  })

  describe('string', () => {
    it('returns true for \'foo\'', () => {
      assert.strictEqual(is('foo', 'string'), true)
      assert.strictEqual(isString('foo'), true)
    })

    allBut('\'foo\'', (k, v) => {
      it('returns false for ' + k, () => {
        assert.strictEqual(is(v, 'string'), false)
        assert.strictEqual(isString(v), false)
      })
    })
  })

  describe('boolean', () => {
    it('returns true for true', () => {
      assert.strictEqual(is(true, 'boolean'), true)
      assert.strictEqual(isBoolean(true), true)
    })

    it('returns true for false', () => {
      assert.strictEqual(is(false, 'boolean'), true)
      assert.strictEqual(isBoolean(false), true)
    })

    allBut(['true', 'false'], (k, v) => {
      it('returns false for ' + k, () => {
        assert.strictEqual(is(v, 'boolean'), false)
        assert.strictEqual(isBoolean(v), false)
      })
    })
  })

  describe('null', () => {
    it('returns true for null', () => {
      assert.strictEqual(is(null, 'null'), true)
      assert.strictEqual(isNull(null), true)
    })

    allBut('null', (k, v) => {
      it('returns false for ' + k, () => {
        assert.strictEqual(is(v, 'null'), false)
        assert.strictEqual(isNull(v), false)
      })
    })
  })
})
