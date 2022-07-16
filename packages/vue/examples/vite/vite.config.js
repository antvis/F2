import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueJsx({
      // Clear [Vue warn]: resolveComponent can only be used in render() or setup().
      isCustomElement: (tagName) =>
        ['rect', 'line', 'text', 'circle', 'marker', 'group'].includes(tagName),
    }),
  ],
});
