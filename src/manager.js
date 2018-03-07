class ControllerManager {
  constructor(router, { outputDir }) {
    this.controllerMap = new ControllerMap();
    this.router = router;
    this.outputDir = require.resolve(outputDir);
  }

  reload() {
    this.loadControllers();
    return this.load();
  }

  load() {
    this.stackRouter();
    return this.getControllers();
  }

  stackRouter() {
    // clear the stack
    this.router.stack = [];

    this.getControllers().forEach(Controller => {
      const _instance = new Controller();
      _instance.__connectRouter(this.router);
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

    let controllers = require(this.outputDir);
    for (let controllerName in controllers) {
      this.controllerMap.set(controllerName, controllers[controllerName]);
    }
  }

  clearControllerCache() {
    if (this.controllerMap.size > 0) {
      this.controllerMap.forEach(([, path]) => {
        delete require.cache[path];
      });

      delete require.cache[this.outputDir];
    }
  }
}

class ControllerMap extends Map {}

module.exports = ControllerManager;
