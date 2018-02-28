const Util = require('../../util/common');
const Global = require('../../global');
const ShapeUtil = require('./util');
const Shape = require('./shape');
const SHAPES = [ 'circle', 'hollowCircle', 'rect' ];

const Point = Shape.registerFactory('point', {
  defaultShapeType: 'circle',
  getDefaultPoints(pointInfo) {
    return ShapeUtil.splitPoints(pointInfo);
  }
});

function getPointsCfg(cfg) {
  const style = {
    lineWidth: 0,
    stroke: cfg.color,
    fill: cfg.color
  };
  if (cfg.size) {
    style.size = cfg.size;
  }

  Util.mix(style, cfg.style);
  return Util.mix({}, Global.shape.point, style);
}

function drawShape(cfg, container, shape) {
  if (cfg.size === 0) return;
  const pointCfg = getPointsCfg(cfg);
  const size = pointCfg.r || pointCfg.size;
  const x = cfg.x;
  const y = !Util.isArray(cfg.y) ? [ cfg.y ] : cfg.y;
  if (shape === 'hollowCircle') {
    pointCfg.lineWidth = 1;
    pointCfg.fill = null;
  }
  for (let i = 0, len = y.length; i < len; i++) {
    if (shape === 'rect') {
      return container.addShape('Rect', {
        className: 'point',
        attrs: Util.mix({
          x: x - size,
          y: y[i] - size,
          width: size * 2,
          height: size * 2
        }, pointCfg)
      });
    }

    return container.addShape('Circle', {
      className: 'point',
      attrs: Util.mix({
        x,
        y: y[i],
        r: size
      }, pointCfg)
    });
  }
}

Util.each(SHAPES, function(shapeType) {
  Shape.registerShape('point', shapeType, {
    draw(cfg, container) {
      return drawShape(cfg, container, shapeType);
    }
  });
});

module.exports = Point;
