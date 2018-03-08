/* eslint-disable no-console */

const express = require('express');
const path = require('path');
const ControllerManager = require('../manager');
const getOptions = require('./options');
const dev = process.env.NODE_ENV !== 'production';

module.exports = function(callback, cwd = process.cwd()) {
  const router = express.Router();
  getOptions(cwd).then(({ distDir, dir }) => {
    router.stack = [];

    const outputDir = path.resolve(cwd, distDir);
    const controllerDir = path.resolve(cwd, dir);

    const controllerManager = new ControllerManager(router, { outputDir });

    if (dev) {
      const ControllerCompiler = require('../build');
      const compiler = new ControllerCompiler({ controllerDir, outputDir });

      compiler.watch(function(err) {
        if (err === null) {
          controllerManager.reload();
          callback && callback(router, compiler);
        }
      });
    } else {
      controllerManager.load();
      callback && callback(router, null);
    }
  });

  return router;
};
