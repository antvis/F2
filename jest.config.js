module.exports = {
  runner: 'jest-electron/runner',
  testEnvironment: 'jest-electron/environment',
  collectCoverage: false,
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx,js}',
    '!**/node_modules/**'
  ],
  testRegex: '/test/.*\\.test\\.tsx?$',
  moduleFileExtensions: [
    'ts',
    'tsx',
    'js',
    'json'
  ]
};
