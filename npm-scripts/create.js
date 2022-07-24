const path = require('path');
const fs = require('fs/promises');

const TEMPLATE_DIR = path.resolve(__dirname, '..', 'templates');
const SRC_PATH = path.resolve(__dirname, '..', 'src');

const templatePath = path.resolve(TEMPLATE_DIR, process.argv[2]);
const scriptPath = path.resolve(SRC_PATH, process.argv[3]);

fs.copyFile(templatePath, scriptPath)
  .then(() => console.log('success'))
  .catch((err) => console.error(err.message));
