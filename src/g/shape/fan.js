const Util = require('../../util/common');
const Shape = require('../shape');
const Vector2 = require('../util/vector2');

class Fan extends Shape {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      canFill: true,
      canStroke: true,
      type: 'fan'
    });
  }

  getDefaultAttrs() {
    return {
      cx: 0,
      cy: 0,
      points: null,
      // outterRadius: 0,
      // innerRadius: 0,
      // startAngle: 0,
      // endAngle: 0,
      lineWidth: 1
      // clockwise: false
    };
  }

  createPath(context) {
    const attrs = this.get('attrs');
    const { cx, cy, points } = attrs;
    context = context || this.get('context');
    const v = new Vector2(1, 0);
    const v0 = new Vector2(points[0].x - cx, points[0].y - cy);
    const innerRadius = v0.length();
    const v1 = new Vector2(points[1].x - cx, points[1].y - cy);
    const radius = v1.length();
    const v2 = new Vector2(points[2].x - cx, points[2].y - cy);

    const startAngle = v.angleTo(v1);
    const endAngle = v.angleTo(v2);
    context.beginPath();

    if (startAngle > endAngle && startAngle - endAngle < 0.0001) {
      context.moveTo(cx + radius, cy);
      context.arc(cx, cy, radius, 0, Math.PI);
      context.arc(cx, cy, radius, Math.PI, Math.PI * 2);
      context.moveTo(cx + innerRadius, cy);
      context.arc(cx, cy, innerRadius, Math.PI * 2, Math.PI, true);
      context.arc(cx, cy, innerRadius, Math.PI, 0, true);
      context.closePath();
    } else {
      context.moveTo(points[0].x, points[0].y);
      context.lineTo(points[1].x, points[1].y);
      context.arc(cx, cy, radius, startAngle, endAngle);
      context.lineTo(points[3].x, points[3].y);
      context.arc(cx, cy, innerRadius, endAngle, startAngle, true);
      context.closePath();
    }
  }
}

module.exports = Fan;

