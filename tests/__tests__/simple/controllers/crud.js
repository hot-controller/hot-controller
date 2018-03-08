const { Controller, Route, Root } = require('../../../../src');
/**
 * TestController
 */

@Root('/crud')
class CrudController extends Controller {
  @Route.GET('/')
  async index(req, res) {
    // test
    res.send('GET');
  }

  @Route.POST('/')
  async post(req, res) {
    // test
    res.send('POST');
  }

  @Route.PUT('/')
  async put(req, res) {
    // test
    res.send('PUT');
  }

  @Route.DELETE('/')
  async _delete(req, res) {
    // test
    res.send('DELETE');
  }
}

export default CrudController;
