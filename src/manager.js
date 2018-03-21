const logger = require('./logger');

const ControllerError = require('./error');
const Controller = require('./controller');
const { resolve } = require('path');
const recursive = require('recursive-readdir');
const chokidar = require('chokidar');

class ControllerManager {
  constructor(router, plugins, { controllerDir }) {
    this.controllerMap = new Map();
    this.router = router;
    this.controllerDir = controllerDir;
    this.plugins = plugins;

    this.loadedFiles = [];
    this.watcherReady = false;
  }

  reload() {
    this.clearCache();
    this.router.stack = [];
    this.load().then(() => {
      if (this.watcherReady) {
        logger('🔥 hot reloaded');
      }
    });
  }

  async watch() {
    const reload = this.reload.bind(this);

    this.dirWatcher = chokidar.watch(this.controllerDir);
    this.dirWatcher.on('add', reload);
    this.dirWatcher.on('addDir', reload);
    this.dirWatcher.on('unlink', reload);
    this.dirWatcher.on('unlinkDir', reload);
    this.dirWatcher.on('change', reload);
    this.dirWatcher.on('ready', () => {
      logger('watcher ready');
      this.watcherReady = true;
    });
  }

  async load() {
    await this.stackRouter();
  }

  clearCache() {
    this.loadedFiles.forEach(file => {
      delete require.cache[require.resolve(file)];
    });
  }

  async stackRouter() {
    this.rootPathMap = new Map();
    this.loadedFiles = await this.getFiles();

    this.loadedFiles.forEach(controllerPath => {
      let controllerClass = require(controllerPath);
      controllerClass =
        typeof controllerClass.default === 'function'
          ? controllerClass.default
          : controllerClass;

      if (typeof controllerClass === 'function') {
        const controller = new Controller(controllerClass);
        if (this.rootPathMap.has(controller.path)) {
          throw new ControllerError(
            `${
              controller.controllerInstance.name
            }: A controller with root path ${
              controller.path
            } (${this.rootPathMap.get(
              controller.path
            )}) has already been initialised.`
          );
        }

        controller.connectRouter(this.router);
        this.rootPathMap.set(controller.path, controller);
      }
    });

    this.plugins.emitAfterControllers(this.rootPathMap);
  }

  getFiles() {
    return recursive(resolve(this.controllerDir));
  }
}

module.exports = ControllerManager;
