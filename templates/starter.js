const {
  ARGS
} = require('constants');

const {
  createMaxObject,
  createMaxObjects,
  connect,
  cleanup,
  alignCables,
  positionMaxObjects
} = require('utils');

const loadbang = () => {
  const maxObjects = generateObjects();
  connectMaxObjects(maxObjects);
  positionMaxObjects(maxObjects, {
    xInit: 100,
    yInit: 0,
    posOffset: 100,
    boxOffset: 80
  });
  cleanup();
};

const generateObjects = () => {
  const maxObjects = {
  };

  return maxObjects;
}

const connectMaxObjects = (maxObjects) => {
}