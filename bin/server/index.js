/* eslint-disable no-console */

const path = require('path');
const logger = require('../../src/logger');
const chalk = require('chalk').default;

module.exports = function({ port = 3000, dev = false }) {
  require('./app')().then(app => {
    const { dir } = app.__hotControllerOptions || {};
    const friendlyPath = path.relative(process.cwd(), dir);

    app.listen(port, function() {
      console.clear();
      logger(
        `controlled server started at ${chalk.red(`http://localhost:${port}`)}`
      );
      if (dev) {
        logger(
          `hot module replacement activated! Edit your controllers at ${chalk.red(
            `/${friendlyPath}`
          )} and they will reload without need of restarting this server`
        );
      }
    });
  });
};
