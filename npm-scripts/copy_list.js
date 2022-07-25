const path = require('path');
const fs = require('fs/promises');

const SRC_PATH = path.resolve(__dirname, '..', 'src', 'util_get_args.js');
const DIST_PATH = path.resolve(__dirname, '..', 'dist', "util_get_args.js");

fs.copyFile(SRC_PATH, DIST_PATH)
  .then(() => console.log('success'))
  .catch((err) => console.error(err.message));
