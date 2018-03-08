const { Controller, Route, Root } = require('../../../../src');
/**
 * TestController
 */

@Root('/simple')
class SimpleController extends Controller {
  @Route.GET('/')
  index(req, res) {
    // test
    res.send('/');
  }

  @Route.GET('/users')
  users(req, res) {
    // test
    res.send('/users');
  }

  @Route.GET('/users/:id')
  user(req, res) {
    // test
    res.send('/users/' + req.params.id);
  }
}

export default SimpleController;
