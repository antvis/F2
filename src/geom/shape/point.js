/**
 * @fileOverview point shape
 * @author dxq613@gmail.com
 */


const Util = require('../../util');
const Shape = require('./shape');
const G = require('../../graphic/g');
const DEFAULT_SIZE = 5;
const ShapeUtil = require('./util');

const Point = Shape.registerFactory('point', {
  defaultShapeType: 'circle',
  getDefaultPoints(pointInfo) {
    return ShapeUtil.splitPoints(pointInfo);
  }
});

function getPointsCfg(cfg) {
  return {
    size: cfg.size || DEFAULT_SIZE,
    style: Util.mix({
      lineWidth: 0,
      stroke: cfg.color,
      fill: cfg.color
    }, cfg.style)
  };
}

Shape.registerShape('point', 'circle', {
  draw(cfg, canvas) {
    if (cfg.size === 0) return;
    const pointCfg = getPointsCfg(cfg);
    const size = pointCfg.size;
    const style = pointCfg.style;
    const x = cfg.x;
    let y = cfg.y;
    if (!Util.isArray(y)) {
      y = [ y ];
    }
    for (let i = 0; i < y.length; i++) {
      G.drawCircle({ x, y: y[i] }, size, canvas, style);
    }
  }
});

Shape.registerShape('point', 'hollowCircle', {
  draw(cfg, canvas) {
    if (cfg.size === 0) return;
    const pointCfg = getPointsCfg(cfg);
    const size = pointCfg.size;
    const style = pointCfg.style;
    style.lineWidth = 1;
    style.fill = null;
    const x = cfg.x;
    let y = cfg.y;
    if (!Util.isArray(y)) {
      y = [ y ];
    }
    for (let i = 0; i < y.length; i++) {
      G.drawCircle({ x, y: y[i] }, size, canvas, style);
    }
  }
});

Shape.registerShape('point', 'rect', {
  draw(cfg, canvas) {
    if (cfg.size === 0) return;
    const pointCfg = getPointsCfg(cfg);
    const size = pointCfg.size;
    const style = pointCfg.style;
    const x = cfg.x;
    let y = cfg.y;
    if (!Util.isArray(y)) {
      y = [ y ];
    }

    Util.each(y, function(subY) {
      G.drawShape(canvas, style, function(ctx) {
        ctx.rect(x - size, subY - size, size * 2, size * 2);
      });
    });
  }
});

module.exports = Point;
