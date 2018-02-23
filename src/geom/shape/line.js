const Util = require('../../util/common');
const Shape = require('./shape');
const ShapeUtil = require('./util');
const Global = require('../../global');

// register line geom
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
      return container.addShape('Polyline', {
        className: 'line',
        attrs: Util.mix({
          points: topPoints,
          smooth
        }, style)
      });
    }
    const topShape = container.addShape('Polyline', {
      className: 'line',
      attrs: Util.mix({
        points: topPoints,
        smooth
      }, style)
    });
    const bottomShape = container.addShape('Polyline', {
      className: 'line',
      attrs: Util.mix({
        points: bottomPoints,
        smooth
      }, style)
    });

    return [ topShape, bottomShape ];
  }
  if (cfg.isInCircle) {
    points.push(points[0]);
  }
  return container.addShape('Polyline', {
    className: 'line',
    attrs: Util.mix({
      points,
      smooth
    }, style)
  });
}

const SHAPES = [ 'line', 'smooth', 'dash' ];
Util.each(SHAPES, function(shapeType) {
  Shape.registerShape('line', shapeType, {
    draw(cfg, container) {
      const smooth = (shapeType === 'smooth');
      const style = getStyle(cfg);
      if (shapeType === 'dash') {
        style.lineDash = Global.lineDash;
      }

      return drawLines(cfg, container, style, smooth);
    }
  });
});

module.exports = Line;
