const logger = require('./logger');

const ControllerError = require('./error');
const Controller = require('./controller');
const { resolve, extname, relative } = require('path');
const recursive = require('recursive-readdir');
const chokidar = require('chokidar');
const chalk = require('chalk').default;

const ALLOWED_EXTENSIONS = ['.js', '.ts', '.re'];

class ControllerManager {
  constructor(router, plugins, { controllerDir }) {
    this.controllerMap = new Map();
    this.router = router;
    this.controllerDir = controllerDir;
    this.plugins = plugins;

    this.loadedFiles = [];
    this.watcherReady = false;
  }

  async reload(path = null) {
    if (path !== null) {
      const relativePath = relative(this.controllerDir, path);
      logger(`local changes made to ${chalk.red(relativePath)}, replacing...`);
    }

    this.clearCache();
    this.router.stack = [];
    await this.load();

    if (this.watcherReady) {
      logger.clear('Controllers 🔥 hot reloaded');
    }
  }

  async watch(opts = {}) {
    const { onReady = null } = opts;

    const reload = this.reload.bind(this);

    await this.load();

    this.dirWatcher = chokidar.watch(this.controllerDir);
    this.dirWatcher.on('ready', () => {
      this.dirWatcher.on('add', reload);
      this.dirWatcher.on('addDir', reload);
      this.dirWatcher.on('unlink', reload);
      this.dirWatcher.on('unlinkDir', reload);
      this.dirWatcher.on('change', reload);

      const friendlyPath = relative(process.cwd(), this.controllerDir);

      logger(
        `hot module replacement activated! Edit your controllers at ${chalk.red(
          `/${friendlyPath}`
        )} and they will reload without need of restarting this server`
      );

      this.watcherReady = true;
      onReady && onReady(this.dirWatcher);
    });

    return this.dirWatcher;
  }

  async load() {
    await this.stackRouter();
    return this.loadedFiles;
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
      if (ALLOWED_EXTENSIONS.indexOf(extname(controllerPath)) >= 0) {
        let controllerClass = require(controllerPath).default;

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
      }
    });

    this.plugins.emitAfterControllers(this.rootPathMap);
  }

  getFiles() {
    return recursive(resolve(this.controllerDir));
  }
}

module.exports = ControllerManager;
