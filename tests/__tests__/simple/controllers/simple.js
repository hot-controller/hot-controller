const { Controller, Route, Root } = require('../../../../src');
/**
 * TestController
 */

@Root('/simple')
class SimpleController extends Controller {
  @Route.GET('/')
  async index(req, res) {
    // test
    res.send('/');
  }

  @Route.GET('/users')
  async users(req, res) {
    // test
    res.send('/users');
  }

  @Route.GET('/users/:id')
  async user(req, res) {
    // test
    res.send('/users/' + req.params.id);
  }
}

export default SimpleController;
