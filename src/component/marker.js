/**
 * marker shapes，used for tooltip and legend
 */
const Util = require('../util/common');
const { Shape } = require('../graphic/index');

const SYMBOLS = {
  circle(x, y, r, ctx) {
    ctx.arc(x, y, r, 0, Math.PI * 2, false);
  },
  square(x, y, r, ctx) {
    ctx.moveTo(x - r, y - r);
    ctx.lineTo(x + r, y - r);
    ctx.lineTo(x + r, y + r);
    ctx.lineTo(x - r, y + r);
    ctx.closePath();
  }
};

class Marker extends Shape {
  _initProperties() {
    super._initProperties();
    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'marker';
  }

  getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      lineWidth: 0
    };
  }

  createPath(context) {
    const attrs = this.get('attrs');
    const { x, y, radius } = attrs;
    const symbol = attrs.symbol || 'circle';
    let method;
    if (Util.isFunction(symbol)) {
      method = symbol;
    } else {
      method = SYMBOLS[symbol];
    }
    context.beginPath();
    method(x, y, radius, context, this);
  }

  calculateBox() {
    const attrs = this.get('attrs');
    const { x, y, radius } = attrs;
    return {
      minX: x - radius,
      minY: y - radius,
      maxX: x + radius,
      maxY: y + radius
    };
  }
}

module.exports = Marker;
