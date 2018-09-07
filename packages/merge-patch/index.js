"use strict";

const apply = require("./lib/apply");
module.exports.apply = apply;
module.exports.patch = apply;
module.exports.diff = require("./lib/diff");
module.exports.MEDIATYPE = "application/merge-patch+json";
