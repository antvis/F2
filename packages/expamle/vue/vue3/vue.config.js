module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('F2')
      .test(/\.jsx$/)
      .use('babel')
      .loader('babel-loader')
      .options({
        plugins: [
          [
            '@babel/plugin-transform-react-jsx',
            {
              runtime: 'automatic',
              importSource: '@antv/f2',
            },
          ],
        ],
      })
      .end();
  },
};
