module.exports = {
  runner: '@alipay/jest-electron/runner',
  testEnvironment: '@alipay/jest-electron/environment',
  preset: 'ts-jest',
  collectCoverage: false,
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx,js}',
    '!**/node_modules/**',
  ],
  // FIXME: 后续下面这几个库迁移0.3.x时再打开
  testPathIgnorePatterns: [
    'packages/fund-charts',
    'packages/wealth-chart-components',
    'packages/tinker-components',
    'packages/storytelling',
  ],
  testRegex: '/test/.*\\.test\\.tsx?$',
  transform: {
    '\\.(less|css)$': 'jest-less-loader',
  },
};
