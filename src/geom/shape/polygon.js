/**
 * @fileOverview 多边形
 * @author dxq613@gmail.com
 */

const Shape = require('./shape');
const Util = require('../../util');
const G = require('../../graphic/g');

const Polygon = Shape.registerFactory('polygon', {
  defaultShapeType: 'polygon',
  getDefaultPoints(pointInfo) {
    const points = [];
    Util.each(pointInfo.x, function(subX, idx) {
      const subY = pointInfo.y[idx];
      points.push({
        x: subX,
        y: subY
      });
    });
    return points;
  }
});

Shape.registerShape('polygon', 'polygon', {

  draw(cfg, canvas) {
    const points = this.parsePoints(cfg.points);
    const style = Util.mix({
      fill: cfg.color,
      z: true // 需要闭合
    }, cfg.style);
    G.drawLines(points, canvas, style);
  }
});

module.exports = Polygon;
