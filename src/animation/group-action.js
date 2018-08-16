/**
 * Group animate functions
 * @author sima.zhang1990@gmail.com
 */
const Util = require('./util');
const Helper = require('../util/helper');
const { Shape } = require('../graphic/index');

function _groupScaleIn(container, animateCfg, coord, zeroY, type) {
  const { start, end, width, height } = Util.getCoordInfo(coord);
  let x;
  let y;

  const clip = new Shape.Rect({
    attrs: {
      x: start.x,
      y: end.y,
      width,
      height
    }
  });

  if (type === 'y') {
    x = start.x + width / 2;
    y = zeroY.y < start.y ? zeroY.y : start.y;
  } else if (type === 'x') {
    x = zeroY.x > start.x ? zeroY.x : start.x;
    y = start.y + height / 2;
  } else if (type === 'xy') {
    if (coord.isPolar) {
      x = coord.center.x;
      y = coord.center.y;
    } else {
      x = (start.x + end.x) / 2;
      y = (start.y + end.y) / 2;
    }
  }

  const endMatrix = Util.getScaledMatrix(clip, [ x, y ], type);
  clip.isClip = true;
  clip.endState = {
    matrix: endMatrix
  };

  clip.set('canvas', container.get('canvas'));
  container.attr('clip', clip);
  const onEnd = function() {
    container.attr('clip', null);
    clip.remove(true);
  };
  Util.doAnimation(clip, clip.endState, animateCfg, onEnd);
}

function _shapeScale(container, animateCfg, type) {
  const shapes = container.get('children');
  let x;
  let y;
  let endMatrix;

  for (let i = 0, len = shapes.length; i < len; i++) {
    const shape = shapes[i];
    const box = shape.getBBox();
    x = (box.minX + box.maxX) / 2;
    y = (box.minY + box.maxY) / 2;
    endMatrix = Util.getScaledMatrix(shape, [ x, y ], type);
    Util.doAnimation(shape, { matrix: endMatrix }, animateCfg);
  }
}

function groupScaleInX(container, animateCfg, coord, zeroY) {
  _groupScaleIn(container, animateCfg, coord, zeroY, 'x');
}

function groupScaleInY(container, animateCfg, coord, zeroY) {
  _groupScaleIn(container, animateCfg, coord, zeroY, 'y');
}

function groupScaleInXY(container, animateCfg, coord, zeroY) {
  _groupScaleIn(container, animateCfg, coord, zeroY, 'xy');
}

function shapesScaleInX(container, animateCfg) {
  _shapeScale(container, animateCfg, 'x');
}

function shapesScaleInY(container, animateCfg) {
  _shapeScale(container, animateCfg, 'y');
}

function shapesScaleInXY(container, animateCfg) {
  _shapeScale(container, animateCfg, 'xy');
}

function groupWaveIn(container, animateCfg, coord) {
  const clip = Helper.getClip(coord);
  clip.set('canvas', container.get('canvas'));
  container.attr('clip', clip);
  const onEnd = function() {
    container.attr('clip', null);
    clip.remove(true);
  };
  const endState = {};
  if (coord.isPolar) {
    const { startAngle, endAngle } = coord;
    endState.endAngle = endAngle;
    clip.attr('endAngle', startAngle);
  } else {
    const { start, end } = coord;
    const width = Math.abs(start.x - end.x);
    const height = Math.abs(start.y - end.y);
    if (coord.isTransposed) {
      clip.attr('height', 0);
      endState.height = height;
    } else {
      clip.attr('width', 0);
      endState.width = width;
    }
  }
  Util.doAnimation(clip, endState, animateCfg, onEnd);
}

module.exports = {
  groupWaveIn,
  groupScaleInX,
  groupScaleInY,
  groupScaleInXY,
  shapesScaleInX,
  shapesScaleInY,
  shapesScaleInXY
};
