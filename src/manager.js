const ControllerError = require('./error');

class ControllerManager {
  constructor(router, { outputDir }) {
    this.controllerMap = new ControllerMap();
    this.router = router;
    this.outputDir = outputDir;
  }

  reload() {
    return this.load();
  }

  load() {
    this.loadControllers();
    this.stackRouter();
    return this.getControllers();
  }

  stackRouter() {
    // clear the stack
    this.router.stack = [];
    this.rootPathMap = new Map();

    this.getControllers().forEach(Controller => {
      const _instance = new Controller();
      if (this.rootPathMap.has(_instance.__path)) {
        throw new ControllerError(
          `${_instance.name}: A controller with root path ${
            _instance.__path
          } (${this.rootPathMap.get(
            _instance.path
          )}) has already been initialised.`
        );
      }

      _instance.__connectRouter(this.router);
      this.rootPathMap.set(_instance.__path, _instance);
    });
  }

  getControllers() {
    const controllers = [];
    this.controllerMap.forEach(([fn]) => {
      controllers.push(fn);
    });

    return controllers;
  }

  loadControllers() {
    // first clear the node require cache
    this.clearControllerCache();

    let controllers = require(require.resolve(this.outputDir));
    for (let controllerName in controllers) {
      this.controllerMap.set(controllerName, controllers[controllerName]);
    }
  }

  clearControllerCache() {
    if (this.controllerMap.size > 0) {
      this.controllerMap.forEach(([, path]) => {
        delete require.cache[path];
      });

      delete require.cache[require.resolve(this.outputDir)];
    }
  }
}

class ControllerMap extends Map {}

module.exports = ControllerManager;
