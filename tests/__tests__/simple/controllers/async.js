const { Controller, Route, Root } = require('../../../../src');
/**
 * TestController
 */

@Root('/async')
class AsyncController extends Controller {
  @Route.GET('/')
  async index(req, res) {
    // test
    res.send(await asyncFn());
  }
}

function asyncFn() {
  return Promise.resolve('async');
}

export default AsyncController;
