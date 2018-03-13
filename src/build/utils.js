const recursive = require('recursive-readdir');
const path = require('path');
const fs = require('fs');
const ControllerError = require('../error');
const findBabelConfig = require('find-babel-config');
const logger = require('../logger');

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

function babelConfig(dir) {
  const defaultBabelOptions = {
    cacheDirectory: true,
    presets: [],
    plugins: [require.resolve('babel-plugin-transform-decorators-legacy')]
  };

  const { file, config } = findBabelConfig.sync(dir);
  if (file) {
    logger(`Using external .babelrc at location: ${file}`);

    // It's possible to turn off babelrc support via babelrc itself.
    // In that case, we should add our default preset.
    // That's why we need to do this.
    const { options = {} } = config;
    defaultBabelOptions.babelrc = options.babelrc !== false;
  } else {
    defaultBabelOptions.babelrc = false;
  }

  // Add our default preset if the no "babelrc" found.
  if (!defaultBabelOptions.babelrc) {
    defaultBabelOptions.presets.push(require.resolve('./preset'));
  }

  return defaultBabelOptions;
}

module.exports = { getEntriesFromDir, babelConfig };
