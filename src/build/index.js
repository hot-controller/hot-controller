/* eslint-disable no-console */

const webpack = require('webpack');
const config = require('./webpack.config');

class ControllerCompiler {
  constructor({ controllerDir, outputDir }) {
    this.controllerDir = controllerDir;
    this.outputDir = outputDir;
    this.webpackCompiler = null;
  }

  close() {
    this.webpackCompiler.close();
  }

  build(cb) {
    this.runWebpack(false, cb);
  }

  watch(cb) {
    this.runWebpack(true, cb);
  }

  async runWebpack(watch = false, cb) {
    return (this.webpackCompiler = webpack(
      await config({
        watch,
        controllerDir: this.controllerDir,
        outputDir: this.outputDir
      }),
      (err, stats) => {
        if (stats.hasErrors()) {
          console.log(
            stats.toString({
              colors: true
            })
          );
        }

        cb(err, stats);
      }
    ));
  }
}

module.exports = ControllerCompiler;
