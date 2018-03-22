const Route = require('./route');

describe('decorator: route', () => {
  it('sets route', () => {
    const controller = new Controller();
    expect(typeof controller.__routes).toEqual('object');
    expect(controller.__routes.get('GET /')).toEqual('index');
  });
});

class Controller {
  @Route.GET('/')
  index() {}
}
