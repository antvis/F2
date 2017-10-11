/**
 * @fileOverview guide arc
 * @author 旻诺<audrey.tm@alibaba-inc.com>
 */


const Util = require('../util');
const Guide = require('./guide');
const Vector2 = require('../graphic/vector2');
const G = require('../graphic/g');
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

  // 获取弧线的path
  getCfg(coord) {
    const self = this;
    const start = self.parsePoint(coord, self.start);
    const end = self.parsePoint(coord, self.end);
    const center = coord.get('center');
    const v = new Vector2(1, 0); // 单位向量
    const sv = Vector2.sub(start, center);
    const ev = Vector2.sub(end, center);
    const radius = sv.length();

    const rst = {
      radius,
      startAngle: 2 * Math.PI - sv.angleTo(v, true),
      endAngle: 2 * Math.PI - ev.angleTo(v, true)
    };
    return rst;
  }

  paint(coord, canvas) {
    const angle = this.getCfg(coord);
    const cfg = Util.mix({
      z: false
    }, this.cfg, angle);
    const center = coord.get('center');
    const radius = angle.radius;
    const startAngle = angle.startAngle;
    const endAngle = angle.endAngle;

    G.drawArc(center, radius, startAngle, endAngle, canvas, cfg);
  }
}

module.exports = Arc;
