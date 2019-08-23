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
      anticlockwise: false
    };
  }

  createPath(context) {
    const attrs = this.get('attrs');
    const { x, y, startAngle, endAngle, r, r0, anticlockwise } = attrs;
    context.beginPath();
    const unitX = Math.cos(startAngle);
    const unitY = Math.sin(startAngle);

    context.moveTo(unitX * r0 + x, unitY * r0 + y);
    context.lineTo(unitX * r + x, unitY * r + y);

    // 当扇形的角度非常小的时候，就不进行弧线的绘制；或者整个只有1个扇形时，会出现end<0的情况不绘制
    if (Math.abs(endAngle - startAngle) > 0.0001 || startAngle === 0 && endAngle < 0) {
      context.arc(x, y, r, startAngle, endAngle, anticlockwise);
      context.lineTo(Math.cos(endAngle) * r0 + x, Math.sin(endAngle) * r0 + y);
      if (r0 !== 0) {
        context.arc(x, y, r0, endAngle, startAngle, !anticlockwise);
      }
    }
    context.closePath();
  }

  calculateBox() {
    const attrs = this.get('attrs');
    const { x, y, r, r0, startAngle, endAngle, anticlockwise } = attrs;
    const outerBBox = bbox.getBBoxFromArc(x, y, r, startAngle, endAngle, anticlockwise);
    const innerBBox = bbox.getBBoxFromArc(x, y, r0, startAngle, endAngle, anticlockwise);
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

