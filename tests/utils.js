const middleware = require('../lib/middleware');

function addMiddleware(app, dir, options = {}) {
  return new Promise(resolve => {
    app.use(
      middleware(
        options,
        (router, compiler = null) => {
          if (compiler !== null) {
            (global.__COMPILERS__ || []).push(compiler);
          }
          resolve(app);
        },
        dir
      )
    );
  });
}

module.exports = { addMiddleware };
