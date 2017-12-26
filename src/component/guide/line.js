const Util = require('../../util/common');
const GuideBase = require('./base');
const Global = require('../../global');

class Line extends GuideBase {
  getDefaultCfg() {
    return {
      type: 'line',
      start: [],
      end: [],
      cfg: Global.guide.line
    };
  }

  render(coord, container) {
    const points = [];
    points[0] = this.parsePoint(coord, this.start);
    points[1] = this.parsePoint(coord, this.end);
    container.addShape('Line', {
      className: 'guide-line',
      attrs: Util.mix({
        x1: points[0].x,
        y1: points[0].y,
        x2: points[1].x,
        y2: points[1].y
      }, this.cfg)
    });
  }
}

module.exports = Line;
