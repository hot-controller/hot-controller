const { addMiddleware } = require('../../utils');

let emitter;
describe('Simple plugins', () => {
  beforeAll(
    () =>
      new Promise(resolve => {
        return addMiddleware(global.__APP__, __dirname, {
          // send reference to plugin so it can assign it the emitter
          plugins: [
            require('./plugins/simple')(_emitter => (emitter = _emitter))
          ]
        }).then(() => {
          resolve();
        });
      })
  );

  test('sync events', () => {
    let obj = { res: false };
    emitter.emit('sync-test', obj);
    expect(obj.res).toBe(true);
  });

  test('async events', async () => {
    let obj = { res: false };
    await emitter.emit('async-test', obj);
    expect(obj.res).toBe(true);
  });
});
