export default process.env.CI
  ? {}
  : {
      umd: {
        name: 'F2',
        file: 'index',
        minFile: true,
      },
      entry: ['src/index.ts', 'src/jsx/jsx-runtime.ts'],
      overridesByEntry: {
        'src/index.ts': {
          umd: { name: 'F2', file: 'index' },
        },
        // for weixin miniapp
        'src/jsx/jsx-runtime.ts': {
          umd: { name: 'F2JSXRuntime', file: 'jsx-runtime' },
        },
      },
    };
