module.exports = {
  runner: 'jest-electron/runner',
  testEnvironment: 'jest-electron/environment',
  preset: 'ts-jest',
  collectCoverage: false,
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx,js}',
    '!**/node_modules/**',
  ],
  testPathIgnorePatterns: [],
  testRegex: '/test/.*\\.test\\.tsx?$',
  transform: {
    '\\.(less|css)$': 'jest-less-loader',
  },
};
