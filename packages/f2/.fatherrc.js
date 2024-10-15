import { visualizer } from 'rollup-plugin-visualizer';
const isBundleVis = !!process.env.BUNDLE_VIS;

export default process.env.CI && process.env.CI === 'true'
  ? {}
  : {
      umd: {
        name: 'F2',
        file: 'index',
        minFile: true,
      },
      // entry: ['src/index.ts', 'src/jsx/jsx-runtime.ts'],
      entry: ['src/index.ts'],
      overridesByEntry: {
        'src/index.ts': {
          umd: { name: 'F2', file: 'index' },
        },
        // for weixin miniapp
        // 'src/jsx/jsx-runtime.ts': {
        //   umd: { name: 'F2JSXRuntime', file: 'jsx-runtime' },
        // },
      },
   
      typescriptOpts: {
        tsconfigOverride: {
          compilerOptions: {
            target: 'es5',
          },
        },
      },
      extraBabelPlugins: [[
        "search-and-replace",
        {
          "rules": [
            {
              "search": "VERSION",
              "searchTemplateStrings": true,
              "replace": require('../../lerna.json').version
            }
          ]
        }
      ]],
      extraRollupPlugins: [...(isBundleVis ? [visualizer()] : [])],
    };
