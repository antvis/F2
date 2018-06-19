/**
 * @fileOverview track f2
 * @author sima.zhang1990@gmail.com
 */
const Global = require('./global');
const Util = require('./util/common');
const SERVER_URL = 'https://kcart.alipay.com/web/bi.do';

// 延迟发送请求
setTimeout(function() {
  if (Global.trackable && Util.isBrowser) { // 只对 h5 环境下进行统计
    const image = new Image();
    const newObj = {
      pg: document.URL,
      r: new Date().getTime(),
      f2: true,
      version: Global.version,
      page_type: 'syslog'
    };
    const d = encodeURIComponent(JSON.stringify([ newObj ]));
    image.src = `${SERVER_URL}?BIProfile=merge&d=${d}`;
  }
}, 3000);
