"use strict";

const OBJECT = "object";

/**
 * Apply a JSON merge patch onto a document
 * https://tools.ietf.org/html/rfc7396
 * @param  {Object}  doc                       - JSON object document
 * @param  {Object}  patch                     - JSON object patch
 * @param  {Object}  [options]                 - options
 * @param  {Boolean} [options.pollute=false]   - Allow prototype pollution - throw otherwise
 * @param  {Object}  [options.proto=null]      - Prototype to use for object creation
 * @return {Object}                            - JSON object document
 */
module.exports = function apply(doc, patch, options) {
  if (typeof patch !== OBJECT || patch === null || Array.isArray(patch)) {
    return patch;
  }

  options = options || Object.create(null);

  if (typeof doc !== OBJECT || doc === null || Array.isArray(doc)) {
    doc = Object.create(options.proto || null);
  }

  const keys = Object.keys(patch);
  for (const key of keys) {
    if (options.pollute !== true && key === "__proto__") {
      throw new Error("Prototype pollution attempt");
    }
    const v = patch[key];
    if (v === null) {
      delete doc[key];
      continue;
    }
    doc[key] = apply(doc[key], v);
  }

  return doc;
};
