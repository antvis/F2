const Util = require('../../util/common');
const Shape = require('../shape');

class Ring extends Shape {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      canFill: true,
      canStroke: true,
      type: 'ring'
    });
  }

  getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      r: 0,
      r0: 0
    };
  }

  createPath(context) {
    const attrs = this.get('attrs');
    const { x, y, r, r0 } = attrs;
    context = context || this.get('context');

    context.beginPath();
    context.moveTo(x + r, y);
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.moveTo(x + r0, y);
    context.arc(x, y, r0, 0, Math.PI * 2, true);
    context.closePath();
  }

  calculateBox() {
    const attrs = this.get('attrs');
    const { x, y, r, lineWidth } = attrs;
    const halfLineWidth = lineWidth / 2 || 0;

    return {
      minX: x - r - halfLineWidth,
      maxX: x + r + halfLineWidth,
      minY: y - r - halfLineWidth,
      maxY: y + r + halfLineWidth
    };
  }
}

module.exports = Ring;

