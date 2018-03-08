const request = require('supertest');
const { addMiddleware } = require('../../utils');

let app;
describe('Async controller', () => {
  beforeAll(() => {
    return addMiddleware(global.__APP__, __dirname).then(_app => {
      app = _app;
    });
  });

  test('GET async /', done => {
    request(app)
      .get('/async')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('async');
        done();
      });
  });
});
