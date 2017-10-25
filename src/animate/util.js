const Util = require('../util');

let U_ID = 0;
const HANDLERS = {};

// 缓动函数
const pow = Math.pow;
const math = Math;
const abs = Math.abs;
const easingEffects = {
  linear(n) {
    return n;
  },
  easeIn(n) {
    return pow(n, 1.7);
  },
  easeOut(n) {
    return pow(n, 0.48);
  },
  easeInOut(n) {
    const q = 0.48 - n / 1.04;
    const Q = math.sqrt(0.1734 + q * q);
    const x = Q - q;
    const X = pow(abs(x), 1 / 3) * (x < 0 ? -1 : 1);
    const y = -Q - q;
    const Y = pow(abs(y), 1 / 3) * (y < 0 ? -1 : 1);
    const t = X + Y + 0.5;
    return (1 - t) * 3 * t * t + t * t * t;
  },
  backIn(n) {
    const s = 1.70158;
    return n * n * ((s + 1) * n - s);
  },
  backOut(n) {
    n = n - 1;
    const s = 1.70158;
    return n * n * ((s + 1) * n + s) + 1;
  },
  elastic(n) {
    if (n === !!n) {
      return n;
    }
    return pow(2, -10 * n) * math.sin((n - 0.075) * (2 * Math.PI) / 0.3) + 1;
  },
  bounce(n) {
    const s = 7.5625;
    const p = 2.75;
    let l;
    if (n < (1 / p)) {
      l = s * n * n;
    } else {
      if (n < (2 / p)) {
        n -= (1.5 / p);
        l = s * n * n + 0.75;
      } else {
        if (n < (2.5 / p)) {
          n -= (2.25 / p);
          l = s * n * n + 0.9375;
        } else {
          n -= (2.625 / p);
          l = s * n * n + 0.984375;
        }
      }
    }
    return l;
  }
};

// 动画id
function guid() {
  return ++U_ID;
}


const AnimateUtil = {
  // 执行动画
  animateStep(fn, duration, easing, callback) {
    const baseTime = new Date().getTime();
    const uid = guid();

    function next(num, fun, dur, cb) {
      const nowTime = new Date().getTime();
      const durTime = nowTime - baseTime;
      if (durTime >= dur) {
        fun(1, num);
        cb && cb();
        return;
      }
      const effect = Util.isFunction(easing) ? easing : easingEffects[easing || 'linear'];
      const factor = effect(durTime / dur);
      fun(factor, num);
      HANDLERS[uid] = Util.requestAnimationFrame(function() {
        next(num + 1, fun, dur, cb);
      });
    }
    next(0, fn, duration, callback);
    return uid;
  },
  // 停止动画循环
  stopStep(uid) {
    if (HANDLERS[uid]) {
      Util.cancelAnimationFrame(HANDLERS[uid]);
      delete HANDLERS[uid];
    }
  }
};

module.exports = AnimateUtil;
