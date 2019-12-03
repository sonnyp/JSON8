"use strict";

function remove(operations = []) {
  const cancellingOperation = operations.find(op => op[1] === "add");
  if (cancellingOperation !== undefined) {
    return cancellingOperation;
  }

  return null;
}

function add(operations = []) {
  const cancellingOperation = operations.find(op => op[1] === "remove");
  if (cancellingOperation !== undefined) {
    return cancellingOperation;
  }

  return null;
}

function compact(jsonPatch = []) {
  const operations = {};

  for (const i in jsonPatch) {
    const { op, path, value } = jsonPatch[i];
    if (operations[path] === undefined) {
      operations[path] = [];
    }

    operations[path].push([i, op, value]);

    if (op === "remove") {
      const cancelling = remove(operations[path]);
      if (cancelling) {
        jsonPatch.splice(cancelling[0], 1);
        jsonPatch.pop();
      }
    }

    if (op === "add") {
      const cancelling = add(operations[path]);
      if (cancelling) {
        jsonPatch.splice(cancelling[0], 1);
        jsonPatch.pop();
      }
    }
  }

  return jsonPatch;
}

module.exports = compact;
