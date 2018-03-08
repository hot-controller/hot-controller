const middleware = require('../src/middleware');

function addMiddleware(app, dir) {
  return new Promise(resolve => {
    app.use(
      middleware((router, compiler = null) => {
        if (compiler !== null) {
          (global.__COMPILERS__ || []).push(compiler);
        }
        resolve(app);
      }, dir)
    );
  });
}

module.exports = { addMiddleware };
