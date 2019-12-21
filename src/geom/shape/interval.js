const Util = require('../../util/common');
const Shape = require('./shape');
const Vector2 = require('../../graphic/util/vector2');
const Global = require('../../global');

function getRectPoints(cfg) {
  const { x, y, y0, size } = cfg;

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
  for (let i = 0, len = points.length; i < len; i++) {
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

function getMiddlePoint(a, b) {
  const x = (a.x - b.x) / 2 + b.x;
  const y = (a.y - b.y) / 2 + b.y;
  return { x, y };
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
    }, Global.shape.interval, cfg.style);
    if (cfg.isInCircle) {
      let newPoints = points.slice(0);
      if (this._coord.transposed) {
        newPoints = [ points[0], points[3], points[2], points[1] ];
      }

      const { x, y } = cfg.center;
      const v = [ 1, 0 ];
      const v0 = [ newPoints[0].x - x, newPoints[0].y - y ];
      const v1 = [ newPoints[1].x - x, newPoints[1].y - y ];
      const v2 = [ newPoints[2].x - x, newPoints[2].y - y ];

      let startAngle = Vector2.angleTo(v, v1);
      let endAngle = Vector2.angleTo(v, v2);
      const r0 = Vector2.length(v0);
      const r = Vector2.length(v1);

      if (startAngle >= 1.5 * Math.PI) {
        startAngle = startAngle - 2 * Math.PI;
      }

      if (endAngle >= 1.5 * Math.PI) {
        endAngle = endAngle - 2 * Math.PI;
      }

      return container.addShape('Sector', {
        className: 'interval',
        attrs: Util.mix({
          x,
          y,
          r,
          r0,
          startAngle,
          endAngle
        }, style)
      });
    }

    const rectCfg = getRectRange(points);

    return container.addShape('rect', {
      className: 'interval',
      attrs: Util.mix(rectCfg, style)
    });
  }
});

// 金字塔 和 漏斗图
[ 'pyramid', 'funnel' ].forEach(shapeType => {
  Shape.registerShape('interval', shapeType, {
    getPoints(cfg) {
      cfg.size = cfg.size * 2; // 漏斗图的 size 是柱状图的两倍
      return getRectPoints(cfg);
    },
    draw(cfg, container) {
      const points = this.parsePoints(cfg.points);
      const nextPoints = this.parsePoints(cfg.nextPoints);

      let polygonPoints = null;
      if (nextPoints) {
        polygonPoints = [ points[0], points[1], nextPoints[1], nextPoints[0] ];
      } else {
        polygonPoints = [
          points[0],
          points[1]
        ];
        // pyramid 顶部是三角形，所以取中心点就好了，funnel顶部是长方形
        if (shapeType === 'pyramid') {
          polygonPoints.push(getMiddlePoint(points[2], points[3]));
        } else {
          polygonPoints.push(points[2], points[3]);
        }
      }

      const attrs = Util.mix({
        fill: cfg.color,
        points: polygonPoints
      }, Global.shape.interval, cfg.style);

      return container.addShape('polygon', {
        className: 'interval',
        attrs
      });
    }
  });
});

module.exports = Interval;
