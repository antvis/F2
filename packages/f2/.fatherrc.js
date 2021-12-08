export default process.env.CI
  ? {}
  : {
      umd: {
        name: 'F2',
        file: 'f2',
        minFile: true,
      },
    };
