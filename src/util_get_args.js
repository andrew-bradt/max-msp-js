var ARGS_ARRAY = [];

function anything () {
  ARGS_ARRAY[0] = arrayfromargs(messagename, arguments);
}

function getArgs () {
  return ARGS_ARRAY[0];
}

exports.anything = anything;
exports.getArgs = getArgs;