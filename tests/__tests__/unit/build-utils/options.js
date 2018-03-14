const { resolve } = require('path');
const getOptions = require('../../../../lib/middleware/options');

describe('Options', () => {
  test('get options from .controllersrc.json5', () => {
    expect.assertions(2);
    return getOptions(getCwd('1')).then(options => {
      expect(options).toBeTruthy();
      expect(options.test).toBe(true);
    });
  });

  test('get options from .controllersrc.json', () => {
    expect.assertions(2);
    return getOptions(getCwd('2')).then(options => {
      expect(options).toBeTruthy();
      expect(options.test).toBe(true);
    });
  });

  test('get options from .controllersrc.yml', () => {
    expect.assertions(2);
    return getOptions(getCwd('3')).then(options => {
      expect(options).toBeTruthy();
      expect(options.test).toBe(true);
    });
  });

  test('get options from package.json', () => {
    expect.assertions(2);
    return getOptions(getCwd('4')).then(options => {
      expect(options).toBeTruthy();
      expect(options.test).toBe(true);
    });
  });
});

function getCwd(path) {
  return resolve(__dirname, 'dir/options', path);
}
