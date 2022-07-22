// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
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
});
