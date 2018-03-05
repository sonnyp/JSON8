"use strict";

var join = require("./join");

function each(obj, iterator) {
  if (global.Set && obj instanceof Set) {
    var c = 0;
    obj.forEach(function(value) {
      iterator(value, (c += 1));
    });
  } else if (Array.isArray(obj) || (global.Map && obj instanceof Map)) {
    obj.forEach(iterator);
  } else if (typeof obj === "object" && obj !== null) {
    Object.keys(obj).forEach(function(key) {
      iterator(obj[key], key);
    });
  } else {
    throw new TypeError(obj + "is not a structure");
  }
}

function _walk(value, key, parent, fn) {
  fn(value, key, parent);
  if (value === null || typeof value !== "object") return;

  each(value, function(v, k) {
    _walk(v, k, value, fn);
  });
}

module.exports = function walk(json, fn) {
  var dic = Object.create(null);

  function get(obj) {
    for (var p in dic) {
      if (dic[p] === obj) return p;
    }
  }

  function set(obj, key, parent) {
    var path = join(parent ? get(parent) : parent, key);
    dic[path] = obj;
  }

  _walk(json, undefined, undefined, function(v, k, p) {
    if (v !== null && typeof v === "object") {
      if (p === undefined || k === undefined) set(v, [], "");
      else set(v, k.toString(), p);
    }

    if (k === undefined || p === undefined) {
      fn(v, "");
    } else {
      var parent = get(p);
      fn(v, join(parent, k.toString()), p, parent);
    }
  });
};
