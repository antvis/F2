const Shape = require('../shape');

class Circle extends Shape {
  _initProperties() {
    super._initProperties();
    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'circle';
  }

  getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      r: 0,
      lineWidth: 0
    };
  }

  createPath(context) {
    const attrs = this.get('attrs');
    const { x, y, r } = attrs;
    context.beginPath();
    context.arc(x, y, r, 0, Math.PI * 2, false);
    context.closePath();
  }

  calculateBox() {
    const attrs = this.get('attrs');
    const { x, y, r } = attrs;

    return {
      minX: x - r,
      maxX: x + r,
      minY: y - r,
      maxY: y + r
    };
  }
}
Shape.Circle = Circle;
module.exports = Circle;
