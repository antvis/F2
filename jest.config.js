module.exports = {
  runner: 'jest-electron/runner',
  testEnvironment: 'jest-electron/environment',
  preset: 'ts-jest/presets/js-with-ts',
  collectCoverage: false,
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx,js}',
    '!packages/my/src/**/*.{ts,tsx,js}',
    '!packages/wx/src/**/*.{ts,tsx,js}',
    '!packages/site/src/**/*.{ts,tsx,js}',
    '!**/node_modules/**',
  ],
  modulePathIgnorePatterns: ['packages/*/dist'],
  testPathIgnorePatterns: ['packages/vue/*'],
  testRegex: '/test/.*\\.test\\.tsx?$',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};
