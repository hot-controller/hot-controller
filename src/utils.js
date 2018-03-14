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

module.exports = { reformatRouteName };
