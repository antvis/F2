const Util = require('../../util/common');
const Shape = require('../shape');

class Polygon extends Shape {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      canFill: true,
      canStroke: true,
      type: 'polygon'
    });
  }

  getDefaultAttrs() {
    return {
      points: null,
      lineWidth: 1
    };
  }

  createPath(context) {
    const self = this;
    const attrs = self.get('attrs');
    const points = attrs.points;
    if (points.length < 2) {
      return;
    }
    context = context || self.get('context');
    context.beginPath();

    for (let i = 0; i < points.length; i++) {
      const point = points[i];
      if (i === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }
    }
    context.closePath();
  }
}

module.exports = Polygon;
