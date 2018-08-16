/**
 * Animate configuration and register
 * @author sima.zhang1990@gmail.com
 */
const Util = require('../util/common');
const defaultAnimationCfg = {
  appear: {
    duration: 450,
    easing: 'quadraticOut'
  }, // 'appear' animation options
  update: {
    duration: 300,
    easing: 'quadraticOut'
  }, // 'update' animation options
  enter: {
    duration: 300,
    easing: 'quadraticOut'
  }, // 'enter' animation options
  leave: {
    duration: 350,
    easing: 'quadraticIn'
  } // 'leave' animation options
};

const Animate = {
  defaultCfg: {},
  Action: {},
  getAnimation(geomType, coord, animationType) {
    const geomAnimateCfg = this.defaultCfg[geomType];
    if (geomAnimateCfg) {
      const animation = geomAnimateCfg[animationType];
      if (Util.isFunction(animation)) {
        return animation(coord);
      }
    }
    return false;
  },
  getAnimateCfg(geomType, animationType) {
    const defaultCfg = defaultAnimationCfg[animationType];
    const geomConfig = this.defaultCfg[geomType];
    if (geomConfig && geomConfig.cfg && geomConfig.cfg[animationType]) {
      return Util.deepMix({}, defaultCfg, geomConfig.cfg[animationType]);
    }
    return defaultCfg;
  },
  registerAnimation(animationName, animationFun) {
    if (!this.Action) {
      this.Action = {};
    }
    this.Action[animationName] = animationFun;
  }
};

module.exports = Animate;
