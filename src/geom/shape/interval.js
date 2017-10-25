/**
 * @fileOverview interval shapes
 * @author dxq613@gmail.com
 */


const Util = require('../../util');
const Shape = require('./shape');
const G = require('../../graphic/g');

// 获取柱状图的几个点
function getRectPoints(cfg) {
  const x = cfg.x;
  const y = cfg.y;
  const y0 = cfg.y0; // 0 点的位置
  const width = cfg.size;

  // 有3种情况，
  // 1. y，x都不是数组
  // 2. y是数组，x不是
  // 3. x是数组，y不是
  let ymin = y0;
  let ymax = y;
  if (Util.isArray(y)) {
    ymax = y[1];
    ymin = y[0];
  }

  let xmin;
  let xmax;
  if (Util.isArray(x)) {
    xmin = x[0];
    xmax = x[1];
  } else {
    xmin = x - width / 2;
    xmax = x + width / 2;
  }

  const points = [];

  points.push({
    x: xmin,
    y: ymin
  }, {
    x: xmin,
    y: ymax
  }, {
    x: xmax,
    y: ymax
  }, {
    x: xmax,
    y: ymin
  });

  return points;
}

const Interval = Shape.registerFactory('interval', {
  defaultShapeType: 'rect',
  getDefaultPoints(cfg) {
    return getRectPoints(cfg);
  }
});

Shape.registerShape('interval', 'rect', {
  draw(cfg, canvas) {
    const points = this.parsePoints(cfg.points);
    const style = Util.mix({
      fill: cfg.color,
      z: true // 需要闭合
    }, cfg.style);
    if (cfg.isInCircle) {
      let newPoints = points.slice(0);
      if (this._coord.transposed) {
        newPoints = [ points[0], points[3], points[2], points[1] ];
      }
      G.drawFan(newPoints, cfg.center, canvas, style);
    } else {
      G.drawRect(points, canvas, style);
    }
  }
});

module.exports = Interval;
