const Shape = require('../shape');
const bbox = require('../util/bbox');

class Sector extends Shape {
  _initProperties() {
    super._initProperties();
    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'sector';
  }

  getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      lineWidth: 0,
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

  calculateBox() {
    const attrs = this.get('attrs');
    const { x, y, r, r0, startAngle, endAngle, clockwise } = attrs;
    const outerBBox = bbox.getBBoxFromArc(x, y, r, startAngle, endAngle, clockwise);
    const innerBBox = bbox.getBBoxFromArc(x, y, r0, startAngle, endAngle, clockwise);
    return {
      minX: Math.min(outerBBox.minX, innerBBox.minX),
      minY: Math.min(outerBBox.minY, innerBBox.minY),
      maxX: Math.max(outerBBox.maxX, innerBBox.maxX),
      maxY: Math.max(outerBBox.maxY, innerBBox.maxY)
    };
  }
}

Shape.Sector = Sector;
module.exports = Sector;

