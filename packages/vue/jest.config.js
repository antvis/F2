// eslint-disable-next-line @typescript-eslint/no-var-requires
const config = require('../../jest.config');

module.exports = {
  ...config,
  testPathIgnorePatterns: [],
  setupFilesAfterEnv: ['../../jest-setup.js'],
  transform: {
    '^.+\\.(ts|tsx)$': [
      'babel-jest',
      {
        presets: [
          ['@babel/preset-env', { targets: { node: 'current' } }],
          ['@babel/preset-typescript', { allExtensions: true, isTSX: true }],
        ],
        plugins: ['@vue/babel-plugin-jsx'],
      },
    ],
  },
};
