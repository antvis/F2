const Util = require('../../util/common');
const Shape = require('../shape');
const bbox = require('../util/bbox');

class Line extends Shape {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      canStroke: true,
      type: 'line'
    });
  }

  getDefaultAttrs() {
    return {
      x1: 0,
      y1: 0,
      x2: 0,
      y2: 0,
      lineWidth: 1
    };
  }

  createPath(context) {
    const attrs = this.get('attrs');
    const { x1, y1, x2, y2 } = attrs;
    context = context || this.get('context');
    context.beginPath();

    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
  }

  calculateBox() {
    const attrs = this.get('attrs');
    const { x1, y1, x2, y2 } = attrs;
    return bbox.getBBoxFromLine(x1, y1, x2, y2);
  }
}

module.exports = Line;
