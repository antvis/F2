App({
  onLaunch(_options) {
    // 第一次打开
    // options.query == {number:1}
    console.info('App onLaunch');
  },
  onShow(_options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
  },
});
