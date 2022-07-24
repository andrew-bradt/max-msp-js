const { THIS_SCRIPT } = require('constants');

const cleanup = () => patcher.remove(THIS_SCRIPT);
const alignCables = () => post("TODO alignCables");

exports.cleanup = cleanup;
exports.alignCables = alignCables;
