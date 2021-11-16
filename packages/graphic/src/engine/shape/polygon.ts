import Shape, { ShapeProp } from './shape';
import { getBBoxFromPoints } from '../../util/bbox';
import { PolygonAttrs } from '../../types';

export interface PolygonProp extends ShapeProp {
  attrs?: PolygonAttrs;
}

class Polygon extends Shape<PolygonProp> {
  _initProperties() {
    super._initProperties();
    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'polygon';
  }

  getDefaultAttrs() {
    return {
      points: null,
      lineWidth: 0,
    };
  }

  createPath(context) {
    const attrs = this.get('attrs');
    const points = attrs.points;

    context.beginPath();

    for (let i = 0, len = points.length; i < len; i++) {
      const point = points[i];
      if (i === 0) {
        context.moveTo(point.x, point.y);
      } else {
        context.lineTo(point.x, point.y);
      }
    }
    context.closePath();
  }

  calculateBox() {
    const attrs = this.get('attrs');
    const { points } = attrs;
    return getBBoxFromPoints(points);
  }
}

export default Polygon;
