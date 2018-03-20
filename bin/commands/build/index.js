/* eslint-disable no-console */

const { resolve, relative } = require('path');
const ControllerCompiler = require('../../../lib/build');
const PluginManager = require('../../../lib/plugin');
const logger = require('../../../lib/logger');
const getOptions = require('../../../lib/middleware/options');

module.exports = function(commandOpts = {}) {
  getOptions(process.cwd()).then(options => {
    const { distDir = 'dist/controllers', dir = 'controllers' } = options;
    const { output = distDir, input = dir } = commandOpts;

    const plugins = new PluginManager(null);

    plugins.loadPluginsFromOptions(options).then(() => {
      new ControllerCompiler({
        controllerDir: resolve(process.cwd(), input),
        distDir: resolve(process.cwd(), output),
        plugins
      }).build(() => {
        logger('Successfully built ' + relative(process.cwd(), input));
      });
    });
  });
};
