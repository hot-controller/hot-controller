const ControllerError = require('./error');
const Controller = require('./controller');

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

    this.getControllers().forEach(controllerClass => {
      if (typeof controllerClass === 'function') {
        const controller = new Controller(controllerClass);
        if (this.rootPathMap.has(controller.__path)) {
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
