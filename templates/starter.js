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
    };
    
    return maxObjects;
  }
  
  function connectMaxObjects (maxObjects) {
    const {} = maxObjects;
  }
};
