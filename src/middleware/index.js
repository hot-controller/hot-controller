const express = require('express');
const path = require('path');
const ControllerManager = require('../manager');
const getOptions = require('./options');
const PluginManager = require('../plugin');
const envIsDev =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';
const { reformatRouteName } = require('../utils');

module.exports = function(
  middlewareOptions = {},
  callback,
  cwd = process.cwd()
) {
  const router = express.Router();
  const plugins = new PluginManager(router);

  const { dev = envIsDev } = middlewareOptions;

  (async () => {
    const options = await getOptions(cwd, middlewareOptions);

    await plugins.loadPluginsFromOptions(options);
    plugins.emitBeforeControllers();

    const controllerDir = path.resolve(cwd, options.dir);
    let controllerRouter = router;
    if (options.path !== null) {
      controllerRouter = express.Router();
      router.use(reformatRouteName(options.path), controllerRouter);
    }

    require('@babel/register')({
      only: [new RegExp(controllerDir)],
      presets: [
        [
          require.resolve('@babel/preset-env'),
          {
            targets: {
              node: process.version
            }
          }
        ]
      ],
      plugins: [
        [
          require.resolve('@babel/plugin-proposal-decorators'),
          {
            legacy: true
          }
        ]
      ]
    });

    const controllerManager = new ControllerManager(controllerRouter, plugins, {
      controllerDir
    });

    if (dev) {
      controllerManager.watch().then(watcher => {
        callback && callback(router, watcher, options);
      });
    } else {
      controllerManager.load().then(() => {
        callback && callback(router, null, options);
      });
    }
  })();

  return router;
};
