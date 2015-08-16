'use strict'

var ops = Object.create(null)
ops[0] = 'add'
ops[1] = 'remove'
ops[2] = 'replace'
ops[3] = 'move'
ops[4] = 'copy'
ops[5] = 'test'

module.exports = function unpack(packed) {
  var unpacked = []

  for (var i = 0, l = packed.length; i < l; i++) {
    var p = packed[i]
    var ap = p[0]
    var a = ops[ap]
    var op = {op: a, path: p[1]}

    // add, replace, test
    if (ap === 0 || ap === 2 || ap === 5)
      op.value = p[2]
    // move, copy
    else if (ap !== 1)
      op.from = p[2]

    unpacked.push(op)
  }

  return unpacked
}
