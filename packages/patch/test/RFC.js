'use strict'

import assert from 'assert'
import apply from '../lib/apply'

/* eslint comma-dangle: 0, space-in-brackets: 0 */

// https://tools.ietf.org/html/rfc6902#appendix-A
describe('RFC Examples', () => {
  it('Adding an Object Member', () => {
    const doc = { "foo": "bar"}
    const patch = [
      { "op": "add", "path": "/baz", "value": "qux" }
    ]
    const expected = {
      "baz": "qux",
      "foo": "bar"
    }
    assert.deepEqual(apply(doc, patch).doc, expected)
  })

  it('Adding an Array Element', () => {
    const doc = { "foo": [ "bar", "baz" ] }
    const patch = [
      { "op": "add", "path": "/foo/1", "value": "qux" }
    ]
    const expected = { "foo": [ "bar", "qux", "baz" ] }
    assert.deepEqual(apply(doc, patch).doc, expected)
  })

  it('Removing an Object Member', () => {
    const doc = {
      "baz": "qux",
      "foo": "bar"
    }
    const patch = [
      { "op": "remove", "path": "/baz" }
    ]
    const expected = { "foo": "bar" }
    assert.deepEqual(apply(doc, patch).doc, expected)
  })

  it('Removing an Array Element', () => {
    const doc = { "foo": [ "bar", "qux", "baz" ] }
    const patch = [
      { "op": "remove", "path": "/foo/1" }
    ]
    const expected = { "foo": [ "bar", "baz" ] }
    assert.deepEqual(apply(doc, patch).doc, expected)
  })

  it('Removing an Array Element', () => {
    const doc = {
      "baz": "qux",
      "foo": "bar"
    }
    const patch = [
      { "op": "replace", "path": "/baz", "value": "boo" }
    ]
    const expected = {
      "baz": "boo",
      "foo": "bar"
    }
    assert.deepEqual(apply(doc, patch).doc, expected)
  })

  it('Moving a Value', () => {
    const doc = {
      "foo": {
        "bar": "baz",
        "waldo": "fred"
      },
      "qux": {
        "corge": "grault"
      }
    }
    const patch = [
      { "op": "move", "from": "/foo/waldo", "path": "/qux/thud" }
    ]
    const expected = {
      "foo": {
        "bar": "baz"
      },
      "qux": {
        "corge": "grault",
        "thud": "fred"
      }
    }
    assert.deepEqual(apply(doc, patch).doc, expected)
  })

  it('Moving an Array Element', () => {
    const doc = { "foo": [ "all", "grass", "cows", "eat" ] }
    const patch = [
      { "op": "move", "from": "/foo/1", "path": "/foo/3" }
    ]
    const expected = { "foo": [ "all", "cows", "eat", "grass" ] }
    assert.deepEqual(apply(doc, patch).doc, expected)
  })

  it('Testing a Value: Success', () => {
    const doc = {
      "baz": "qux",
      "foo": [ "a", 2, "c" ]
    }
    const patch = [
      { "op": "test", "path": "/baz", "value": "qux" },
      { "op": "test", "path": "/foo/1", "value": 2 }
    ]
    assert.doesNotThrow(() => {
      apply(doc, patch)
    })
  })

  it('Testing a Value: Error', () => {
    const doc = { "baz": "qux" }
    const patch = [
      { "op": "test", "path": "/baz", "value": "bar" }
    ]
    assert.throws(() => {
      apply(doc, patch)
    })
  })

  it('Adding a Nested Member Object', () => {
    const doc = { "foo": "bar" }
    const patch = [
      { "op": "add", "path": "/child", "value": { "grandchild": { } } }
    ]
    const expected = {
      "foo": "bar",
      "child": {
        "grandchild": {
        }
      }
    }
    assert.deepEqual(apply(doc, patch).doc, expected)
  })

  it('Ignoring Unrecognized Elements', () => {
    const doc = { "foo": "bar" }
    const patch = [
      { "op": "add", "path": "/baz", "value": "qux", "xyz": 123 }
    ]
    const expected = {
      "foo": "bar",
      "baz": "qux"
    }
    assert.deepEqual(apply(doc, patch).doc, expected)
  })

  it('Adding to a Nonexistent Target', () => {
    const doc = { "foo": "bar" }
    const patch = [
      { "op": "add", "path": "/baz/bat", "value": "qux" }
    ]
    assert.throws(() => {
      apply(doc, patch)
    })
  })

  // cannot be tested https://tools.ietf.org/html/rfc6902#appendix-A.13
  it('Invalid JSON Patch Document', () => {
    const patch = [ // eslint-disable-line no-unused-vars
      { "op": "add", "path": "/baz", "value": "qux", "op": "remove" } // eslint-disable-line no-dupe-keys
    ]
  })

  it('Escape Ordering', () => {
    const doc = {
      "/": 9,
      "~1": 10
    }
    const patch = [
      {"op": "test", "path": "/~01", "value": 10}
    ]
    const expected = {
      "/": 9,
      "~1": 10
    }
    assert.deepEqual(apply(doc, patch).doc, expected)
  })

  it('Comparing Strings and Numbers', () => {
    const doc = {
      "/": 9,
      "~1": 10
    }
    const patch = [
      {"op": "test", "path": "/~01", "value": "10"}
    ]
    assert.throws(() => {
      apply(doc, patch)
    })
  })

  it('Adding an Array Value', () => {
    const doc = { "foo": ["bar"] }
    const patch = [
      { "op": "add", "path": "/foo/-", "value": ["abc", "def"] }
    ]
    const expected = { "foo": ["bar", ["abc", "def"]] }
    assert.deepEqual(apply(doc, patch).doc, expected)
  })
})
