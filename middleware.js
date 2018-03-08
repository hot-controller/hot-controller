module.exports =
  parseInt(process.versions.node, 10) < 8
    ? require('./lib/middleware')
    : require('./src/middleware');
