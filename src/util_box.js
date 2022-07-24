const positionMaxObjects = (maxObjects, options) => {
  const {xInit, yInit, posOffset, boxOffset} = options;
  let x = xInit;
  let y = yInit;

  const maxObjKeys = Object.keys(maxObjects);

  maxObjKeys.forEach(key => {
    const singularOrArrayOfObjects = maxObjects[key];
    y += posOffset;

    Array.isArray(singularOrArrayOfObjects)
      ? handleArrayOfObjs(singularOrArrayOfObjects)
      : handleSingularObj(singularOrArrayOfObjects);
  });

  function handleSingularObj (maxObj) {
    x = xInit;
    maxObj.rect = [x, y, x + boxOffset, y + boxOffset];
  };

  function handleArrayOfObjs (singularOrArrayOfObjects) {
    x -= posOffset;

    singularOrArrayOfObjects.forEach(maxObj => {
      x += posOffset;
      maxObj.rect = [x, y, x + boxOffset, y + boxOffset];
    });
  };
};


exports.positionMaxObjects = positionMaxObjects;