const { reformatRouteName } = require('./utils');

describe('utils', () => {
  it('reformatRouteName', () => {
    expect(reformatRouteName('/test')).toBe('/test');
    expect(reformatRouteName('/test/')).toBe('/test');
    expect(reformatRouteName('test')).toBe('/test');
    expect(reformatRouteName('/')).toBe('/');
  });
});
