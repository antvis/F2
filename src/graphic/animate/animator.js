const Easing = require('./easing');
const { interpolate, interpolateArray } = require('d3-interpolate');

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

class Animator {
  constructor(shape, source, timeline) {
    this.startTime = 0;
    this.endTime = 0;
    this.time = 0;
    this.propertyAnims = [];
    this.hasStarted = false;
    this.hasEnded = false;

    this.shape = shape;
    this.source = source;
    this.timeline = timeline;
    this.animGroups = [];
  }

  // delay, attrs, duration, easing
  to(cfg = {}) {
    const delay = cfg.delay || 0;
    const attrs = cfg.attrs || {};
    const duration = cfg.duration || 1000;
    const easing = Easing[cfg.easing] || Easing.linear;
    const animGroup = [];

    for (const attrName in attrs) {
      const animInfo = {
        shape: this.shape, // Shape 对象
        key: attrName,
        startValue: this.source[attrName],
        endValue: attrs[attrName],
        startTime: this.timeline.time + delay + this.endTime,
        endTime: this.timeline.time + delay + this.endTime + duration,
        easing
      };

      let diff;
      let startValue = this.source[attrName];
      let endValue = attrs[attrName];
      if (attrName === 'points') {
        startValue = plainArray(startValue);
        endValue = plainArray(endValue);
        diff = interpolateArray(startValue, endValue);
        animInfo.startValue = startValue;
        animInfo.endValue = endValue;
      } else if (attrName === 'matrix') {
        diff = interpolateArray(startValue, endValue);
      } else {
        diff = interpolate(startValue, endValue);
      }
      animInfo.diff = diff;
      this.timeline.anims.push(animInfo);
      animGroup.push(animInfo);
    }
    this.animGroups.push(animGroup);
    this.endTime += delay + duration;
    return this;
  }

  onStart(callback) {
    const currentAnimGroup = this.animGroups[this.animGroups.length - 1];
    if (!currentAnimGroup) return;

    let called = false;

    currentAnimGroup.forEach(function(anim) {
      anim.onStart = function() {
        if (!called) {
          called = true;
          callback();
        }
      };
    });

    return this;
  }

  onUpdate(callback) {
    this.onUpdateCallback = function() {
      callback();
    };
    return this;
  }

  onEnd(callback) {
    const currentAnimGroup = this.animGroups[this.animGroups.length - 1];
    if (!currentAnimGroup) return;

    let called = false;

    currentAnimGroup.forEach(function(anim) {
      anim.onEnd = function() {
        if (!called) {
          called = true;
          callback();
        }
      };
    });

    return this;
  }
}

module.exports = Animator;
