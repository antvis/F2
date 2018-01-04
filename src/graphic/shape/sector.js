const Util = require('../../util/common');
const Shape = require('../shape');

class Sector extends Shape {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      canFill: true,
      canStroke: true,
      type: 'sector'
    });
  }

  getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      lineWidth: 1,
      r: 0,
      r0: 0,
      startAngle: 0,
      endAngle: Math.PI * 2,
      clockwise: false
    };
  }

  createPath(context) {
    const attrs = this.get('attrs');
    const { x, y, startAngle, endAngle, r, r0, clockwise } = attrs;
    context = context || this.get('context');
    context.beginPath();
    const unitX = Math.cos(startAngle);
    const unitY = Math.sin(startAngle);

    context.moveTo(unitX * r0 + x, unitY * r0 + y);
    context.lineTo(unitX * r + x, unitY * r + y);
    context.arc(x, y, r, startAngle, endAngle, clockwise);
    context.lineTo(Math.cos(endAngle) * r0 + x, Math.sin(endAngle) * r0 + y);
    if (r0 !== 0) {
      context.arc(x, y, r0, endAngle, startAngle, !clockwise);
    }
    context.closePath();
  }
}

module.exports = Sector;

