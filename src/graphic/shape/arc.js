const Util = require('../../util/common');
const Shape = require('../shape');
const bbox = require('../util/bbox');

class Arc extends Shape {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      canStroke: true,
      type: 'arc'
    });
  }

  getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      r: 0,
      startAngle: 0,
      endAngle: Math.PI * 2,
      clockwise: false,
      lineWidth: 1
    };
  }

  createPath(context) {
    const attrs = this.get('attrs');
    const { x, y, r, startAngle, endAngle, clockwise } = attrs;

    context = context || this.get('context');
    context.beginPath();
    context.arc(x, y, r, startAngle, endAngle, clockwise);
  }

  calculateBox() {
    const attrs = this.get('attrs');
    const { x, y, r, startAngle, endAngle, clockwise, lineWidth } = attrs;

    return bbox.getBBoxFromArc(x, y, r, startAngle, endAngle, clockwise, lineWidth);
  }
}

module.exports = Arc;
