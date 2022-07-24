const connect = (outObj, inObj) => {
  const handleConnection = [
    () => {
      const args = prepareOneToOneArgs(outObj, inObj);
      return patcher.connect(...args);
    },
    () => {
      const args = prepareManyToOneArgs(outObj, inObj);
      return connectManyToOne(args);
    },
    () => {
      const args = prepareOneToManyArgs(outObj, inObj);
      return connectOneToMany(args);
    },
    () => { 
      connectManyToMany(outObj, inObj);
    }
  ];

  const outObjResult = Array.isArray(outObj.obj);
  const inObjResult = Array.isArray(inObj.obj) * 2;
  const handlerIndex = outObjResult + inObjResult;
  
  return handleConnection[handlerIndex]();
};

const prepareOneToManyArgs = (outObj, inObj) => ({
  one: outObj.obj,
  many: inObj.obj,
  useConstantIndex: inObj.useConstantIndex,
  outletIndex: outObj.index,
  inletIndex: inObj.index
});

const prepareManyToOneArgs = (outObj, inObj) => ({
  one: inObj.obj,
  many: outObj.obj,
  useConstantIndex: outObj.useConstantIndex,
  outletIndex: outObj.index,
  inletIndex: inObj.index
});

const prepareOneToOneArgs = (outObj, inObj) => ([
  outObj.obj,
  outObj.index,
  inObj.obj,
  inObj.index
]);

const connectManyToMany = (args) => post('TODO');
const connectOneToMany = (args) => {
  const {one, many, useConstantIndex, inletIndex, outletIndex} = args;
  if (useConstantIndex) {
    many.forEach(obj => patcher.connect(
      one, 
      outletIndex,
      obj, 
      inletIndex
    ));
    for (let i = 0; i < many.length; i++) {
      const currentObj = many[i];
      patcher.connect(one, outletIndex, currentObj, inletIndex);
      post(i);
    }
  } else if (!useConstantIndex) {
    many.forEach((obj, i) => patcher.connect(
      one, 
      i + outletIndex,
      obj, 
      inletIndex
    ));
  }
};

const connectManyToOne = (args) => {
  const {one, many, useConstantIndex, inletIndex, outletIndex} = args;
  if (useConstantIndex) {
    many.forEach(obj => patcher.connect(
      obj, 
      outletIndex, 
      one, 
      inletIndex
    ));
  } else if (!useConstantIndex) {
    many.forEach((obj, i) => patcher.connect(
      obj, 
      outletIndex,
      one, 
      i + inletIndex
    ));
  }
};

exports.connect = connect;