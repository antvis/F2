module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.compilerOptions = {
          // Clear [Vue warn]: Failed to resolve component: group.
          isCustomElement: (tagName) =>
            ['group'].includes(tagName),
        };
        return options;
      })
      .end();
  },
};
