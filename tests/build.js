const { resolve } = require('path');
const ControllerCompiler = require('../src/build');
const PATHS = ['__tests__/simple'];
const logger = require('../src/logger');

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
