const { getEntriesFromDir } = require('./utils');
const path = require('path');
const keys = require('lodash/keys');

describe('build utils', () => {
  it('should getEntriesFromDir', async () => {
    let entries = await getEntriesFromDir(
      path.resolve(__dirname, '../../fixtures/controllers')
    );
    expect(keys(entries)).toHaveLength(4);
  });
});
