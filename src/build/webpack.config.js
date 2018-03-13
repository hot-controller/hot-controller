/* eslint-disable no-console */
/* eslint-disable indent */

const path = require('path');
const { getEntriesFromDir, babelConfig } = require('./utils');
const ControllerPlugin = require('./plugins/controller');
const fs = require('fs');
const THIS_ROOT = path.resolve(__dirname, '../..');
const node_modules = (function() {
  const project = getNodeModulesList(THIS_ROOT);
  const local = getNodeModulesList(process.cwd());

  return project.concat(local);
})();

module.exports = async function({
  watch = false,
  controllerDir,
  distDir = path.resolve(process.cwd(), 'dist/controllers')
}) {
  const entries = await getEntriesFromDir(controllerDir);
  return {
    cache: watch,
    entry: entries,
    output: {
      path: distDir,
      filename: '[name].controller.js',
      library: 'controller',
      libraryExport: 'default',
      libraryTarget: 'commonjs2'
    },
    resolveLoader: {
      modules: ['node_modules', path.resolve(__dirname, '../../node_modules')]
    },
    resolve: {
      alias: {
        'hot-controller$': path.resolve(__dirname, '../../index.js'),
        'hot-controller/middleware$': path.resolve(
          __dirname,
          '../../middleware.js'
        )
      }
    },
    externals: node_modules,
    target: 'node',
    mode: 'production',
    watchOptions: watch
      ? {
          aggregateTimeout: 300,
          poll: 1000,
          ignored: /node_modules/
        }
      : undefined,
    watch,
    plugins: [new ControllerPlugin()],
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: babelConfig(controllerDir)
          }
        }
      ]
    }
  };
};

function getNodeModulesList(wd) {
  const _path = path.resolve(wd, 'node_modules');
  return fs.existsSync(_path)
    ? fs.readdirSync(_path).filter(function(x) {
        return x !== '.bin';
      })
    : [];
}
