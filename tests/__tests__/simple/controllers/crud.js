const { Controller, Route, Root } = require('../../../../src');
/**
 * TestController
 */

@Root('/crud')
class CrudController extends Controller {
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
