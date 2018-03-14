/* eslint-disable no-console */

function logger(...args) {
  console.log(...args.map((m, i) => (i === 0 ? '♨️  ' + m : m)));
}

logger.clear = function clearAndLog(...args) {
  console.clear();
  logger(...args);
};

module.exports = logger;
