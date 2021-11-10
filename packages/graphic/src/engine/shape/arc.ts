import Shape from './shape';
import { getBBoxFromArc } from '../../util/bbox';

class Arc extends Shape {
  _initProperties() {
    super._initProperties();
    this._attrs.canStroke = true;
    this._attrs.canFill = true;
    this._attrs.type = 'arc';
  }

  getDefaultAttrs() {
    return {
      x: 0,
      y: 0,
      r: 0,
      startAngle: 0,
      endAngle: Math.PI * 2,
      anticlockwise: false,
      lineWidth: 1
    };
  }

  createPath(context) {
    const attrs = this.get('attrs');
    const { x, y, r, startAngle, endAngle, anticlockwise } = attrs;

    context.beginPath();
    if (startAngle !== endAngle) {
      context.arc(x, y, r, startAngle, endAngle, anticlockwise);
    }
  }

  calculateBox() {
    const attrs = this.get('attrs');
    const { x, y, r, startAngle, endAngle, anticlockwise } = attrs;

    return getBBoxFromArc(x, y, r, startAngle, endAngle, anticlockwise);
  }
}

export default Arc;
