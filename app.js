App({
  onLaunch(options) {
    // 第一次打开
    // options.query == {number:1}
    console.log('App onLaunch');
    console.log('getSystemInfoSync', my.getSystemInfoSync());
    console.log('SDKVersion', my.SDKVersion);
  },
  onShow(options) {
    // 从后台被 scheme 重新打开
    // options.query == {number:1}
    console.log('App Show');
  },
});
