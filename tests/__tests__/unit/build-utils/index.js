const {
  babelConfig,
  getEntriesFromDir
} = require('../../../../lib/build/utils');
const values = require('lodash/values');
const keys = require('lodash/keys');
const path = require('path');
const dirPath = path.resolve(__dirname, 'dir');

describe('build utils', () => {
  test('findBabelConfig', () => {
    let res = babelConfig(dirPath);
    expect(res.babelrc).toBe(true);
  });

  test('getEntriesFromDir', () => {
    expect.assertions(6);
    return getEntriesFromDir(path.resolve(dirPath, 'entries')).then(entries => {
      expect(keys(entries)).toContain('file');
      expect(keys(entries)).toContain('file2');
      expect(keys(entries)).toContain('folder.file');

      expect(values(entries)).toContain(getPathFromId('file'));
      expect(values(entries)).toContain(getPathFromId('file2'));
      expect(values(entries)).toContain(getPathFromId('folder.file'));
    });
  });
});

function getPathFromId(id) {
  return path.resolve(dirPath, 'entries/' + id.replace(/\./g, '/') + '.js');
}
