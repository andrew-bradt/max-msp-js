// TODO: Get Variable Names from Parent Patch
var argsWithoutName = jsarguments.slice(1);
var numArgs = argsWithoutName.length;
var posOffset = 100;
var boxOffset = 80;
var xInit = 100;
var yInit = 0;

function loadbang () {
  var scriptObject = patcher.firstobject;
  var maxObjects = createMaxObjects();

  connectMaxObjects(maxObjects);
  positionMaxObjects(maxObjects);
  cleanup(scriptObject);
}

function cleanup (scriptObject) {
  // TODO: Align patchcables in entire patch
  patcher.remove(scriptObject);
}

function positionMaxObjects (maxObjects) {
  var x = xInit;
  var y = yInit;

  var maxObjectKeys = Object.keys(maxObjects);
  
  maxObjectKeys.forEach(function (key) {
    var singularOrArrayOfObjs = maxObjects[key];
    y += posOffset;

    if (Array.isArray(singularOrArrayOfObjs)) {
      x -= posOffset;
      singularOrArrayOfObjs.forEach(function (maxObject) {
        x += posOffset;
        maxObject.rect = [x, y, x + boxOffset, y + boxOffset];
      });
    } else {
      x = xInit;
      singularOrArrayOfObjs.rect = [x, y, x + boxOffset, y + boxOffset];
    }
  });
}

function connectMaxObjects (maxObjects) {
  var {inlet, random, sel, triggers, outlet} = maxObjects;

  patcher.connect(inlet, 0, random, 0);
  patcher.connect(random, 0, sel, 0);
  
  connectOneToMany({
    one: sel,
    many: triggers,
    options: {
      outlet : {
        useConstantIndex: false,
        indexOrOffset: 0
      },
      inlet : {
        index: 0
      }
    }
  });

  connectManyToOne({
    one: outlet,
    many: triggers,
    options: {
      outlet : {
        useConstantIndex: true,
        indexOrOffset: 0
      },
      inlet : {
        index: 0
      }
    }
  });
}

function createMaxObjects () {
  var maxObjects = {
    inlet: createMaxObject("inlet"),
    random: createMaxObject("random", numArgs - 1),
    sel: createMaxObject("sel", argsWithoutName),
    triggers: argsWithoutName.map(function (arg) {
      return createMaxObject('t', arg);
    }),
    outlet: createMaxObject("outlet")
  };

  function createMaxObject (type, arguments) {
    return (arguments || arguments === 0) 
      ? patcher.newdefault(0, 0, type, arguments) 
      : patcher.newdefault(0, 0, type);
  }

  return maxObjects;
}

function createTriggers() {
  return argsWithoutName.map(function (arg) {
    return patcher.newdefault(0, 0, "t", arg);
  });
}

function connectOneToMany (arguments) {
  var {one, many, options} = arguments;
  var {inlet, outlet} = options;

  if (outlet.useConstantIndex) {
    many.forEach(function (obj) {
      patcher.connect(one, outlet.indexOrOffset, obj, inlet.index);
    });
  } else if (!outlet.useConstantIndex) {
    many.forEach(function (obj, i) {
      patcher.connect(one, i + outlet.indexOrOffset, obj, inlet.index);
    });
  }
}

function connectManyToOne (arguments) {
  var {one, many, options} = arguments;
  var {inlet, outlet} = options;

  if (options.outlet.useConstantIndex) {
    many.forEach(function (obj) {
      patcher.connect(obj, outlet.indexOrOffset, one, inlet.index);
    });
  } else if (!options.outlet.useConstantIndex) {
    many.forEach(function (obj, i) {
      patcher.connect(obj, i + outlet.indexOrOffset, one, inlet.index);
    });
  }
}