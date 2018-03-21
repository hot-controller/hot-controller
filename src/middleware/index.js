const express = require('express');
const path = require('path');
const ControllerManager = require('../manager');
const getOptions = require('./options');
const PluginManager = require('../plugin');
const envIsDev =
  process.env.NODE_ENV !== 'production' && process.env.NODE_ENV !== 'test';
require('@babel/register')({
  presets: [
    [
      require.resolve('@babel/preset-env'),
      {
        targets: {
          node: '6'
        }
      }
    ]
  ],
  plugins: [
    require.resolve('babel-plugin-transform-class-properties'),
    require.resolve('@babel/plugin-proposal-decorators')
  ]
});

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
    const controllerManager = new ControllerManager(router, plugins, {
      controllerDir
    });

    if (dev) {
      controllerManager.watch(() => {
        callback && callback(router, null, options);
      });
    } else {
      controllerManager.load();
      callback && callback(router, null, options);
    }
  })();

  return router;
};
