const Controller = require('./controller');
const SimpleController = require('../fixtures/dist/controllers/simple.controller');
const HooksController = require('../fixtures/dist/controllers/hooks.controller');
const AsyncController = require('../fixtures/dist/controllers/async.controller');
const express = require('express');
const request = require('supertest');

describe('Controller', () => {
  it('throws error if without decorator', () => {
    const klass = jest.fn();
    expect(() => {
      new Controller(klass);
    }).toThrow();
    expect(klass).toHaveBeenCalledTimes(1);
  });

  it('creates an instance to controller class', () => {
    let controller = new Controller(SimpleController);

    expect(controller.controllerInstance).toBeInstanceOf(SimpleController);
  });

  it('gets root path from decoration', () => {
    let controller = new Controller(SimpleController);
    expect(controller.path).toBe('/simple');
  });

  it('add controller router to main router stack', () => {
    const mainRouter = express.Router();
    let controller = new Controller(SimpleController);
    expect(mainRouter.stack).toHaveLength(0);
    controller.connectRouter(mainRouter);
    expect(mainRouter.stack).toHaveLength(1);
  });

  it('create async routes', () => {
    const mainRouter = express.Router();
    let controller = new Controller(AsyncController);
    expect(mainRouter.stack).toHaveLength(0);
    controller.connectRouter(mainRouter);
    expect(mainRouter.stack).toHaveLength(1);
  });

  it('calls before hook', done => {
    expect.assertions(3);

    let cb = jest.fn();
    HooksController.prototype.before = function(req, res, next) {
      cb();
      next();
    };

    const mainRouter = express();
    let controller = new Controller(HooksController);
    controller.connectRouter(mainRouter);
    controller.setupHooks();

    request(mainRouter)
      .get('/hooks')
      .then(response => {
        expect(cb).toHaveBeenCalledTimes(1);
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('/');

        done();
      });
  });

  it('before hook interrupts request', done => {
    expect.assertions(2);

    HooksController.prototype.before = function(req, res, next) {
      res.send('interrupted');
      res.end();
    };

    const mainRouter = express();
    let controller = new Controller(HooksController);
    controller.connectRouter(mainRouter);
    controller.setupHooks();

    request(mainRouter)
      .get('/hooks')
      .then(response => {
        expect(response.statusCode).toBe(200);
        expect(response.text).toBe('interrupted');

        done();
      });
  });
});
