module.exports = {
  env: {
    // for jest
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
        ['@babel/plugin-transform-react-jsx']
      ]
    },
  }
};
