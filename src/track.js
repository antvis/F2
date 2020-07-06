/**
 * @fileOverview track f2
 * @author sima.zhang1990@gmail.com
 */
import Global from './global';
import { isBrowser } from './util/common';
const SERVER_URL = 'https://kcart.alipay.com/web/bi.do';

setTimeout(function() {
  if (Global.trackable && isBrowser) { // Only works for H5 env
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
