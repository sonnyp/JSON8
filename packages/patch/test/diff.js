'use strict'

import diff from '../lib/diff'
import assert from 'assert'

describe('diff', () => {

  const tests = require('./diff.json')

  tests.forEach(function(test) {

    const patch = diff(test.a, test.b)

    it(test.description, () => {

      assert.deepEqual(patch, test.patch)
    })

  })
})
