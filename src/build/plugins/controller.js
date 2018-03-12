const { RawSource } = require('webpack-sources');
const camelCase = require('lodash/camelCase');

module.exports = class ControllerPlugin {
  constructor(options) {
    this.options = options;
  }

  apply(compiler) {
    compiler.plugin('emit', function(compilation, callback) {
      let { assets } = compilation;

      const indexSource = new RawSource(
        'const path = require("path");\n\nmodule.exports = {};' +
          Object.keys(assets)
            .map(assetName => {
              const ccAssetName = capitalizeFirstLetter(
                camelCase(assetName.replace('.js', ''))
              );
              return `module.exports.${ccAssetName} = path.resolve(__dirname, './${assetName}');`;
            })
            .join('\n')
      );

      assets['index.js'] = indexSource;

      callback();
    });
  }
};

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}
