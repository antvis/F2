const Util = require('../../util/common');
const Shape = require('../shape');

class Rect extends Shape {
  _initProperties() {
    super._initProperties();
    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'rect';
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
    const { x, y, width, height } = attrs;

    context.beginPath();
    let radius = attrs.radius;
    if (!radius || !(width * height)) {
      context.rect(x, y, width, height);
    } else {
      radius = Util.parsePadding(radius);
      context.moveTo(x + radius[0], y);
      context.lineTo(x + width - radius[1], y);
      context.arc(x + width - radius[1], y + radius[1], radius[1], -Math.PI / 2, 0, false);
      context.lineTo(x + width, y + height - radius[2]);
      context.arc(x + width - radius[2], y + height - radius[2], radius[2], 0, Math.PI / 2, false);
      context.lineTo(x + radius[3], y + height);
      context.arc(x + radius[3], y + height - radius[3], radius[3], Math.PI / 2, Math.PI, false);
      context.lineTo(x, y + radius[0]);
      context.arc(x + radius[0], y + radius[0], radius[0], Math.PI, Math.PI * 3 / 2, false);
      context.closePath();
    }
  }

  calculateBox() {
    const attrs = this.get('attrs');
    const { x, y, width, height } = attrs;
    return {
      minX: x,
      minY: y,
      maxX: x + width,
      maxY: y + height
    };
  }
}

Shape.Rect = Rect;
module.exports = Rect;
