/* eslint-disable no-console */
/* eslint-disable indent */

const path = require('path');
const { getEntriesFromDir } = require('./utils');
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
  outputDir = path.resolve(process.cwd(), 'dist/controllers')
}) {
  const entries = await getEntriesFromDir(controllerDir);
  return {
    cache: process.env.NODE_ENV === 'development',
    entry: entries,
    output: {
      path: outputDir,
      filename: '[name].controller.js',
      library: 'controller',
      libraryExport: 'default',
      libraryTarget: 'commonjs2'
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
            options: {
              babelrc: false,
              presets: [
                [
                  require('babel-preset-env'),
                  {
                    targets: {
                      node: '6'
                    }
                  }
                ]
              ],
              plugins: [
                require('babel-plugin-transform-decorators-legacy').default
              ]
            }
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
