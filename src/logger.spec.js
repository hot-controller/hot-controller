const logger = require('./logger');

let log = console.info;
global.console = {
  clear: jest.fn(),
  log: jest.fn()
};

const PREFIX = '♨️  ';

describe('logger', () => {
  it('should have a clear method', () => {
    expect(logger.clear).toBeTruthy();
  });

  it('logger.clear() should clear and log', () => {
    logger.clear('test');
    expect(console.clear).toHaveBeenCalledTimes(1);
    expect(console.log).toHaveBeenCalledWith(PREFIX + 'test');
  });

  it('should log', () => {
    logger('test');
    expect(console.log).toHaveBeenCalledWith(PREFIX + 'test');
  });

  it('should only prefix first arg', () => {
    logger('test', 'test2');
    expect(console.log).toHaveBeenCalledWith(PREFIX + 'test', 'test2');
  });
});
