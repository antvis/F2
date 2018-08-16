const Shape = require('./shape');
const Util = require('../../util/common');

const Polygon = Shape.registerFactory('polygon', {
  defaultShapeType: 'polygon',
  getDefaultPoints(pointInfo) {
    const points = [];
    const { x, y } = pointInfo;
    for (let i = 0, len = x.length; i < len; i++) {
      points.push({
        x: x[i],
        y: y[i]
      });
    }
    return points;
  }
});

Shape.registerShape('polygon', 'polygon', {
  draw(cfg, container) {
    const points = this.parsePoints(cfg.points);
    const style = Util.mix({
      fill: cfg.color,
      points
    }, cfg.style);
    return container.addShape('Polygon', {
      className: 'polygon',
      attrs: style
    });
  }
});

module.exports = Polygon;
