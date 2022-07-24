const { THIS_SCRIPT } = require('constants');

const cleanup = () => patcher.remove(THIS_SCRIPT);

exports.cleanup = cleanup;
