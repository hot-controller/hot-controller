/* eslint-disable no-console */

function logger(...args) {
  console.info(...args.map((m, i) => (i === 0 ? '♨️  ' + m : m)));
}

logger.clear = function(...args) {
  console.clear();
  logger(...args);
};

// for production (no logger)
function emptyFn() {}
emptyFn.clear = emptyFn;

module.exports = process.env.NODE_ENV === 'production' ? emptyFn : logger;
