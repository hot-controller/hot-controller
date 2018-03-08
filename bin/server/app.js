const express = require('express');
const middleware = require('../../src/middleware');

module.exports = function() {
  return new Promise(resolve => {
    const app = express();

    app.use(
      middleware(function(router, compiler, options) {
        app.__hotControllerOptions = options;
        resolve(app);
      }, process.cwd())
    );
  });
};
