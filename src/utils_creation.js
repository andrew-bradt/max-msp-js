function createMaxObjects (type, args, options) {
  const processedArgs = transformArgs(args, options);
  return processedArgs.map(arg => renderMaxObj(type, arg));
}

function createMaxObject (type, args, options) {
  const processedArgs = transformArgs(args, options);
  const maxObj = renderMaxObj(type, processedArgs);
  dispatchTypeSpecificRoutines(type, maxObj, processedArgs);

  return maxObj;
};

function transformArgs (args, options) {
  return (Array.isArray(args) && options && options.transform) 
    ? dispatchArgTransformation(args, options.transform)
    : args;
}

function dispatchArgTransformation (args, transform) {
  const {operation} = transform;

  const dispatch = {
    none,
    useIndex
  };

  return dispatch[operation]();

  // Dispatch Methods
  function none () {
    return args;
  }

  function useIndex () {
    const offset = transform.offset || 0;
    return args.map((el, i) => i + offset);
  }
}

function renderMaxObj (type, args) {
  return shouldNotRenderArgs(type, args)
    ? patcher.newdefault(0, 0, type) 
    : patcher.newdefault(0, 0, type, args);
}

function dispatchTypeSpecificRoutines (objectType, maxObj, args) {
  const dispatchers = {
    coll: () => setCollValues(maxObj, args)
  };

  const routineToDispatch = dispatchers[objectType];
  return routineToDispatch && routineToDispatch();
}

function setCollValues (collObj, args) {
  args.forEach((arg, i) => collObj.message("insert", [i, arg]));
}

function shouldNotRenderArgs (type, args) {
  const validArgs = args || args === 0;
  
  const invalidTypes = {
    coll: true
  };

  return !validArgs || invalidTypes[type];
}

exports.createMaxObject = createMaxObject;
exports.createMaxObjects = createMaxObjects;
