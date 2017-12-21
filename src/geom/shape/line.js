const Util = require('../../util/common');
const Shape = require('./shape');
const ShapeUtil = require('./util');

// const G = require('../../graphic/g');
const DEFAULT_SIZE = 4; // 线的默认宽度
const Global = require('../../global');

// regist line geom
const Line = Shape.registerFactory('line', {
  defaultShapeType: 'line'
});

function getStyle(cfg) {
  const style = Util.mix({
    strokeStyle: cfg.color,
    lineWidth: cfg.size || DEFAULT_SIZE
  }, cfg.style);
  return style;
}

function drawLines(cfg, container, style, isSmooth) {
  const points = cfg.points;
  const shapeType = isSmooth ? 'SmoothLine' : 'Polyline';
  // let lineShape;
  if (points.length && Util.isArray(points[0].y)) {
    const topPoints = [];
    const bottomPoints = [];
    for (let i = 0; i < points.length; i++) {
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
      container.addShape(shapeType, {
        className: 'line',
        attrs: Util.mix({
          points: topPoints
        }, style)
      });
    } else {
      container.addShape(shapeType, {
        className: 'line',
        attrs: Util.mix({
          points: topPoints
        }, style)
      });
      container.addShape(shapeType, {
        className: 'line',
        attrs: Util.mix({
          points: bottomPoints
        }, style)
      });
    }
  } else {
    if (cfg.isInCircle) {
      points.push(points[0]);
    }
    container.addShape(shapeType, {
      className: 'line',
      attrs: Util.mix({
        points
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
