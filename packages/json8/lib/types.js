"use strict";

const NUMBER = (exports.NUMBER = "number");
const BOOLEAN = (exports.BOOLEAN = "boolean");
const NULL = (exports.NULL = "null");
const STRING = (exports.STRING = "string");
exports.PRIMITIVES = [NUMBER, BOOLEAN, NULL, STRING];

const ARRAY = (exports.ARRAY = "array");
const DATE = (exports.DATE = "date");
const OBJECT = (exports.OBJECT = "object");
exports.STRUCTURES = [ARRAY, DATE, OBJECT];
