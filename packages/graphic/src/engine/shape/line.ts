import Shape from './shape';
import { getBBoxFromLine } from '../../util/bbox';

class Line extends Shape {
  _initProperties() {
    super._initProperties();
    this._attrs.canStroke = true;
    this._attrs.type = 'line';
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

    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
  }

  calculateBox() {
    const attrs = this.get('attrs');
    const { x1, y1, x2, y2, lineWidth } = attrs;
    return getBBoxFromLine(x1, y1, x2, y2, lineWidth);
  }
}

export default Line;
