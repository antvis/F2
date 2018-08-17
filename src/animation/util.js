/**
 * Utility
 * @author sima.zhang1990@gmail.com
 */
const { Matrix } = require('../graphic/index');
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

    shape.apply(v);
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
  getAnimateParam(animateCfg, index, id) {
    const result = {};
    if (animateCfg.delay) {
      result.delay = Util.isFunction(animateCfg.delay) ? animateCfg.delay(index, id) : animateCfg.delay;
    }
    result.easing = animateCfg.easing;
    result.duration = animateCfg.duration;
    result.delay = animateCfg.delay;
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
