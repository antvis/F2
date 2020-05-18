
import Global from '../../global';
import Shape from './shape';
import { mix, each, isArray } from '../../util/common';
import { splitPoints } from './util';
const SHAPES = [ 'circle', 'hollowCircle', 'rect' ];

const Point = Shape.registerFactory('point', {
  defaultShapeType: 'circle',
  getDefaultPoints(pointInfo) {
    return splitPoints(pointInfo);
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

  mix(style, cfg.style);
  return mix({}, Global.shape.point, style);
}

function drawShape(cfg, container, shape) {
  if (cfg.size === 0) return;
  const pointCfg = getPointsCfg(cfg);
  const size = pointCfg.r || pointCfg.size;
  const x = cfg.x;
  const y = !isArray(cfg.y) ? [ cfg.y ] : cfg.y;
  if (shape === 'hollowCircle') {
    pointCfg.lineWidth = 1;
    pointCfg.fill = null;
  }
  for (let i = 0, len = y.length; i < len; i++) {
    if (shape === 'rect') {
      return container.addShape('Rect', {
        className: 'point',
        attrs: mix({
          x: x - size,
          y: y[i] - size,
          width: size * 2,
          height: size * 2
        }, pointCfg)
      });
    }

    return container.addShape('Circle', {
      className: 'point',
      attrs: mix({
        x,
        y: y[i],
        r: size
      }, pointCfg)
    });
  }
}

each(SHAPES, function(shapeType) {
  Shape.registerShape('point', shapeType, {
    draw(cfg, container) {
      return drawShape(cfg, container, shapeType);
    }
  });
});

export default Point;
