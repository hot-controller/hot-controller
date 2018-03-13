module.exports = (/*context, opts = {}*/) => ({
  presets: [
    [
      require.resolve('babel-preset-env'),
      {
        targets: {
          node: '6'
        }
      }
    ]
  ],
  plugins: [
    require.resolve('babel-plugin-transform-object-rest-spread'),
    require.resolve('babel-plugin-transform-class-properties'),
    require.resolve('babel-plugin-transform-decorators-legacy')
  ]
});
