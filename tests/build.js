const { resolve } = require('path');
const ControllerCompiler = require('../lib/build');
const logger = require('../lib/logger');

const PATHS = ['__tests__/simple'];

(function() {
  logger('building for tests');

  PATHS.forEach(path => {
    let resolvedPath = resolve(__dirname, path);
    new ControllerCompiler({
      controllerDir: resolve(resolvedPath, 'controllers'),
      outputDir: resolve(resolvedPath, 'dist/controllers')
    }).build(() => {
      logger('successfully built ' + path);
    });
  });
})();
