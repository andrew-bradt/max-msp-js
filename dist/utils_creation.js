"use strict";

var createMaxObjects = function createMaxObjects(type, args) {
  return args.map(function (arg) {
    return createMaxObject(type, arg);
  });
};

var createMaxObject = function createMaxObject(type, args) {
  return args || args === 0 ? patcher.newdefault(0, 0, type, args) : patcher.newdefault(0, 0, type);
};

exports.createMaxObject = createMaxObject;
exports.createMaxObjects = createMaxObjects;