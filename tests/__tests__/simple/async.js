const request = require('supertest');
const { addMiddleware } = require('../../utils');

let app;
describe('Async controller', () => {
  beforeAll(async () => {
    app = await addMiddleware(global.__APP__, __dirname);
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
