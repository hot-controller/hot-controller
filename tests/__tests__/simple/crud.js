const request = require('supertest');
const { addMiddleware } = require('../../utils');

let app;
describe('Crud Controller', () => {
  beforeAll(() => {
    return addMiddleware(global.__APP__, __dirname).then(_app => {
      app = _app;
    });
  });

  test('GET /', done => {
    request(app)
      .get('/crud')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('GET');
        done();
      });
  });

  test('POST /', done => {
    request(app)
      .post('/crud')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('POST');
        done();
      });
  });

  test('PUT /', done => {
    request(app)
      .put('/crud')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('PUT');
        done();
      });
  });

  test('DELETE /', done => {
    request(app)
      .delete('/crud')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('DELETE');
        done();
      });
  });
});
