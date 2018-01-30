/**
 * @fileOverview point shape
 * @author dxq613@gmail.com
 */


const Util = require('../../util');
const Shape = require('./shape');
const ShapeUtil = require('./util');

const G = require('../../graphic/g');
const DEFAULT_SIZE = 4; // 线的默认宽度
const Global = require('../../global');

// regist line geom
const Line = Shape.registerFactory('line', {
  defaultShapeType: 'line'
});

function getStyle(cfg) {
  const style = Util.mix({
    strokeStyle: cfg.color,
    lineWidth: cfg.size || DEFAULT_SIZE,
    z: cfg.isInCircle
  }, cfg.style);
  return style;
}

function drawLines(cfg, canvas, style, isSmooth) {
  const points = cfg.points;
  const method = isSmooth ? 'drawSmooth' : 'drawLines';
  if (points.length && Util.isArray(points[0].y)) {
    const topPoints = [];
    const bottomPoints = [];
    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      const tmp = ShapeUtil.splitPoints(point);
      bottomPoints.push(tmp[0]);
      topPoints.push(tmp[1]);
    }
    if (cfg.isStack) {
      G[method](topPoints, canvas, style);
    } else {
      G[method](topPoints, canvas, style);
      G[method](bottomPoints, canvas, style);
    }
  } else {
    G[method](points, canvas, style);
  }
}

// draw line shape
Shape.registerShape('line', 'line', {
  draw(cfg, canvas) {
    const style = getStyle(cfg);
    drawLines(cfg, canvas, style);
  }
});

// draw smooth line shape
Shape.registerShape('line', 'smooth', {
  draw(cfg, canvas) {
    const style = getStyle(cfg);
    drawLines(cfg, canvas, style, true);
  }
});

// draw dash line shape
Shape.registerShape('line', 'dash', {
  draw(cfg, canvas) {
    const style = getStyle(cfg);
    style.lineDash = Global.lineDash;
    drawLines(cfg, canvas, style);
  }
});

module.exports = Line;
