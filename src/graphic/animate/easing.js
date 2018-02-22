const Easing = {
  linear(k) {
    return k;
  },

  quadraticIn(k) {
    return k * k;
  },

  quadraticOut(k) {
    return k * (2 - k);
  },

  quadraticInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k;
    }
    return -0.5 * (--k * (k - 2) - 1);
  },

  cubicIn(k) {
    return k * k * k;
  },

  cubicOut(k) {
    return --k * k * k + 1;
  },

  cubicInOut(k) {
    if ((k *= 2) < 1) {
      return 0.5 * k * k * k;
    }
    return 0.5 * ((k -= 2) * k * k + 2);
  },

  elasticIn(k) {
    let s;
    let a = 0.1;
    let p = 0.4;
    if (k === 0) return 0;
    if (k === 1) return 1;
    if (!p) {
      p = 0.3;
    }
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(1 / a);
    }
    return -(a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
  },

  elasticOut(k) {
    let s;
    let a = 0.1;
    let p = 0.4;
    if (k === 0) return 0;
    if (k === 1) return 1;
    if (!p) {
      p = 0.3;
    }
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(1 / a);
    }
    return (a * Math.pow(2, -10 * k) * Math.sin((k - s) * (2 * Math.PI) / p) + 1);
  },

  elasticInOut(k) {
    let s;
    let a = 0.1;
    let p = 0.4;
    if (k === 0) return 0;
    if (k === 1) return 1;
    if (!p) {
      p = 0.3;
    }
    if (!a || a < 1) {
      a = 1;
      s = p / 4;
    } else {
      s = p / (2 * Math.PI) * Math.asin(1 / a);
    }
    if ((k *= 2) < 1) {
      return -0.5 * (a * Math.pow(2, 10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p));
    }
    return a * Math.pow(2, -10 * (k -= 1)) * Math.sin((k - s) * (2 * Math.PI) / p) * 0.5 + 1;
  },

  backIn(k) {
    const s = 1.70158;
    return k * k * ((s + 1) * k - s);
  },

  backOut(k) {
    const s = 1.70158;
    return (k = k - 1) * k * ((s + 1) * k + s) + 1;
  },

  backInOut(k) {
    const s = 1.70158 * 1.525;
    if ((k *= 2) < 1) {
      return 0.5 * (k * k * ((s + 1) * k - s));
    }
    return 0.5 * ((k -= 2) * k * ((s + 1) * k + s) + 2);
  },

  bounceIn(k) {
    return 1 - Easing.bounceOut(1 - k);
  },

  bounceOut(k) {
    if ((k /= 1) < (1 / 2.75)) {
      return 7.5625 * k * k;
    } else if (k < (2 / 2.75)) {
      return 7.5625 * (k -= (1.5 / 2.75)) * k + 0.75;
    } else if (k < (2.5 / 2.75)) {
      return 7.5625 * (k -= (2.25 / 2.75)) * k + 0.9375;
    }

    return 7.5625 * (k -= (2.625 / 2.75)) * k + 0.984375;
  },

  bounceInOut(k) {
    if (k < 0.5) {
      return Easing.bounceIn(k * 2) * 0.5;
    }
    return Easing.bounceOut(k * 2 - 1) * 0.5 + 0.5;
  }
};

module.exports = Easing;
