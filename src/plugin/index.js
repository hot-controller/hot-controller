const EventEmitter = require('promise-events');

const PLUGIN_PREFIX = 'hot-controller-plugin-';

class PluginManager {
  constructor(router) {
    this.plugins = [];
    this.router = router;
    this.emitter = new EventEmitter();
  }

  async loadPluginsFromOptions(options) {
    const { plugins = [] } = options;
    let pluginClasses = [];

    plugins.forEach(plugin => {
      if (typeof plugin === 'string') {
        // check if string starts with dot or slash
        if (plugin.length > 2 && (plugin[0] === '.' || plugin[0] === '/')) {
          pluginClasses.push(require(require.resolve(plugin)));
        } else if (plugin.length > PLUGIN_PREFIX.length) {
          pluginClasses.push(require(plugin));
        } else {
          pluginClasses.push(require(PLUGIN_PREFIX + plugin));
        }
      } else if (typeof plugin === 'function') {
        pluginClasses.push(plugin);
      }
    });

    await this.loadPlugins(pluginClasses);
  }

  async loadPlugins(pluginClassArr) {
    try {
      pluginClassArr.forEach(pluginClass => {
        let instance = new pluginClass(this.emitter);
        this.plugins.push(instance);
      });

      await this.emit('after-plugins-init', this.plugins);
    } catch (err) {
      throw err;
    } finally {
      await this.emit('before-controllers', this.router);
    }
  }

  emitBeforeControllers() {
    this.emit('before-controllers', this.router);
  }

  emitAfterControllers(controllerMap) {
    this.emit('after-controllers', this.router, controllerMap);
  }

  emit(event, ...args) {
    return this.emitter.emit(event, ...args);
  }
}

module.exports = PluginManager;
