const request = require('supertest');
const { addMiddleware } = require('../../utils');

let app;
let emitter;
describe('Plugin events', () => {
  beforeAll(
    () =>
      new Promise(resolve => {
        return addMiddleware(global.__APP__, __dirname, {
          // send reference to plugin so it can assign it the emitter
          plugins: [
            require('./plugins/routes')(_emitter => (emitter = _emitter))
          ]
        }).then(_app => {
          app = _app;

          resolve();
        });
      })
  );

  test('GET /events bound by plugin', done => {
    request(app)
      .get('/events')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('route from plugin');
        done();
      });
  });
});
