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

  it('callback', async () => {
    expect.assertions(1);
    const cb = jest.fn();

    await callbackPromise({}, cb);

    expect(cb).toHaveBeenCalledTimes(1);
  });

  it('returns router', done => {
    expect.assertions(1);

    middleware(
      {},
      router => {
        expect(router.stack).toHaveLength(4);
        done();
      },
      fixturesPath
    );
  });

  it('watches on dev', done => {
    process.env.NODE_ENV = 'development';
    expect.assertions(1);
    middleware(
      { dev: true },
      (router, watcher) => {
        expect(router.stack).toHaveLength(4);
        watcher.close();
        done();
      },
      fixturesPath
    );
  });
});

function callbackPromise(options = {}, cb) {
  return new Promise(resolve => {
    middleware(
      options,
      () => {
        cb();
        resolve();
      },
      fixturesPath
    );
  });
}
