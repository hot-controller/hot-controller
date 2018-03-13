const ControllerError = require("./error");
const Controller = require("./controller");
const requireFromString = require("require-from-string");
const { resolve } = require("path");

class ControllerManager {
  constructor(router, plugins, { distDir }) {
    this.controllerMap = new ControllerMap();
    this.router = router;
    this.distDir = distDir;
    this.plugins = plugins;
    this.compiler = null;
  }

  reload() {
    return this.load();
  }

  load() {
    this.loadControllers();
    this.stackRouter();
    return this.getControllers();
  }

  setCompiler(compiler) {
    this.compiler = compiler;
  }

  require(path) {
    if (this.compiler === null) {
      return require(path);
    } else {
      return requireFromFS(this.compiler.fs, path);
    }
  }

  stackRouter() {
    this.rootPathMap = new Map();

    this.getControllers().forEach(controllerPath => {
      const controllerClass = this.require(controllerPath);

      if (typeof controllerClass === "function") {
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

    this.plugins.emitAfterControllers(this.rootPathMap);
  }

  getControllers() {
    const controllers = [];
    this.controllerMap.forEach(path => {
      controllers.push(path);
    });

    return controllers;
  }

  loadControllers() {
    let controllers;
    if (this.compiler === null) {
      controllers = require(require.resolve(this.distDir));
    } else {
      controllers = requireFromFS(
        this.compiler.fs,
        resolve(this.distDir, "index.js")
      );
    }

    for (let controllerName in controllers) {
      this.controllerMap.set(controllerName, controllers[controllerName]);
    }
  }
}

function requireFromFS(fs, path) {
  return requireFromString(fs.readFileSync(path, "utf-8"), path);
}

class ControllerMap extends Map {}

module.exports = ControllerManager;
