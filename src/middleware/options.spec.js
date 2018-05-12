const getOptions = require('./options');
const { resolve } = require('path');
const keys = require('lodash/keys');

describe('options', () => {
  it('gets options from .controllersrc.json5', () => {
    expect.assertions(2);
    return getOptions(getCwd('1')).then(options => {
      expect(options).toBeTruthy();
      expect(options.test).toBe(true);
    });
  });

  it('gets options from .controllersrc.json', () => {
    expect.assertions(2);
    return getOptions(getCwd('2')).then(options => {
      expect(options).toBeTruthy();
      expect(options.test).toBe(true);
    });
  });

  it('gets options from .controllersrc.yml', () => {
    expect.assertions(2);
    return getOptions(getCwd('3')).then(options => {
      expect(options).toBeTruthy();
      expect(options.test).toBe(true);
    });
  });

  it('gets options from package.json', () => {
    expect.assertions(2);
    return getOptions(getCwd('4')).then(options => {
      expect(options).toBeTruthy();
      expect(options.test).toBe(true);
    });
  });

  it('uses default options if no config is found', () => {
    expect.assertions(3);
    return getOptions(getCwd('5')).then(options => {
      expect(options).toBeTruthy();
      expect(options.dir).toBe('controllers');
      expect(keys(options)).toHaveLength(4);
    });
  });

  it('uses process cwd', () => {
    expect.assertions(4);
    return getOptions().then(options => {
      expect(options).toBeTruthy();
      expect(options.dir).toBe('controllers');
      expect(keys(options)).toHaveLength(4);
      expect(options.cwd).toBe(process.cwd());
    });
  });
});

function getCwd(path) {
  return resolve(__dirname, '../../fixtures/options', path);
}
