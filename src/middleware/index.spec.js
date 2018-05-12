const middleware = require('./');
const path = require('path');
const fixturesPath = path.resolve(__dirname, '../../fixtures');
const request = require('supertest');
const express = require('express');

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

  it('uses options.path to serve controllers from', done => {
    expect.assertions(2);

    const app = express();

    app.use(
      middleware(
        {
          path: 'api'
        },
        router => {
          request(app)
            .get('/api/simple/users')
            .then(response => {
              expect(response.statusCode).toBe(200);
              expect(response.text).toBe('/users');

              done();
            });
        },
        fixturesPath
      )
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
