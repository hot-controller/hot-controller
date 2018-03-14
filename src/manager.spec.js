const ControllerManager = require('./manager');
const PluginManager = require('./plugin');
const path = require('path');
const express = require('express');
const distDir = path.resolve(__dirname, '../fixtures/dist/controllers');
const withSameDistPath = path.resolve(
  __dirname,
  '../fixtures/with-same-path/dist/controllers'
);

describe('ControllerManager', () => {
  it('loads controllers', () => {
    let router = express.Router();
    let manager = new ControllerManager(router, new PluginManager(), {
      distDir
    });

    manager.loadControllers();
    expect(manager.controllerMap.size).toBe(3);
  });

  it('loads routers', () => {
    let router = express.Router();
    let manager = new ControllerManager(router, new PluginManager(), {
      distDir
    });

    manager.load();
    expect(router.stack).toHaveLength(3);
    manager.reload();
    expect(router.stack).toHaveLength(3);
  });

  it('prevents two controllers with same root path', () => {
    let router = express.Router();
    let manager = new ControllerManager(router, new PluginManager(), {
      distDir: withSameDistPath
    });

    manager.loadControllers();
    expect(() => {
      manager.stackRouter();
    }).toThrow();
  });

  it('sets compiler', () => {
    let router = express.Router();
    let manager = new ControllerManager(router, new PluginManager(), {
      distDir
    });

    let compiler = function() {};
    manager.setCompiler(compiler);
    expect(manager.compiler).toBe(compiler);
  });
});
