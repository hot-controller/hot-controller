/* eslint-disable no-console */

const path = require('path');
const logger = require('../../src/logger');

module.exports = function({ port = 3000 }) {
  require('./app')().then(app => {
    const { dir } = app.__hotControllerOptions || {};
    const friendlyPath = path.relative(process.cwd(), dir);

    app.listen(port, function() {
      console.clear();
      logger(`controlled server started at http://localhost:${port}`);
      logger(`create your controllers at /${friendlyPath}`);
    });
  });
};
