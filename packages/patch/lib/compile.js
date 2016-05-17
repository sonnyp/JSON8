'use strict'

var decode = require('json8-pointer/lib/decode')

var patch = [
  {"op": "add", "path": "/a/b/c", "value": ["foo", "bar"]},
  {"op": "remove", "path": "/a/b/c"},
  {"op": "replace", "path": "/a/b/c", "value": 42},
  {"op": "move", "from": "/a/b/c", "path": "/a/b/d"},
  {"op": "copy", "from": "/a/b/c", "path": "/a/b/e"},
  {"op": "test", "path": "/a/b/c", "value": "foo"}
]


var doc = {a: {b: "foo"}}

function pathToStatement (path) {
  var tokens = decode(path)
  var statement = tokens.shift()
  tokens.forEach(function (token) {
    statement += '["' + token + '"]'
  })
  return statement
}

// "compile" lol https://github.com/bruth/jsonpatch-js/blob/master/jsonpatch.coffee#L377

function compile (patch) {
  var code = ''
  patch.forEach(function(op) {
    var o = ''
    switch (op.op) {
      case 'remove':
        o += 'delete ' + pathToStatement(op.path)
        break
      case 'add':
        o += pathToStatement(op.path) + ' = ' + JSON.stringify(op.value)
        break
      case 'replace':
        o += pathToStatement(op.path) + ' = ' + JSON.stringify(op.value)
        break
      case 'move':
        var from = pathToStatement(op.from)
        o += pathToStatement(op.path) + ' = ' + from + ';\n'
        o += 'delete ' + from
        break
      case 'copy':
        o += pathToStatement(op.path) + ' = ' + from
        break
      case 'test':
        o += 'if (!oo.equal(' + pathToStatement(op.path) + ', ' + JSON.stringify(op.value) + ') throw new Error()'
        break
    }
    code += o + ';\n'
  })
  return code
}


console.log(compile(patch))
