module.exports = {
  setupTestFrameworkScriptFile: './setup.js',
  testEnvironment: './env.js',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/__tests__/.*/controllers/',
    '/tests/__tests__/.*/.build/'
  ]
};
