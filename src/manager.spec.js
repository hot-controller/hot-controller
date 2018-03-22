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
