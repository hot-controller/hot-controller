const recursive = require('recursive-readdir');
const path = require('path');
const fs = require('fs');
const ControllerError = require('../error');

function getEntriesFromDir(dir) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(dir)) {
      const friendlyPath = path.relative(process.cwd(), dir);
      reject(new ControllerError(`/${friendlyPath} does not exist`));
      return;
    }

    let entry = {};

    recursive(dir, function(err, files) {
      files.map(file => file.substring(dir.length + 1)).forEach(file => {
        const filePath = path.resolve(dir, file);
        entry[
          file
            .replace(/\.[^/.]+$/, '')
            .replace('\\', '/')
            .replace('/', '.')
        ] = filePath;
      });

      resolve(entry);
    });
  });
}

module.exports = { getEntriesFromDir };
