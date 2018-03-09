const { Controller, Route } = require('hot-controller');

@Controller('/')
export default class HomeController {
  @Route.GET('/')
  index(req, res) {
    // index
    res.send('Welcome');
  }
}
