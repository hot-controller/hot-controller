/* eslint-disable no-console */

const { resolve, relative } = require('path');
const ControllerCompiler = require('../../../lib/build');
const logger = require('../../../lib/logger');
const getOptions = require('../../../lib/middleware/options');

module.exports = function(dir, commandOpts = {}) {
  getOptions(process.cwd()).then(options => {
    const { outputDir = 'dist/controllers' } = options;
    const { output = outputDir } = commandOpts;

    new ControllerCompiler({
      controllerDir: resolve(process.cwd(), dir),
      outputDir: resolve(process.cwd(), output)
    }).build(() => {
      logger('Successfully built ' + relative(process.cwd(), dir));
    });
  });
};
