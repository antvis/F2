/**
 * 动画获取以及注册机制
 * @author sima.zhang
 */
const Util = require('../util/common');
const defaultAnimationCfg = {
  appear: {
    duration: 450,
    easing: 'quadraticOut'
  }, // 初始入场动画配置
  update: {
    duration: 300,
    easing: 'quadraticOut'
  }, // 更新时发生变更的动画配置
  enter: {
    duration: 300,
    easing: 'quadraticOut'
  }, // 更新时新增元素的入场动画配置
  leave: {
    duration: 350,
    easing: 'quadraticIn'
  } // 更新时销毁动画配置
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
