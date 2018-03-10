const express = require('express');
const path = require('path');
const ControllerManager = require('../manager');
const getOptions = require('./options');
const PluginManager = require('../plugin');
const dev =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';

module.exports = function(
  middlewareOptions = {},
  callback,
  cwd = process.cwd()
) {
  const router = express.Router();
  const plugins = new PluginManager(router);

  (async () => {
    const options = await getOptions(cwd, middlewareOptions);

    await plugins.loadPluginsFromOptions(options);
    plugins.emitBeforeControllers();

    const outputDir = path.resolve(cwd, options.distDir);
    const controllerDir = path.resolve(cwd, options.dir);
    const controllerManager = new ControllerManager(router, { outputDir });

    if (dev) {
      const ControllerCompiler = require('../build');
      const compiler = new ControllerCompiler({ controllerDir, outputDir });

      compiler.watch(function(err) {
        if (err === null) {
          // clear the stack
          router.stack = [];
          plugins.emitBeforeControllers();
          controllerManager.reload();
          callback && callback(router, compiler, options);
        }
      });
    } else {
      controllerManager.load();
      callback && callback(router, null, options);
    }
  })();

  return router;
};
