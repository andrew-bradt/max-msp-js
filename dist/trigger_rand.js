"use strict";

// TODO: Get Variable Names from Parent Patch
var _require = require('constants'),
    ARGS = _require.ARGS; // const {
//   createMaxObject,
//   createMaxObjects,
// } = require('utils_creation');
// const {connect} = require('util_connect');
// const {cleanup} = require('util_organization');


var _require2 = require('utils'),
    createMaxObject = _require2.createMaxObject,
    createMaxObjects = _require2.createMaxObjects,
    connect = _require2.connect,
    cleanup = _require2.cleanup; // var posOffset = 100;
// var boxOffset = 80;
// var xInit = 100;
// var yInit = 0;


function bang() {
  var maxObjects = generateObjects();
  connectMaxObjects(maxObjects); // positionMaxObjects(maxObjects);
  // cleanup();
} // function positionMaxObjects (maxObjects) {
//   var x = xInit;
//   var y = yInit;
//   var maxObjectKeys = Object.keys(maxObjects);
//   maxObjectKeys.forEach(function (key) {
//     var singularOrArrayOfObjs = maxObjects[key];
//     y += posOffset;
//     if (Array.isArray(singularOrArrayOfObjs)) {
//       x -= posOffset;
//       singularOrArrayOfObjs.forEach(function (maxObject) {
//         x += posOffset;
//         maxObject.rect = [x, y, x + boxOffset, y + boxOffset];
//       });
//     } else {
//       x = xInit;
//       singularOrArrayOfObjs.rect = [x, y, x + boxOffset, y + boxOffset];
//     }
//   });
// }


var generateObjects = function generateObjects() {
  var maxObjects = {
    inlet: createMaxObject("inlet"),
    random: createMaxObject("random", ARGS.length - 1),
    sel: createMaxObject("sel", ARGS),
    triggers: createMaxObjects('t', ARGS),
    outlet: createMaxObject("outlet")
  };
  return maxObjects;
};

var connectMaxObjects = function connectMaxObjects(maxObjects) {
  var inlet = maxObjects.inlet,
      random = maxObjects.random,
      sel = maxObjects.sel,
      triggers = maxObjects.triggers,
      outlet = maxObjects.outlet;
  connect({
    obj: inlet,
    index: 0
  }, {
    obj: random,
    index: 0
  });
  connect({
    obj: random,
    index: 0
  }, {
    obj: sel,
    index: 0
  });
  connect({
    obj: sel,
    index: 0
  }, {
    obj: triggers,
    index: 0
  });
  connect({
    obj: triggers,
    index: 0,
    useConstantIndex: true
  }, {
    obj: outlet,
    index: 0
  });
};