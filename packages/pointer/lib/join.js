'use strict'

var decode = require('./decode');
var encode = require('./encode');

/**
 * Joins pointers
 *
 * @param  {Array}  pointer    - base pointer
 * @param  {Array}  tokens     - array of tokens
 * @param  {String} separator  - separator to use, defaults to /
 * @return {String}            - JSON Pointer string
 */
module.exports = function join(pointer, tokens, separator) {
  if (typeof pointer === 'string') pointer = decode(pointer, separator);
  if (typeof tokens === 'string') tokens = [tokens];
  return encode(pointer.concat(tokens), separator);
}
