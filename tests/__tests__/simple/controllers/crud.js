const { Controller, Route } = require('../../../../src');
/**
 * TestController
 */

@Controller('/crud')
class CrudController {
  @Route.GET('/')
  index(req, res) {
    // test
    res.send('GET');
  }

  @Route.POST('/')
  post(req, res) {
    // test
    res.send('POST');
  }

  @Route.PUT('/')
  put(req, res) {
    // test
    res.send('PUT');
  }

  @Route.DELETE('/')
  _delete(req, res) {
    // test
    res.send('DELETE');
  }
}

export default CrudController;
