// only for jest
module.exports = {
  env: {
    test: {
      presets: [
        ['@babel/preset-env', {
          targets: {
            node: 'current'
          }
        }],
        '@babel/preset-typescript'
      ],
      plugins: [
        ['@babel/plugin-transform-react-jsx', {
          "runtime": "automatic"
        }]
      ]
    },
  }
};
