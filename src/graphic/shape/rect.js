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
