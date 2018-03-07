const Easing = require('./easing');

function plainArray(arr) {
  const result = [];
  for (let i = 0, len = arr.length; i < len; i++) {
    if (arr[i]) {
      result.push(arr[i].x);
      result.push(arr[i].y);
    }
  }
  return result;
}

function interpolateNumber(a, b) {
  a = +a;
  b -= a;
  return function(t) {
    return a + b * t;
  };
}

function interpolateArray(a, b) {
  const nb = b ? b.length : 0;
  const na = a ? Math.min(nb, a.length) : 0;
  const x = new Array(na);
  const c = new Array(nb);
  let i;

  for (i = 0; i < na; ++i) x[i] = interpolateNumber(a[i], b[i]);
  for (; i < nb; ++i) c[i] = b[i];

  return function(t) {
    for (i = 0; i < na; ++i) c[i] = x[i](t);
    return c;
  };
}

class Animator {
  constructor(shape, source, timeline) {
    this.startTime = 0;
    this.endTime = 0;
    this.time = 0;
    this.hasStarted = false;
    this.hasEnded = false;

    this.shape = shape;
    this.source = source;
    this.timeline = timeline;
    this.animGroup = [];
  }

  // delay, attrs, duration, easing
  to(cfg = {}) {
    const delay = cfg.delay || 0;
    const attrs = cfg.attrs || {};
    const duration = cfg.duration || 1000;
    const easing = Easing[cfg.easing] || Easing.linear;

    const animInfo = {
      shape: this.shape,
      startTime: this.timeline.time + delay + this.endTime,
      endTime: this.timeline.time + delay + this.endTime + duration,
      easing,
      parent: this
    };
    const interpolate = {}; // 差值函数
    for (const attrName in attrs) {
      let startValue = this.source[attrName];
      let endValue = attrs[attrName];
      if (attrName === 'points') {
        startValue = plainArray(startValue);
        endValue = plainArray(endValue);
        interpolate.points = interpolateArray(startValue, endValue);
        this.source.points = startValue;
        attrs.points = endValue;
      } else if (attrName === 'matrix') {
        interpolate.matrix = interpolateArray(startValue, endValue);
      } else {
        interpolate[attrName] = interpolateNumber(startValue, endValue);
      }
    }
    animInfo.interpolate = interpolate;
    animInfo.startState = this.source;
    animInfo.endState = attrs;

    this.animGroup.push(animInfo);
    this.timeline.anims.push(animInfo);

    this.endTime += delay + duration;
    return this;
  }

  onStart(callback) {
    const currentAnim = this.animGroup[this.animGroup.length - 1]; // 获取当前的动画
    if (!currentAnim) return;

    currentAnim.onStart = function() {
      callback();
    };

    return this;
  }

  onUpdate(callback) {
    this.onUpdateCallback = function() {
      callback();
    };
    return this;
  }

  onEnd(callback) {
    const currentAnim = this.animGroup[this.animGroup.length - 1]; // 获取当前的动画
    if (!currentAnim) return;

    currentAnim.onEnd = function() {
      callback();
    };

    return this;
  }
}

module.exports = Animator;
