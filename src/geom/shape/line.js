/**
 * @fileOverview point shape
 * @author dxq613@gmail.com
 */


const Util = require('../../util');
const Shape = require('./shape');
const G = require('../../graphic/g');
const DEFAULT_SIZE = 4; // 线的默认宽度
const Global = require('../../global');

// regist line geom
const Line = Shape.registerFactory('line', {
  defaultShapeType: 'line'
});

function getStyle(cfg) {
  const style = Util.mix({
    strokeStyle: cfg.color,
    lineWidth: cfg.size || DEFAULT_SIZE,
    z: cfg.isInCircle
  }, cfg.style);
  return style;
}

// draw line shape
Shape.registerShape('line', 'line', {
  draw(cfg, canvas) {
    const points = cfg.points; // this.parsePoints(cfg.points);
    const style = getStyle(cfg);
    G.drawLines(points, canvas, style);
  }
});

// draw smooth line shape
Shape.registerShape('line', 'smooth', {
  draw(cfg, canvas) {
    const points = cfg.points;
    const style = getStyle(cfg);
    G.drawSmooth(points, canvas, style);
  }
});

// draw dash line shape
Shape.registerShape('line', 'dash', {
  draw(cfg, canvas) {
    const points = cfg.points;
    const style = getStyle(cfg);
    style.lineDash = Global.lineDash;
    G.drawLines(points, canvas, style);
  }
});

module.exports = Line;
