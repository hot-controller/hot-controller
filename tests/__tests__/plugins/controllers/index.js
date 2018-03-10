const { Controller, Route } = require('../../../../src');
/**
 * TestController
 */

@Controller('/plugins')
class PluginController {
  @Route.GET('/')
  async index(req, res) {
    res.send('/');
  }
}

export default PluginController;
