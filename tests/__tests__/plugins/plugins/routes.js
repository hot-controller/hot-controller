module.exports = fn =>
  function(events) {
    fn(events);

    events.on('before-controllers', async router => {
      router.get('/events', (req, res) => {
        res.send('route from plugin');
      });

      return router;
    });
  };
