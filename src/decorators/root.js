function Root(path) {
  return function(target) {
    target.prototype.constructor.prototype.__path = path;
  };
}

module.exports = Root;
