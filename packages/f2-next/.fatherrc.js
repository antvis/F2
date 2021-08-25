export default {
  extraBabelPlugins: [
    ['module-resolver', {
      alias: {
        '@jsx': './src/jsx',
        '@util': './src/util',
        '@components': './src/components',
        '@attr': './src/attr',
      } 
    }]
  ],
  // umd: {
  //   globals: {
  //     'react': 'React'
  //   }
  // },
};
