const middleware = require('./');
const path = require('path');
const fixturesPath = path.resolve(__dirname, '../../fixtures');

global.console.clear = () => {};
global.console.warn = () => {};
global.console.log = () => {};
global.console.error = () => {};

describe('middleware', () => {
  afterEach(() => {
    process.env.NODE_ENV = 'test';
  });

  it('exports function', () => {
    expect(typeof middleware).toBe('function');
  });

  it('dont compile in non-dev', () => {
    expect.assertions(1);
    return new Promise(resolve => {
      process.env.NODE_ENV = 'production';
      middleware(
        {},
        (router, compiler, options) => {
          expect(compiler).toBeNull();
          resolve();
        },
        fixturesPath
      );
    });
  });

  it(
    'compiles in dev',
    () => {
      expect.assertions(1);
      return new Promise(resolve => {
        middleware(
          { dev: true },
          (router, compiler, options) => {
            expect(compiler).toBeTruthy();
            compiler.close();
            resolve();
          },
          fixturesPath
        );
      });
    },
    20000
  );
});
