const Util = require('../util/common');
const Guide = require('./guide');
const Global = require('../global');

/**
 * 辅助弧线
 * @class Guide.Arc
 */
class Arc extends Guide {
  getDefaultCfg() {
    return {
      type: 'arc',
      /**
       * 起点
       * @type {Array}
       */
      start: [],
      /**
       * 终点
       * @type {Array}
       */
      end: [],
      cfg: Global.guide.arc
    };
  }

  paint(coord, container) {
    const self = this;
    const start = self.parsePoint(coord, self.start);
    const end = self.parsePoint(coord, self.end);
    const coordCenter = coord.center;
    const radius = Math.sqrt((start.x - coordCenter.x) * (start.x - coordCenter.x)
      + (start.y - coordCenter.y) * (start.y - coordCenter.y));
    const startAngle = Math.atan2(start.y - coordCenter.y, start.x - coordCenter.x);
    const endAngle = Math.atan2(end.y - coordCenter.y, end.x - coordCenter.x);
    container.addShape('arc', {
      className: 'guide-arc',
      attrs: Util.mix({
        x: coordCenter.x,
        y: coordCenter.y,
        r: radius,
        startAngle,
        endAngle
      }, self.cfg)
    });
  }
}

module.exports = Arc;
