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
  const [rate, ...ARGS] = getArgs();
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
      metro: createMaxObject("metro", rate, {
        attributes: {
          active: 1
        }
      }),
      counter: createMaxObject("counter", [ARGS.length, 1]),
      add: createMaxObject("+", -1),
      coll: createMaxObject("coll", ARGS),
      sel: createMaxObject("sel", ARGS),
      outlet: createMaxObjects("outlet", ARGS)
    };
    
    return maxObjects;
  }
  
  function connectMaxObjects (maxObjects) {
    const {metro, counter, add, coll, sel, outlet} = maxObjects;
    
    connect({obj: metro, index: 0}, {obj: coll, index: 0});
    connect({obj: counter, index: 0}, {obj: add, index: 0});
    connect({obj: coll, index: 0}, {obj: sel, index: 0});
    connect({obj: sel, index: 0}, {obj: outlet, index: 0});
  }
};
