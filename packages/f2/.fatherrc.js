import { visualizer } from 'rollup-plugin-visualizer';
const isBundleVis = !!process.env.BUNDLE_VIS;

export default process.env.CI
  ? {}
  : {
      umd: {
        name: 'F2',
        file: 'index',
        minFile: true,
      },
      // entry: ['src/index.ts', 'src/jsx/jsx-runtime.ts'],
      entry: ['src/index.umd.ts'],
      overridesByEntry: {
        'src/index.umd.ts': {
          umd: { name: 'F2', file: 'index' },
        },
        // for weixin miniapp
        // 'src/jsx/jsx-runtime.ts': {
        //   umd: { name: 'F2JSXRuntime', file: 'jsx-runtime' },
        // },
      },
      extraRollupPlugins: [...(isBundleVis ? [visualizer()] : [])],
    };
