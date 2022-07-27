const getCleanupHandler = () => {
  const lastObj = getLastMaxObj();
  const maxObjList = getMaxObjList(lastObj);

  const cleanup = () => {
    maxObjList.forEach(maxObj => patcher.remove(maxObj));
  }
  return cleanup;
};

const alignCables = () => post("TODO alignCables");

function getMaxObjList (firstObj) {
  const maxObjList = [];
  let maxObj = firstObj;
  
  while (maxObj.nextobject) {
    maxObj = maxObj.nextobject;
    maxObjList.push(maxObj);
  }

  return maxObjList;
};

function getLastMaxObj () {
  let currentObj = patcher.firstobject;

  while (currentObj.nextobject) {
    currentObj = currentObj.nextobject;
  }

  return currentObj;
}

exports.getCleanupHandler = getCleanupHandler;
exports.alignCables = alignCables;
