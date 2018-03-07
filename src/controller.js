const express = require('express');

class Controller {
  constructor() {
    if (!this.__path) {
      throw new Error('Controller must have a @Root(path)');
    }

    this.__router = express.Router();
    this.__routes = this.__routes || new Map();

    this.__initRouter();
  }

  __initRouter() {
    this.__routes.forEach((methodName, _path) => {
      let [reqMethod, path] = _path.split(' ');
      path = reformatRouteName(path);

      this.__router[reqMethod.toLowerCase()].call(
        this.__router,
        path,
        (req, res, next) =>
          Promise.resolve(this[methodName].call(this, req, res, next)).catch(
            next
          )
      );
    });
  }

  __connectRouter(router) {
    router.use(this.__path, this.__router);
  }
}

function reformatRouteName(route) {
  if (route === '/') {
    return route;
  }

  if (route[0] !== '/') {
    route = '/' + route;
  }

  if (route.endsWith('/')) {
    route = route.substring(0, route.length - 1);
  }

  return route;
}

module.exports = Controller;
