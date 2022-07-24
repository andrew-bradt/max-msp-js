const {
  ARGS
} = require('constants');

const {
  createMaxObject,
  createMaxObjects,
  connect,
  cleanup,
  positionMaxObjects
} = require('utils');

function bang () {
  const maxObjects = generateObjects();
  connectMaxObjects(maxObjects);
  positionMaxObjects(maxObjects, {
    xInit: 100,
    yInit: 0,
    posOffset: 100,
    boxOffset: 80
  });
  // cleanup();
}

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





