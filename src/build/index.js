/* eslint-disable no-console */

const webpack = require('webpack');
const config = require('./controllers.config');
const logger = require('../logger');

class ControllerCompiler {
  constructor({ controllerDir, outputDir }) {
    this.controllerDir = controllerDir;
    this.outputDir = outputDir;
  }

  build(cb) {
    this.runWebpack(false, cb);
  }

  watch(cb) {
    this.runWebpack(true, cb);
  }

  async runWebpack(watch = false, cb) {
    return webpack(
      await config({
        watch,
        controllerDir: this.controllerDir,
        outputDir: this.outputDir
      }),
      (err, stats) => {
        if (!stats.hasErrors()) {
          logger('Controllers compiled at ' + new Date().toLocaleTimeString());
        } else {
          console.log(
            stats.toString({
              colors: true
            })
          );
        }

        cb(err, stats);
      }
    );
  }
}

module.exports = ControllerCompiler;
