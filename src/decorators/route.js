const Route = {
  GET: path => createRouteDecorator('GET', path),
  POST: path => createRouteDecorator('POST', path),
  PUT: path => createRouteDecorator('PUT', path),
  DELETE: path => createRouteDecorator('DELETE', path)
};

function createRouteDecorator(method, path) {
  return function(target, key) {
    target.constructor.prototype.__routes =
      target.constructor.prototype.__routes || new Map();

    const routes = target.constructor.prototype.__routes;
    routes.set(method + ' ' + path, key);
  };
}

module.exports = Route;
