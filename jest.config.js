module.exports = {
  runner: '@alipay/jest-electron/runner',
  testEnvironment: '@alipay/jest-electron/environment',
  preset: 'ts-jest',
  collectCoverage: false,
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx,js}',
    '!**/node_modules/**',
  ],
  testRegex: '/test/.*\\.test\\.tsx?$',
  transform: {
    '\\.(less|css)$': 'jest-less-loader',
  },
};
