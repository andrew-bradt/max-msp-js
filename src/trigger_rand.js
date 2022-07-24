const {
  ARGS
} = require('constants');

const {
  createMaxObject,
  createMaxObjects,
  connect,
  cleanup
} = require('utils');
// var posOffset = 100;
// var boxOffset = 80;
// var xInit = 100;
// var yInit = 0;

function bang () {
  const maxObjects = generateObjects();
  connectMaxObjects(maxObjects);
  // positionMaxObjects(maxObjects);
  // cleanup();
}

// function positionMaxObjects (maxObjects) {
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

const generateObjects = () => {
  const maxObjects = {
    inlet: createMaxObject("inlet"),
    random: createMaxObject("random", ARGS.length - 1),
    sel: createMaxObject("sel", ARGS),
    triggers: createMaxObjects('t', ARGS),
    outlet: createMaxObject("outlet")
  };
  return maxObjects;
}

const connectMaxObjects = (maxObjects) => {
  const {inlet, random, sel, triggers, outlet} = maxObjects;

  connect({obj: inlet, index: 0}, {obj: random, index: 0});
  connect({obj: random, index: 0}, {obj: sel, index: 0});
  connect({obj: sel, index: 0}, {obj: triggers, index: 0});
  connect({obj: triggers, index: 0, useConstantIndex: true}, {obj: outlet, index: 0});
}





