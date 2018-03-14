const { Controller, Route } = require('../../src');
/**
 * AsyncController
 */

@Controller('/async')
class AsyncController {
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
