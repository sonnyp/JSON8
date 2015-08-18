'use strict'

import assert from 'assert'
import apply from '../lib/apply'
import diff from '../lib/diff'
import tests from './diff.json'
import {clone} from 'json8'

describe('diff', () => {

  tests.forEach(test => {
    test = clone(test)
    it(test.description, () => {
      assert.deepEqual(diff(test.a, test.b), test.diff)
      assert.deepEqual(apply(test.a, test.diff), test.b)
    })
  })

})
