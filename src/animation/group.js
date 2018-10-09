/**
 * Group animation
 * @author sima.zhang1990@gmail.com
 */
const Util = require('../util/common');

const Shape = require('../graphic/shape');
const Timeline = require('../graphic/animate/timeline');
const Animator = require('../graphic/animate/animator');

let timeline;
Shape.prototype.animate = function() {
  const attrs = Util.mix({}, this.get('attrs'));
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
    if (coord.isPolar) {
      result = Action.groupScaleInXY;
      if (coord.transposed) {
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
        if (Util.isFunction(animate)) {
          animate(container, animateCfg);
        } else if (Animate.defaultCfg[type]) {
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
