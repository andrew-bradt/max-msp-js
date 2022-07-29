function createMaxObjects (type, args, options) {
  const processedArgs = transformArgs(args, options);
  return processedArgs.map(arg => renderMaxObj(type, arg));
}

function createMaxObject (type, args, options) {
  const processedArgs = transformArgs(args, options);
  return renderMaxObj(type, processedArgs);
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

function renderMaxObj (type, arg) {
  return (arg || arg === 0) 
    ? patcher.newdefault(0, 0, type, arg) 
    : patcher.newdefault(0, 0, type);
}

exports.createMaxObject = createMaxObject;
exports.createMaxObjects = createMaxObjects;
