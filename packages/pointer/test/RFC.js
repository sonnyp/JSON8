/*
  https://tools.ietf.org/html/rfc6901#page-5
 */

import assert from 'assert'
import pointer from '..'

describe('RFC', () => {

  const doc = {
    "foo": ["bar", "baz"],
    "": 0,
    "a/b": 1,
    "c%d": 2,
    "e^f": 3,
    "g|h": 4,
    "i\\j": 5,
    "k\"l": 6,
    " ": 7,
    "m~n": 8,
  }

  const find = function(p) {
    return pointer.find(doc, p)
  }

  it('returns the whole document', () => {
    const r = find('')
    assert.strictEqual(r, doc)
    assert.deepEqual(r, doc)
  })

  it('returns ["bar", "baz"]', () => {
    const r = find('/foo')
    assert.strictEqual(r, doc.foo)
    assert.deepEqual(r, ['bar', 'baz'])
  })

  it('returns "bar"', () => {
    const r = find('/foo/0')
    assert.strictEqual(r, doc.foo[0])
    assert.strictEqual(r, 'bar')
  })

  it('returns 0', () => {
    const r = find('/')
    assert.strictEqual(r, doc[''])
    assert.strictEqual(r, 0)
  })

  it('returns 1', () => {
    const r = find('/a~1b')
    assert.strictEqual(r, doc['a/b'])
    assert.strictEqual(r, 1)
  })

  it('returns 2', () => {
    const r = find('/c%d')
    assert.strictEqual(r, doc['c%d'])
    assert.strictEqual(r, 2)
  })

  it('returns 3', () => {
    const r = find('/e^f')
    assert.strictEqual(r, doc['e^f'])
    assert.strictEqual(r, 3)
  })

  it('returns 4', () => {
    const r = find('/g|h')
    assert.strictEqual(r, doc['g|h'])
    assert.strictEqual(r, 4)
  })

  it('returns 5', () => {
    const r = find('/i\\j')
    assert.strictEqual(r, doc['i\\j'])
    assert.strictEqual(r, 5)
  })

  it('returns 6', () => {
    const r = find('/k\"l')
    assert.strictEqual(r, doc['k\"l'])
    assert.strictEqual(r, 6)
  })

  it('returns 7', () => {
    const r = find('/ ')
    assert.strictEqual(r, doc[' '])
    assert.strictEqual(r, 7)
  })

  it('returns 8', () => {
    const r = find('/m~0n')
    assert.strictEqual(r, doc['m~n'])
    assert.strictEqual(r, 8)
  })

})
