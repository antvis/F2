/**
 * 整体动画版本
 * @author sima.zhang
 */
const Util = require('../util/common');

const Shape = require('../graphic/shape');
const Timeline = require('../graphic/animate/timeline');
const Animator = require('../graphic/animate/animator');

let timeline;
Shape.prototype.animate = function() {
  const attrs = this.get('attrs');
  return new Animator(this, attrs, timeline);
};

const Animate = require('./animate');
const Action = require('./group-action');
Animate.Action = Action;
Animate.defaultCfg = {
  line(coord) {
    if (coord.isPolar) {
      return Action.groupScaleInXY;
    }
    return Action.groupWaveIn;
  },
  area(coord) {
    if (coord.isPolar) {
      return Action.groupScaleInXY;
    }
    return Action.groupWaveIn;
  },
  path(coord) {
    if (coord.isPolar) {
      return Action.groupScaleInXY;
    }
    return Action.groupWaveIn;
  },
  point() {
    return Action.shapesScaleInXY;
  },
  interval(coord) {
    let result;
    if (coord.isPolar) { // 极坐标
      result = Action.groupScaleInXY; // 南丁格尔玫瑰图
      if (coord.transposed) { // 饼图
        result = Action.groupWaveIn;
      }
    } else {
      result = coord.transposed ? Action.groupScaleInX : Action.groupScaleInY;
    }
    return result;
  },
  schema() {
    return Action.groupWaveIn;
  }
};

function getAnimate(geomType, coord, animationName) {
  let result;
  if (animationName) {
    result = Animate.Action[animationName];
  } else {
    result = Animate.getAnimation(geomType, coord, 'appear');
  }
  return result;
}

function getAnimateCfg(geomType, animateCfg) {
  const defaultCfg = Animate.getAnimateCfg(geomType, 'appear');
  if (animateCfg && animateCfg.appear) {
    return Util.deepMix({}, defaultCfg, animateCfg.appear);
  }
  return defaultCfg;
}

module.exports = {
  afterCanvasInit(/* chart */) {
    timeline = new Timeline();
    timeline.play();
  },
  beforeCanvasDraw(chart) {
    if (chart.get('animate') === false) {
      return;
    }
    const geoms = chart.get('geoms');
    const coord = chart.get('coord');
    let animateCfg;
    let animate;

    Util.each(geoms, geom => {
      const type = geom.get('type');
      const container = geom.get('container');
      if (geom.get('animateCfg') !== false) {
        animateCfg = getAnimateCfg(type, geom.get('animateCfg'));
        animate = getAnimate(type, coord, animateCfg.animation);
        if (Util.isFunction(animate)) { // 用户指定了动画类型
          animate(container, animateCfg);
        } else if (Animate.defaultCfg[type]) { // 默认进行整体动画
          animate = Animate.defaultCfg[type](coord);
          const yScale = geom.getYScale();
          const zeroY = coord.convertPoint({
            x: 0,
            y: yScale.scale(geom.getYMinValue())
          });

          animate && animate(container, animateCfg, coord, zeroY);
        }
      }
    });
  },
  afterCanvasDestroyed(/* chart */) {
    timeline.stop();
  }
};
