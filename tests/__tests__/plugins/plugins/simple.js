module.exports = fn =>
  function(events) {
    fn(events);
    events.on('sync-test', function(obj) {
      obj.res = true;
    });

    events.on('async-test', async function(obj) {
      obj.res = await Promise.resolve(true);
    });
  };
