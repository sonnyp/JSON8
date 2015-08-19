'use strict'

import assert from 'assert'
import {clone} from 'json8'
import apply from '../lib/apply'
import revert from '../lib/revert'
import pack from '../lib/pack'
import unpack from '../lib/unpack'
import valid from '../lib/valid'

let tests = require('json-patch-test-suite/tests.json')
const spec_tests = require('json-patch-test-suite/tests.json')

tests = tests.concat(spec_tests)

describe('json-patch-test-suite', () => {

  tests.forEach(test => {
    if (test.disabled)
      return

    describe(test.comment ? test.comment : 'no test description', () => {

      if (test.error) {
        it('throws an error', () => {
          const t = clone(test)
          assert.throws(() => {
            apply(t.doc, t.patch)
          })
        })

        it('reverts the document to its original state', () => {
          const t = clone(test)
          const original = clone(t.doc)
          assert.throws(function() {
            apply(t.doc, t.patch)
          })
          assert.deepEqual(t.doc, original)
        })
      }
      else if (test.expected) {
        it('applies the patch', () => {
          const t = clone(test)
          const r = apply(t.doc, t.patch)
          assert.deepEqual(r.doc, t.expected)
        })

        it('reverts the patch', () => {
          const t = clone(test)
          const original = t.doc
          const r = apply(t.doc, t.patch, {reversible: true})
          assert.deepEqual(revert(r.doc, r.revert), original)
        })
      }
      else {
        it('does not throw an error', () => {
          const t = clone(test)
          assert.doesNotThrow(() => {
            apply(t.doc, t.patch)
          })
        })
      }

      if (test.expected && !test.error) {
        it('validation returns true', () => {
          const t = clone(test)
          assert.strictEqual(valid(t.patch), true)
        })
      }

      if (test.patch && !test.error && JSON.stringify(test.patch).indexOf('spurious') === -1) {
        it('packs and unpacks the patch ok', () => {
          const t = clone(test)
          const packed = pack(test.patch)
          assert.deepEqual(unpack(packed), t.patch)
        })
      }

    })
  })
})
