/**
 * @fileOverview track f2
 * @author sima.zhang1990@gmail.com
 */
const Global = require('./global');
const Util = require('./util/common');
const SERVER_URL = 'https://kcart.alipay.com/web/bi.do';

setTimeout(function() {
  if (Global.trackable && Util.isBrowser) { // Only works for H5 env
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
