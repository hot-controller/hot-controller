const ControllerManager = require('./manager');
const PluginManager = require('./plugin');
const path = require('path');
const express = require('express');
const dir = path.resolve(__dirname, '../fixtures/controllers');
const withSameDir = path.resolve(
  __dirname,
  '../fixtures/with-same-path/controllers'
);

describe('ControllerManager', () => {
  it('loads routers', async () => {
    let router = express.Router();
    let manager = new ControllerManager(router, new PluginManager(), {
      controllerDir: dir
    });

    await manager.load();
    expect(router.stack).toHaveLength(4);
    await manager.reload();
    expect(router.stack).toHaveLength(4);
  });

  it('watcher gets ready command', done => {
    expect.assertions(2);
    global.console.log = jest.fn();

    let router = express.Router();
    let manager = new ControllerManager(router, new PluginManager(), {
      controllerDir: dir
    });

    manager.watch({
      onReady: watcher => {
        watcher.close();
        expect(global.console.log).toHaveBeenCalledTimes(1);
        expect(watcher).toBeTruthy();

        done();
      }
    });
  });

  it('reloads on watcher changes', done => {
    expect.assertions(6);
    global.console.log = jest.fn();
    global.console.clear = jest.fn();

    let router = express.Router();
    let manager = new ControllerManager(router, new PluginManager(), {
      controllerDir: dir
    });

    manager.watch({
      onReady: watcher => {
        watcher.close();
        expect(router.stack).toHaveLength(4);
        expect(global.console.log).toHaveBeenCalledTimes(1);
        manager.reload('/path').then(() => {
          expect(global.console.log).toHaveBeenCalledTimes(3);
          expect(global.console.clear).toHaveBeenCalledTimes(1);
          expect(router.stack).toHaveLength(4);
          expect(router).toBe(manager.router);

          done();
        });
      }
    });
  });

  it('prevents two controllers with same root path', async () => {
    let router = express.Router();
    let manager = new ControllerManager(router, new PluginManager(), {
      controllerDir: withSameDir
    });

    // we cant use .toThrow() on a async function
    // see: https://github.com/facebook/jest/issues/1377

    let thrownError = null;
    try {
      await manager.load();
    } catch (err) {
      thrownError = err;
    }

    expect(thrownError).toBeTruthy();
  });
});
