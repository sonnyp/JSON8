'use strict'

/* eslint-disable no-console */

var benchmark = require('benchmark')
var ooPatch = require('./index')
var jsonpatch = require('jsonpatch') // https://github.com/dharmafly/jsonpatch.js
var json_patch = require('json-patch') // https://github.com/bruth/jsonpatch-js
var jiff = require('jiff') // https://github.com/cujojs/jiff
var fastjsonpatch = require('fast-json-patch') // https://github.com/Starcounter-Jack/JSON-Patch

var doc = {
  "foo": [1, 2, 3, 4],
  "baz": [{
    "qux": "hello",
  }],
}

var patch = [{
  "op": "replace",
  "path": "/baz/0/qux",
  "value": "world",
}]

benchmark.Suite('apply patch') // eslint-disable-line
.add('github: json8/patch - npm: json8-patch', function() {
  ooPatch.apply(doc, patch)
})
.add('github: dharmafly/jsonpatch.js / npm: jsonpatch', function() {
  jsonpatch.apply_patch(doc, patch)
})
.add('github: bruth/jsonpatch-js / npm: json_patch', function() {
  json_patch.apply(doc, patch)
})
.add('github: cujojs/jiff / npm: jiff', function() {
  jiff.patch(patch, doc)
})
.add('github: Starcounter-Jack/JSON-Patch / npm: fast-json-patch', function() {
  fastjsonpatch.apply(doc, patch)
})
.on('cycle', function(event) {
  console.log(event.target.toString())
})
.on('complete', function() {
  console.log('Fastest is ' + this.filter('fastest').map('name'))
})
.run()
