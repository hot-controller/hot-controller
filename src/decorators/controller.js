function Controller(path) {
  return function(target) {
    target.prototype.constructor.prototype.__path = path;
  };
}

module.exports = Controller;
