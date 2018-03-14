module.exports = function(events) {
  events.on('test', function(obj) {
    obj.res = true;
  });
};
