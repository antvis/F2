const Util = require('../../util/common');
const Shape = require('./shape');

function getRectPoints(cfg) {
  const { x, y, y0, size } = cfg;

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
    xmin = x - size / 2;
    xmax = x + size / 2;
  }

  return [
    { x: xmin, y: ymin },
    { x: xmin, y: ymax },
    { x: xmax, y: ymax },
    { x: xmax, y: ymin }
  ];
}

function getRectRange(points) {
  const xValues = [];
  const yValues = [];
  for (let i = 0; i < points.length; i++) {
    const point = points[i];
    xValues.push(point.x);
    yValues.push(point.y);
  }
  const xMin = Math.min.apply(null, xValues);
  const yMin = Math.min.apply(null, yValues);
  const xMax = Math.max.apply(null, xValues);
  const yMax = Math.max.apply(null, yValues);

  return {
    x: xMin,
    y: yMin,
    width: xMax - xMin,
    height: yMax - yMin
  };
}

const Interval = Shape.registerFactory('interval', {
  defaultShapeType: 'rect',
  getDefaultPoints(cfg) {
    return getRectPoints(cfg);
  }
});

Shape.registerShape('interval', 'rect', {
  draw(cfg, container) {
    const points = this.parsePoints(cfg.points);
    const style = Util.mix({
      fill: cfg.color
    }, cfg.style);
    if (cfg.isInCircle) {
      let newPoints = points.slice(0);
      if (this._coord.transposed) {
        newPoints = [ points[0], points[3], points[2], points[1] ];
      }

      container.addShape('Fan', {
        className: 'interval',
        attrs: Util.mix({
          points: newPoints,
          cx: cfg.center.x,
          cy: cfg.center.y
        }, style)
      });
    } else {
      const rectCfg = getRectRange(points);

      container.addShape('rect', {
        className: 'interval',
        attrs: Util.mix(rectCfg, style)
      });
    }
  }
});

module.exports = Interval;
