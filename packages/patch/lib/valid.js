'use strict'

module.exports = function valid(patch) {
  if (!Array.isArray(patch))
    return false

  for (var i = 0, l = patch.length; i < l; i++) {
    var op = patch[i]

    if (typeof op !== 'object' || op === null || Array.isArray(op))
      return false

    if (typeof op.path !== 'string')
      return false

    var operation = op.op
    if (typeof op.op !== 'string')
      return false

    switch (operation) {
      case 'add':
      case 'replace':
      case 'test':
        if (op.value === undefined)
          return false
        break
      case 'move':
      case 'copy':
        if (typeof op.from !== 'string')
          return false
        break
      case 'remove':
        break
      default:
        return false
    }
  }

  return true
}
