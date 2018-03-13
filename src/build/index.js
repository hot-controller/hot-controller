/* eslint-disable no-console */

const webpack = require('webpack');
const config = require('./webpack.config');
const chokidar = require('chokidar');
const logger = require('../logger');
const { relative } = require('path');
const chalk = require('chalk').default;
const MemoryFS = require('memory-fs');

class ControllerCompiler {
  constructor({ controllerDir, distDir, plugins }) {
    this.controllerDir = controllerDir;
    this.distDir = distDir;
    this.webpackCompiler = null;
    this.plugins = plugins;
    this.fs = new MemoryFS();
  }

  close() {
    this.webpackCompiler.close();
  }

  build(cb) {
    this.runWebpack(false, cb);
  }

  webpackWatch(cb) {
    return this.runWebpack(true, cb);
  }

  watch(cb) {
    let webpackWatcher = null;

    const webpackWatch = cb =>
      this.webpackWatch(cb).then(watcher => {
        webpackWatcher = watcher;
        const { compiler } = watcher;
        compiler.outputFileSystem = this.fs;
        compiler.plugin('done', () => {
          logger.clear('Controllers compiled and 🔥 hot reloaded');
        });
        compiler.plugin('compile', () => logger('Compiling...'));
      });

    const build = () => {
      if (webpackWatcher !== null) {
        logger('local changes made to controller dir, rebuilding...');
        webpackWatcher.close();
        webpackWatch(cb);
      }
    };

    const onChange = path => {
      const relativePath = relative(this.controllerDir, path);
      if (webpackWatcher !== null) {
        logger(
          `local changes made to ${chalk.red(relativePath)}, rebuilding...`
        );
      }
    };

    const dirWatcher = chokidar.watch(this.controllerDir);
    dirWatcher.on('add', build);
    dirWatcher.on('addDir', build);
    dirWatcher.on('unlink', build);
    dirWatcher.on('unlinkDir', build);
    dirWatcher.on('change', onChange);
    dirWatcher.on('ready', () => {
      webpackWatch(cb);
    });
  }

  async runWebpack(watch = false, cb) {
    let webpackConfig = await config({
      watch,
      controllerDir: this.controllerDir,
      distDir: this.distDir
    });

    await this.plugins.emitWebpackConfig(webpackConfig);

    return (this.webpackCompiler = webpack(webpackConfig, (err, stats) => {
      if (stats.hasErrors()) {
        console.log(
          stats.toString({
            colors: true
          })
        );
      }

      cb(err, stats);
    }));
  }
}

module.exports = ControllerCompiler;
