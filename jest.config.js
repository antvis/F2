module.exports = {
  runner: 'jest-electron/runner',
  testEnvironment: 'jest-electron/environment',
  preset: 'ts-jest',
  collectCoverage: false,
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx,js}',
    '!packages/my/src/**/*.{ts,tsx,js}',
    '!packages/wx/src/**/*.{ts,tsx,js}',
    '!packages/site/src/**/*.{ts,tsx,js}',
    '!**/node_modules/**',
  ],
  modulePathIgnorePatterns: ['packages/*/dist'],
  testPathIgnorePatterns: [],
  testRegex: '/test/.*\\.test\\.tsx?$',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
};
