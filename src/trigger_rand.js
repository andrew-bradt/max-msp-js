const {
  anything,
  getArgs
} = require('util_get_args');

const {
  createMaxObject,
  createMaxObjects,
  connect,
  getCleanupHandler,
  positionMaxObjects,
} = require('utils');

const constructPatch = () => {
  const ARGS = getArgs();
  const cleanup = getCleanupHandler();
  const maxObjects = generateObjects();
  
  connectMaxObjects(maxObjects);
  positionMaxObjects(maxObjects, {
    xInit: 100,
    yInit: 0,
    posOffset: 100,
    boxOffset: 80
  });
  cleanup();

  function generateObjects () {
    const maxObjects = {
      inlet: createMaxObject("inlet"),
      random: createMaxObject("random", ARGS.length),
      sel: createMaxObject("sel", ARGS),
      triggers: createMaxObjects('t', ARGS),
      outlet: createMaxObject("outlet")
    };
    return maxObjects;
  }
  
  function connectMaxObjects (maxObjects) {
    const {inlet, random, sel, triggers, outlet} = maxObjects;
  
    connect({obj: inlet, index: 0}, {obj: random, index: 0});
    connect({obj: random, index: 0}, {obj: sel, index: 0});
    connect({obj: sel, index: 0}, {obj: triggers, index: 0});
    connect({obj: triggers, index: 0, useConstantIndex: true}, {obj: outlet, index: 0});
  }
}


