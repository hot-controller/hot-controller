/* eslint-disable no-console */

module.exports = function logger(...args) {
  console.info(...args.map((m, i) => (i === 0 ? '♨️  ' + m : m)));
};
