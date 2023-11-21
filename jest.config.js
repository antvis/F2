module.exports = {
  runner: 'jest-electron/runner',
  testEnvironment: 'jest-electron/environment',
  preset: 'ts-jest/presets/js-with-ts',
  collectCoverage: false,
  collectCoverageFrom: [
    'packages/*/src/**/*.{ts,tsx,js}',
    '!**/node_modules/**',
    '!packages/*/src/deps/**/*.{ts,tsx,js}',
  ],
  modulePathIgnorePatterns: ['packages/*/dist'],
  moduleFileExtensions: ['tsx', 'ts', 'js', 'jsx', 'json'],
  testPathIgnorePatterns: [],
  testRegex: '/test/.*\\.test\\.tsx?$',
  setupFilesAfterEnv: ['<rootDir>/jest-setup.js'],
  testTimeout: 10000,
  transform: {
    '^.+\\.[tj]s$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      tsConfig: {
        allowJs: true,
        target: 'ES2019',
      },
    },
  },
};
