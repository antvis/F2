const Util = require('../../util/common');
const Shape = require('../shape');

class Rect extends Shape {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      canFill: true,
      canStroke: true,
      type: 'rect'
    });
  }

  getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      radius: 0,
      lineWidth: 0
    };
  }

  createPath(context) {
    const self = this;
    const attrs = self.get('attrs');
    const { x, y, width, height, radius } = attrs;
    context = context || self.get('context');

    context.beginPath();
    if (radius === 0) {
      context.rect(x, y, width, height);
    } else {
      context.moveTo(x + radius, y);
      context.lineTo(x + width - radius, y);
      context.arc(x + width - radius, y + radius, radius, -Math.PI / 2, 0, false);
      context.lineTo(x + width, y + height - radius);
      context.arc(x + width - radius, y + height - radius, radius, 0, Math.PI / 2, false);
      context.lineTo(x + radius, y + height);
      context.arc(x + radius, y + height - radius, radius, Math.PI / 2, Math.PI, false);
      context.lineTo(x, y + radius);
      context.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2, false);
      context.closePath();
    }
  }

  calculateBox() {
    const attrs = this.get('attrs');
    const { x, y, width, height, lineWidth } = attrs;
    const halfLineWidth = lineWidth / 2;
    return {
      minX: x - halfLineWidth,
      minY: y - halfLineWidth,
      maxX: x + width + halfLineWidth,
      maxY: y + height + halfLineWidth
    };
  }
}

module.exports = Rect;
