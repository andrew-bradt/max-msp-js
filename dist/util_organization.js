"use strict";

var _require = require('constants'),
    THIS_SCRIPT = _require.THIS_SCRIPT;

var cleanup = function cleanup() {
  return patcher.remove(THIS_SCRIPT);
};

exports.cleanup = cleanup;