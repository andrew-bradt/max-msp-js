"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var connect = function connect(outObj, inObj) {
  var handleConnection = [function () {
    var _patcher;

    var args = prepareOneToOneArgs(outObj, inObj);
    return (_patcher = patcher).connect.apply(_patcher, _toConsumableArray(args));
  }, function () {
    var args = prepareManyToOneArgs(outObj, inObj);
    return connectManyToOne(args);
  }, function () {
    var args = prepareOneToManyArgs(outObj, inObj);
    return connectOneToMany(args);
  }, function () {
    connectManyToMany(outObj, inObj);
  }];
  var outObjResult = Array.isArray(outObj.obj);
  var inObjResult = Array.isArray(inObj.obj) * 2;
  var handlerIndex = outObjResult + inObjResult;
  return handleConnection[handlerIndex]();
};

var prepareOneToManyArgs = function prepareOneToManyArgs(outObj, inObj) {
  return {
    one: outObj.obj,
    many: inObj.obj,
    useConstantIndex: inObj.useConstantIndex,
    outletIndex: outObj.index,
    inletIndex: inObj.index
  };
};

var prepareManyToOneArgs = function prepareManyToOneArgs(outObj, inObj) {
  return {
    one: inObj.obj,
    many: outObj.obj,
    useConstantIndex: outObj.useConstantIndex,
    outletIndex: outObj.index,
    inletIndex: inObj.index
  };
};

var prepareOneToOneArgs = function prepareOneToOneArgs(outObj, inObj) {
  return [outObj.obj, outObj.index, inObj.obj, inObj.index];
};

var connectManyToMany = function connectManyToMany(args) {
  return post('TODO');
};

var connectOneToMany = function connectOneToMany(args) {
  var one = args.one,
      many = args.many,
      useConstantIndex = args.useConstantIndex,
      inletIndex = args.inletIndex,
      outletIndex = args.outletIndex;

  if (useConstantIndex) {
    many.forEach(function (obj) {
      return patcher.connect(one, outletIndex, obj, inletIndex);
    });

    for (var i = 0; i < many.length; i++) {
      var currentObj = many[i];
      patcher.connect(one, outletIndex, currentObj, inletIndex);
      post(i);
    }
  } else if (!useConstantIndex) {
    many.forEach(function (obj, i) {
      return patcher.connect(one, i + outletIndex, obj, inletIndex);
    });
  }
};

var connectManyToOne = function connectManyToOne(args) {
  var one = args.one,
      many = args.many,
      useConstantIndex = args.useConstantIndex,
      inletIndex = args.inletIndex,
      outletIndex = args.outletIndex;

  if (useConstantIndex) {
    many.forEach(function (obj) {
      return patcher.connect(obj, outletIndex, one, inletIndex);
    });
  } else if (!useConstantIndex) {
    many.forEach(function (obj, i) {
      return patcher.connect(obj, outletIndex, one, i + inletIndex);
    });
  }
};

exports.connect = connect;