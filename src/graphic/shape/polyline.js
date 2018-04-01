const Shape = require('../shape');
const Smooth = require('../util/smooth');
const bbox = require('../util/bbox');

class Polyline extends Shape {
  _initProperties() {
    super._initProperties();
    this._attrs.canFill = true;
    this._attrs.canStroke = true;
    this._attrs.type = 'polyline';
  }

  getDefaultAttrs() {
    return {
      points: null,
      lineWidth: 1,
      smooth: false
    };
  }

  createPath(context) {
    const self = this;
    const attrs = self.get('attrs');
    const { points, smooth } = attrs;

    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    if (smooth) {
      const constaint = [
        [ 0, 0 ],
        [ 1, 1 ]
      ];
      const sps = Smooth.smooth(points, false, constaint);
      for (let i = 0, n = sps.length; i < n; i++) {
        const sp = sps[i];
        context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
      }
    } else {
      let i;
      let l;
      for (i = 1, l = points.length - 1; i < l; i++) {
        context.lineTo(points[i].x, points[i].y);
      }
      context.lineTo(points[l].x, points[l].y);
    }
  }

  calculateBox() {
    const attrs = this.get('attrs');
    const { points, smooth } = attrs;

    if (smooth) {
      const newPoints = [];
      const constaint = [
        [ 0, 0 ],
        [ 1, 1 ]
      ];
      const sps = Smooth.smooth(points, false, constaint);
      for (let i = 0, n = sps.length; i < n; i++) {
        const sp = sps[i];
        if (i === 0) {
          newPoints.push([ points[0].x, points[0].y, sp[1], sp[2], sp[3], sp[4], sp[5], sp[6] ]);
        } else {
          const lastPoint = sps[ i - 1 ];
          newPoints.push([ lastPoint[5], lastPoint[6], sp[1], sp[2], sp[3], sp[4], sp[5], sp[6] ]);
        }
      }
      return bbox.getBBoxFromBezierGroup(newPoints);
    }
    return bbox.getBBoxFromPoints(points);
  }
}

Shape.Polyline = Polyline;
module.exports = Polyline;
