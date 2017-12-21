const Util = require('../../util/common');
const Shape = require('../shape');
const Smooth = require('../util/smooth');

class SmoothLine extends Shape {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      canStroke: true,
      type: 'bezier'
    });
  }

  getDefaultAttrs() {
    return {
      points: null,
      lineWidth: 1
    };
  }

  createPath(context) {
    const attrs = this.get('attrs');
    const { points } = attrs;
    context = context || self.get('context');
    const constaint = [ // 范围
      [ 0, 0 ],
      [ 1, 1 ]
    ];
    const sps = Smooth.smooth(points, false, constaint);

    context.beginPath();
    context.moveTo(points[0].x, points[0].y);
    for (let i = 0, n = sps.length; i < n; i++) {
      const sp = sps[i];
      context.bezierCurveTo(sp[1], sp[2], sp[3], sp[4], sp[5], sp[6]);
    }
  }
}

module.exports = SmoothLine;
