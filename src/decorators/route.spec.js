const Route = require('./route');

describe('decorator: route', () => {
  it('GET', createTest('GET'));
  it('POST', createTest('POST'));
  it('PUT', createTest('PUT'));
  it('DELETE', createTest('GET'));
});

class Controller {
  @Route.GET('/')
  get() {}

  @Route.POST('/')
  post() {}

  @Route.PUT('/')
  put() {}

  @Route.DELETE('/')
  delete() {}
}

function createTest(method) {
  return () => {
    const controller = new Controller();
    expect(typeof controller.__routes).toEqual('object');
    expect(controller.__routes.get(method.toUpperCase() + ' /')).toEqual(
      method.toLowerCase()
    );
  };
}
