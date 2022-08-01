const {
  anything,
  getArgs
} = require('util_get_args');

const {
  createMaxObject,
  createMaxObjects,
  connect,
  cleanup,
  positionMaxObjects,
} = require('utils');

const constructPatch = () => {
  const ARGS = getArgs();
  cleanup();
  const maxObjects = generateObjects();

  connectMaxObjects(maxObjects);
  positionMaxObjects(maxObjects, {
    xInit: 100,
    yInit: 0,
    posOffset: 100,
    boxOffset: 80
  });
  
  function generateObjects () {
    const maxObjects = {
      inlet: createMaxObject("inlet"),
      coll: createMaxObject("coll", ARGS),
      sel: createMaxObject("sel", ARGS),
      outlet: createMaxObjects("outlet", ARGS)
    };
    
    return maxObjects;
  }
  
  function connectMaxObjects (maxObjects) {
    const {inlet, coll, sel, outlet} = maxObjects;

    connect({obj: inlet, index: 0}, {obj: coll, index: 0});
    connect({obj: coll, index: 0}, {obj: sel, index: 0});
    connect({obj: sel, index: 0}, {obj: outlet, index: 0});
  }
};
