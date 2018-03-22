import { Controller, Route } from '../../src';
/**
 * AsyncController
 */

@Controller('/hooks')
class HooksController {
  @Route.GET('/')
  async index(req, res) {
    // test
    res.send('/');
  }
}

export default HooksController;
