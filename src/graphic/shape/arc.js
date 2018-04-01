const Shape = require('../shape');
const bbox = require('../util/bbox');

class Arc extends Shape {
  _initProperties() {
    super._initProperties();
    this._attrs.canStroke = true;
    this._attrs.type = 'arc';
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

    context.beginPath();
    context.arc(x, y, r, startAngle, endAngle, clockwise);
  }

  calculateBox() {
    const attrs = this.get('attrs');
    const { x, y, r, startAngle, endAngle, clockwise } = attrs;

    return bbox.getBBoxFromArc(x, y, r, startAngle, endAngle, clockwise);
  }
}
Shape.Arc = Arc;
module.exports = Arc;
