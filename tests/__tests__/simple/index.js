const request = require('supertest');
const { addMiddleware } = require('../../utils');

let app;
describe('Simple controller', () => {
  beforeAll(async () => {
    app = await addMiddleware(global.__APP__, __dirname);
  });

  test('GET /', done => {
    request(app)
      .get('/simple')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('/');
        done();
      });
  });

  test('GET 404', done => {
    request(app)
      .get('/simple___')
      .then(response => {
        expect(response.statusCode).toBe(404);
        done();
      });
  });

  test('GET /users', done => {
    request(app)
      .get('/simple/users')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('/users');
        done();
      });
  });

  test('GET /users/1234', done => {
    request(app)
      .get('/simple/users/1234')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('/users/1234');
        done();
      });
  });
});
