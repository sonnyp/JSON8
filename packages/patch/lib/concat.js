'use strict'

/**
 * concat (or merge) multiple patches into one
 * @returns {Array}
 */
module.exports = function concat(/* patch0, patch1, ... */) {
  return [].concat.apply([], arguments)
}
