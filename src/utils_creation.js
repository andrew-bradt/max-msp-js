const createMaxObjects = (type, args) => {
  return args.map(arg => createMaxObject(type, arg));
}

const createMaxObject = (type, args) => {
  return (args || args === 0)
    ? patcher.newdefault(0, 0, type, args)
    : patcher.newdefault(0, 0, type);
};

exports.createMaxObject = createMaxObject;
exports.createMaxObjects = createMaxObjects;
