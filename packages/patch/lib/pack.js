'use strict'

var ops = Object.create(null)
ops.add = 0
ops.remove = 1
ops.replace = 2
ops.move = 3
ops.copy = 4
ops.test = 5

module.exports = function pack(patch) {
  var packed = []

  for (var i = 0, l = patch.length; i < l; i++) {
    var p = patch[i]
    var a = ops[p.op]
    var op = [a, p.path]
    // add, replace, test
    if (a === 0 || a === 2 || a === 5)
      op.push(p.value)
    // move copy
    else if (a !== 1) {
      op.push(p.from)
    }

    packed.push(op)
  }

  return packed
}
