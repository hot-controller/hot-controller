const { resolve } = require('path');
const ControllerCompiler = require('../lib/build');
const PluginManager = require('../lib/plugin');
const logger = require('../lib/logger');

const PATHS = ['__tests__/simple', '__tests__/plugins'];

(function() {
  logger('building for tests');

  PATHS.forEach(path => {
    let resolvedPath = resolve(__dirname, path);
    new ControllerCompiler({
      plugins: new PluginManager(),
      controllerDir: resolve(resolvedPath, 'controllers'),
      outputDir: resolve(resolvedPath, 'dist/controllers')
    }).build(() => {
      logger('successfully built ' + path);
    });
  });
})();
