/**
 * 动画工具
 */
const { Shape, Matrix } = require('../graphic/index');
const Util = require('../util/common');

const Helpers = {
  getCoordInfo(coord) {
    const start = coord.start;
    const end = coord.end;
    return {
      start,
      end,
      width: end.x - start.x,
      height: Math.abs(end.y - start.y)
    };
  },
  getScaledMatrix(shape, v, direct) {
    let scaledMatrix;

    shape.apply(v); // shape 原先可能做了变化
    const x = v[0];
    const y = v[1];

    if (direct === 'x') {
      shape.transform([
        [ 't', x, y ],
        [ 's', 0.01, 1 ],
        [ 't', -x, -y ]
      ]);
      const matrix = shape.getMatrix();
      scaledMatrix = Matrix.transform(matrix, [
        [ 't', x, y ],
        [ 's', 100, 1 ],
        [ 't', -x, -y ]
      ]);
    } else if (direct === 'y') {
      shape.transform([
        [ 't', x, y ],
        [ 's', 1, 0.01 ],
        [ 't', -x, -y ]
      ]);
      const matrix = shape.getMatrix();
      scaledMatrix = Matrix.transform(matrix, [
        [ 't', x, y ],
        [ 's', 1, 100 ],
        [ 't', -x, -y ]
      ]);
    } else if (direct === 'xy') {
      shape.transform([
        [ 't', x, y ],
        [ 's', 0.01, 0.01 ],
        [ 't', -x, -y ]
      ]);
      const matrix = shape.getMatrix();
      scaledMatrix = Matrix.transform(matrix, [
        [ 't', x, y ],
        [ 's', 100, 100 ],
        [ 't', -x, -y ]
      ]);
    }
    return scaledMatrix;
  },
  getClip(coord) {
    const { start, end, width, height } = Helpers.getCoordInfo(coord);
    const margin = 200;
    let clip;

    if (coord.isPolar) {
      const { circleRadius, center, startAngle, endAngle } = coord;
      clip = new Shape.Sector({
        attrs: {
          x: center.x,
          y: center.y,
          r: circleRadius + margin,
          r0: 0,
          startAngle,
          endAngle: startAngle
        }
      });
      clip.endState = {
        endAngle
      };
    } else {
      clip = new Shape.Rect({
        attrs: {
          x: start.x - margin,
          y: end.y - margin,
          width: coord.isTransposed ? width + margin * 2 : 0,
          height: coord.isTransposed ? 0 : height + margin * 2
        }
      });

      if (coord.isTransposed) {
        clip.endState = {
          height: height + margin * 2
        };
      } else {
        clip.endState = {
          width: width + margin * 2
        };
      }
    }
    clip.isClip = true;
    return clip;
  },
  getAnimateParam(animateCfg, index, id) {
    const result = {};
    if (animateCfg.delay) {
      result.delay = Util.isFunction(animateCfg.delay) ? animateCfg.delay(index, id) : animateCfg.delay;
    }
    result.easing = animateCfg.easing;
    result.duration = animateCfg.duration;
    result.delay = animateCfg.delay;
    // result.onStart = animateCfg.onStart;
    // result.onUpdate = animateCfg.onUpdate;
    // result.onEnd = animateCfg.onEnd;
    return result;
  },
  doAnimation(shape, endState, animateCfg, callback) {
    const id = shape._id;
    const index = shape.get('index');
    const { easing, delay, duration } = Helpers.getAnimateParam(animateCfg, index, id);
    const anim = shape.animate().to({
      attrs: endState,
      duration,
      delay,
      easing
    });

    if (callback) {
      anim.onEnd(() => {
        callback();
      });
    }
  }
};

module.exports = Helpers;
