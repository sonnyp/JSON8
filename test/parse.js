import assert from 'assert'
import {parse, OBJECT} from '..'

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
      assert.throws(() => {
        parse(k)
      }, SyntaxError)
    })
  })

  it('parse objects as Maps if enabled', () => {
    const str = '{"foo":"bar"}'
    const parsed = parse(str, {map: true})
    assert(parsed instanceof Map)
    assert.equal(parsed.get('foo'), 'bar')
  })

  it('doesn\'t parse objects as Maps if not enabled', () => {
    const str = '{"foo":"bar"}'
    const parsed = parse(str)
    assert.equal(typeof parsed, OBJECT)
    assert.equal(parsed.foo, 'bar')
  })

  it('doesn\'t parse objects as Maps if disabled', () => {
    const str = '{"foo":"bar"}'
    const parsed = parse(str, {map: false})
    assert.equal(typeof parsed, OBJECT)
    assert.equal(parsed.foo, 'bar')
  })

  it('parse arrays as Sets if enabled', () => {
    const str = '["foo"]'
    const parsed = parse(str, {set: true})
    assert(parsed instanceof Set)
    assert.equal(parsed.has('foo'), true)
  })

  it('doesn\'t parse arrays as Sets if not enabled', () => {
    const str = '["foo"]'
    const parsed = parse(str)
    assert(Array.isArray(parsed))
    assert.equal(parsed.indexOf('foo'), 0)
  })

  it('doesn\'t parse arrays as Sets if disabled', () => {
    const str = '["foo"]'
    const parsed = parse(str, {set: false})
    assert(Array.isArray(parsed))
    assert.equal(parsed.indexOf('foo'), 0)
  })

})
