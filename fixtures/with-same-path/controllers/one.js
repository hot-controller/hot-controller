const { Controller, Route } = require('../../../src');
/**
 * SimpleController
 */

@Controller('/same')
class SimpleController {
  @Route.GET('/')
  index(req, res) {
    // test
    res.send('/');
  }
}

export default SimpleController;
