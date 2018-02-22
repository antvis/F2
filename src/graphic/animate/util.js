const Util = require('../../util/common');

module.exports = {
  mix: Util.mix,
  plainArray(arr) {
    const result = [];
    for (let i = 0, len = arr.length; i < len; i++) {
      if (arr[i]) {
        result.push(arr[i].x);
        result.push(arr[i].y);
      }
    }
    return result;
  },
  requestAnimationFrame(fn) {
    const method = window.requestAnimationFrame || window.webkitRequestAnimationFrame || function(fn) {
      return setInterval(fn, 16);
    };

    return method(fn);
  },
  cancelAnimationFrame(id) {
    const method = window.cancelAnimationFrame || window.webkitCancelAnimationFrame || function(id) {
      return clearInterval(id);
    };
    return method(id);
  }
};
