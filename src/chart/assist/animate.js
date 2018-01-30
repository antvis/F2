/**
 * @fileOverview animate assist to g2-mobile
 * @ignore
 */


const Util = require('../../util');
const Global = require('../../global');
const Animate = require('../../animate/index');

class AnimateAssist {
  constructor(cfg) {
    this.animate = false;
    Util.mix(this, cfg);
  }

  setOptions(options) {
    this.options = options;
    if (this.animate) {
      Util.mix(this.animate, options);
    }
  }

  setAnimate(cfg) {
    // 停止之前的动画
    if (this.animate) {
      this.animate.stop();
    }
    if (cfg === false) {
      this.animate = false;
    } else {
      const type = cfg.type;
      const animateName = Util.upperFirst(type);
      const animate = new Animate[animateName](cfg);
      Util.mix(animate, this.options);
      this.animate = animate;
    }
  }

  setCallBack(callback) {
    const success = this.animate.success;
    let cb = null;
    if (Util.isFunction(success)) {
      cb = function() {
        callback();
        success();
      };
    } else {
      cb = callback;
    }

    this.animate.success = cb;
  }

  paint(canvas) {
    const animate = this.animate;
    animate.cycle = Global.animateReduceMultiple;
    animate.paint(canvas);
  }

  stop() {
    const animate = this.animate;
    animate && animate.stop && animate.stop();
  }

  // 停止正在运行的动画
  clear() {
    this.stop();
    this.animate = null;
  }
}

module.exports = AnimateAssist;
