const Util = require('../../util/common');
const Shape = require('../shape');

class Polyline extends Shape {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      canStroke: true,
      type: 'polyline'
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
    let l;
    let i;

    if (points.length < 2) {
      return;
    }
    context = context || self.get('context');
    context.beginPath();
    context.moveTo(points[0][0], points[0][1]);
    for (i = 1, l = points.length - 1; i < l; i++) {
      context.lineTo(points[i][0], points[i][1]);
    }
    context.lineTo(points[l][0], points[l][1]);
  }
}

module.exports = Polyline;
