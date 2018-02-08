const Util = require('../../util/common');
const Shape = require('./shape');
const ShapeUtil = require('./util');
const Global = require('../../global');

// regist line geom
const Line = Shape.registerFactory('line', {
  defaultShapeType: 'line'
});

function getStyle(cfg) {
  const style = {
    strokeStyle: cfg.color
  };
  if (cfg.size >= 0) {
    style.lineWidth = cfg.size;
  }
  Util.mix(style, cfg.style);

  return Util.mix({}, Global.shape.line, style);
}

function drawLines(cfg, container, style, smooth) {
  const points = cfg.points;
  if (points.length && Util.isArray(points[0].y)) {
    const topPoints = [];
    const bottomPoints = [];
    for (let i = 0, len = points.length; i < len; i++) {
      const point = points[i];
      const tmp = ShapeUtil.splitPoints(point);
      bottomPoints.push(tmp[0]);
      topPoints.push(tmp[1]);
    }
    if (cfg.isInCircle) {
      topPoints.push(topPoints[0]);
      bottomPoints.push(bottomPoints[0]);
    }
    if (cfg.isStack) {
      container.addShape('Polyline', {
        className: 'line',
        attrs: Util.mix({
          points: topPoints,
          smooth
        }, style)
      });
    } else {
      container.addShape('Polyline', {
        className: 'line',
        attrs: Util.mix({
          points: topPoints,
          smooth
        }, style)
      });
      container.addShape('Polyline', {
        className: 'line',
        attrs: Util.mix({
          points: bottomPoints,
          smooth
        }, style)
      });
    }
  } else {
    if (cfg.isInCircle) {
      points.push(points[0]);
    }
    container.addShape('Polyline', {
      className: 'line',
      attrs: Util.mix({
        points,
        smooth
      }, style)
    });
  }
}

// draw line shape
Shape.registerShape('line', 'line', {
  draw(cfg, container) {
    const style = getStyle(cfg);
    drawLines(cfg, container, style);
  }
});

// draw smooth line shape
Shape.registerShape('line', 'smooth', {
  draw(cfg, container) {
    const style = getStyle(cfg);
    drawLines(cfg, container, style, true);
  }
});

// draw dash line shape
Shape.registerShape('line', 'dash', {
  draw(cfg, container) {
    const style = getStyle(cfg);
    style.lineDash = Global.lineDash;
    drawLines(cfg, container, style);
  }
});

module.exports = Line;
