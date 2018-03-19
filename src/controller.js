/* eslint-disable indent */
const express = require('express');
const { reformatRouteName } = require('./utils');

class Controller {
  constructor(controllerClass) {
    this.controllerClass = controllerClass;
    this.controllerInstance = new controllerClass();
    this.path = this.controllerInstance.__path;
    if (!this.path) {
      throw new Error('Controller must have a @Controller(path)');
    }

    this.router = express.Router();
    this.routes = this.controllerInstance.__routes || new Map();

    this.setupHooks();
    this.initRouter();
  }

  initRouter() {
    this.routes.forEach((methodName, _path) => {
      let [reqMethod, path] = _path.split(' ');
      const method = this.controllerInstance[methodName];
      const isAsync = method.constructor.name === 'AsyncFunction';

      path = reformatRouteName(path);

      this.router[reqMethod.toLowerCase()].call(
        this.router,
        path,
        isAsync
          ? (req, res, next) =>
              Promise.resolve(method.call(this, req, res, next)).catch(next)
          : method.bind(this)
      );
    });
  }

  instanceHasMethod(methodName) {
    return methodName in this.controllerInstance;
  }

  setupHooks() {
    const hasBefore = this.instanceHasMethod('before');
    const hasAfter = this.instanceHasMethod('after');

    if (hasBefore || hasAfter) {
      this.router.use((req, res, next) => {
        if (hasAfter) {
          res.on(
            'finish',
            this.controllerInstance.bind(this.controllerInstance)
          );
        }

        if (hasBefore) {
          this.controllerInstance.before.call(
            this.controllerInstance,
            req,
            res,
            next
          );
        } else {
          next();
        }
      });
    }
  }

  connectRouter(router) {
    router.use(this.path, this.router);
  }
}

module.exports = Controller;
