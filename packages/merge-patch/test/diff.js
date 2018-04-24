'use strict'

const assert = require('assert')
const apply = require('../lib/apply')
const diff = require('../lib/diff')
const tests = require('./diff.json')
const {clone} = require('json8')

describe('diff', () => {
  tests.forEach(test => {
    test = clone(test)
    it(test.description, () => {
      assert.deepEqual(diff(test.a, test.b), test.diff)
      assert.deepEqual(apply(test.a, test.diff), test.b)
    })
  })
})
