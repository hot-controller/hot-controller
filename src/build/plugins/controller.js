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
        'module.exports = {};' +
          Object.keys(assets)
            .map(assetName => {
              const ccAssetName = capitalizeFirstLetter(
                camelCase(assetName.replace('.js', ''))
              );
              return `const ${ccAssetName}Path = require.resolve('./${assetName}'); module.exports.${ccAssetName} = [require(${ccAssetName}Path), ${ccAssetName}Path];`;
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
