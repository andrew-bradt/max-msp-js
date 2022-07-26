const getCleanupHandler = () => {
  const maxObjList = getMaxObjList();
  const cleanup = () => {
    maxObjList.forEach(maxObj => patcher.remove(maxObj));
  }

  return cleanup;
};

const alignCables = () => post("TODO alignCables");

function getMaxObjList () {
  const maxObjList = [];
  let maxObj = patcher.firstobject;
  
  while (maxObj) {
    maxObjList.push(maxObj);
    maxObj = maxObj.nextobject;
  }

  return maxObjList;
};

exports.getCleanupHandler = getCleanupHandler;
exports.alignCables = alignCables;
