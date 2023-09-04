module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('F2')
      .test((path) => {
        // Only transform FEngine JSX in .jsx files.
        return /\.jsx$/.test(path) && !/\.vue\.jsx$/.test(path);
      })
      .use('babel')
      .loader('babel-loader')
      .options({
        plugins: [
          [
            '@babel/plugin-transform-react-jsx',
            {
              runtime: 'automatic',
              importSource: '@antv/f-engine',
            },
          ],
        ],
      })
      .end();
  },
};
