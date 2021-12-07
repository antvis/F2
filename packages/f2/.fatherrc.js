export default process.env.DEV ? {} : {
  umd: {
    name: 'F2',
    file: 'f2',
    minFile: true,
  },
};
