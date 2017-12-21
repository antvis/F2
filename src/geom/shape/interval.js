// done
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
      let x = points[1].x;
      let y = points[1].y;
      let width = Math.abs(points[2].x - points[1].x);
      let height = Math.abs(points[0].y - points[1].y);
      if (this._coord.transposed) {
        x = points[3].x;
        y = points[3].y;
        width = Math.abs(points[1].x - points[0].x);
        height = Math.abs(points[2].y - points[1].y);
      }
      container.addShape('rect', {
        className: 'interval',
        attrs: Util.mix({
          x,
          y,
          width,
          height
        }, style)
      });
    }
  }
});

module.exports = Interval;
