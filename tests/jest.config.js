module.exports = {
  setupTestFrameworkScriptFile: './setup.js',
  testEnvironment: './env.js',
  testPathIgnorePatterns: [
    '/node_modules/',
    '/tests/__tests__/.*/controllers/',
    '/tests/__tests__/.*/.build/',
    '/tests/__tests__/.*/plugins/',
    '/tests/__tests__/.*/dir/'
  ]
};
