const recursive = require('recursive-readdir');
const path = require('path');

function getEntriesFromDir(dir) {
  return new Promise(resolve => {
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
