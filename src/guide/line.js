/**
 * @fileOverview guide line
 * @author 旻诺<audrey.tm@alibaba-inc.com>
 */

const Guide = require('./guide');
const G = require('../graphic/g');
const Global = require('../global');

/**
 * 辅助线
 * @class  Guide.Line
 */
class Line extends Guide {

  getDefaultCfg() {
    return {
      type: 'line',
      start: [],
      end: [],
      cfg: Global.guide.line
    };
  }

  // override paint
  paint(coord, canvas) {
    const self = this;
    const points = [];
    points[0] = self.parsePoint(coord, self.start);
    points[1] = self.parsePoint(coord, self.end);
    const cfg = self.cfg;
    G.drawLines(points, canvas, cfg);
  }
}

module.exports = Line;
