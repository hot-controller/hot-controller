/* eslint-disable no-console */

const express = require('express');
const ControllerManager = require('./manager');

module.exports = function({
  dev = process.env.NODE_ENV !== 'production',
  controllerDir,
  outputDir
}) {
  const router = express.Router();
  router.stack = [];
  const controllerManager = new ControllerManager(router, { outputDir });

  if (dev) {
    const ControllerCompiler = require('./build');
    const compiler = new ControllerCompiler({ controllerDir, outputDir });

    compiler.watch(function(err) {
      if (err === null) {
        controllerManager.reload();
        console.info('🔥  hot reloaded');
      }
    });
  } else {
    controllerManager.load();
  }

  return router;
};
