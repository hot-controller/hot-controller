const { Controller, Route } = require('../../../index');

// tell us this is a controller and on what root-path it should control.
@Controller('/')
export default class HomeController {
  // declare your methods below

  @Route.GET('/')
  index(req, res) {
    //
    res.send('Welcome');
  }
}
