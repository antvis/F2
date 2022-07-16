// eslint-disable-next-line @typescript-eslint/no-var-requires
const { defineConfig } = require('@vue/cli-service');

module.exports = defineConfig({
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        options.compilerOptions = {
          // Clear [Vue warn]: resolveComponent can only be used in render() or setup().
          isCustomElement: (tagName) =>
            ['rect', 'line', 'text', 'circle', 'marker', 'group'].includes(tagName),
        };
        return options;
      })
      .end();
  },
});
