const PluginManager = require('./index');
const express = require('express');

describe('PluginManager', () => {
  it('loadPluginsFromOptions with plugins', async () => {
    expect.assertions(1);

    let plugins = new PluginManager();
    await plugins.loadPluginsFromOptions({
      plugins: ['test'] // __mocks__/hot-controller-plugin-test.js will be loaded
    });

    expect(plugins.plugins).toHaveLength(1);
  });

  it('loadPluginsFromOptions without plugins', async () => {
    expect.assertions(1);

    let plugins = new PluginManager();
    await plugins.loadPluginsFromOptions({});
    expect(plugins.plugins).toHaveLength(0);
  });

  it('loads plugin from relative path', async () => {
    expect.assertions(2);

    let plugins = new PluginManager();
    let emitter = plugins.emitter;
    await plugins.loadPluginsFromOptions({
      plugins: ['./fixtures/plugins/simple.js']
    });

    expect(plugins.plugins).toHaveLength(1);
    let obj = { res: false };
    await emitter.emit('sync-test', obj);
    expect(obj.res).toBe(true);
  });

  it('loads plugin from non-prefixed package name', async () => {
    expect.assertions(2);

    let plugins = new PluginManager();
    let emitter = plugins.emitter;
    await plugins.loadPluginsFromOptions({
      plugins: ['test']
    });

    expect(plugins.plugins).toHaveLength(1);
    let obj = { res: false };
    await emitter.emit('test', obj);
    expect(obj.res).toBe(true);
  });

  it('loads plugin from prefixed package name', async () => {
    expect.assertions(2);

    let plugins = new PluginManager();
    let emitter = plugins.emitter;
    await plugins.loadPluginsFromOptions({
      plugins: ['hot-controller-plugin-test']
    });

    expect(plugins.plugins).toHaveLength(1);
    let obj = { res: false };
    await emitter.emit('test', obj);
    expect(obj.res).toBe(true);
  });

  it('loads plugin from function', async () => {
    expect.assertions(2);

    let plugins = new PluginManager();
    let emitter = plugins.emitter;
    await plugins.loadPluginsFromOptions({
      plugins: [
        function(events) {
          events.on('test', obj => {
            obj.res = true;
          });
        }
      ]
    });

    expect(plugins.plugins).toHaveLength(1);
    let obj = { res: false };
    await emitter.emit('test', obj);
    expect(obj.res).toBe(true);
  });

  it('throws error if plugins is no function', async () => {
    expect.assertions(1);

    let plugins = new PluginManager();
    expect(() => {
      loadPlugins(['invalid class']);
    }).toThrow();
  });

  it('emits', async () => {
    let beforeControllers = jest.fn();
    let afterControllers = jest.fn();
    let afterPluginInit = jest.fn();

    let plugins = new PluginManager();

    await plugins.loadPluginsFromOptions({
      plugins: [
        function(events) {
          events.on('before-controllers', () => beforeControllers());
          events.on('after-controllers', () => afterControllers());
          events.on('after-plugins-init', () => afterPluginInit());
        }
      ]
    });
    plugins.emitBeforeControllers();
    plugins.emitAfterControllers();

    expect(beforeControllers).toHaveBeenCalledTimes(2);
    expect(afterControllers).toHaveBeenCalledTimes(1);
    expect(afterPluginInit).toHaveBeenCalledTimes(1);
  });
});
