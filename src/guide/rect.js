
/**
 * @fileOverview guide rect
 * @author 旻诺<audrey.tm@alibaba-inc.com>
 */

const Guide = require('./guide');
const G = require('../graphic/g');
const Global = require('../global');
/**
 * 辅助框
 * @class  Guide.Rect
 */
class Rect extends Guide {

  getDefaultCfg() {
    return {
      type: 'rect',
      start: [],
      end: [],
      cfg: Global.guide.rect
    };
  }

  // override paint
  paint(coord, canvas) {
    const self = this;
    const cfg = self.cfg;
    const points = [];
    points[0] = self.parsePoint(coord, self.start);
    points[1] = self.parsePoint(coord, [ self.start[0], self.end[1] ]);
    points[2] = self.parsePoint(coord, self.end);
    points[3] = self.parsePoint(coord, [ self.end[0], self.start[1] ]);
    if (cfg.radius) {
      G.drawRect(points, canvas, cfg);
    } else {
      G.drawLines(points, canvas, cfg);
    }
  }
}

module.exports = Rect;
