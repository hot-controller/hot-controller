const Controller = require('./controller');

describe('decorator: controller', () => {
  it('specifies controller path', () => {
    let controller = new TestController();
    expect(controller.__path).toEqual('/test');
  });
});

@Controller('/test')
class TestController {}
