const Controller = require('./controller');
const SimpleController = require('../fixtures/dist/controllers/simple.controller');
const AsyncController = require('../fixtures/dist/controllers/async.controller');
const express = require('express');

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
});
