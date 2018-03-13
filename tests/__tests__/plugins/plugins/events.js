module.exports = (event, cb) =>
  function(events) {
    events.on(event, async (router, controllerMap) => {
      cb(router, controllerMap);
    });
  };
