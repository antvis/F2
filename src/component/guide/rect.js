const Util = require('../../util/common');
const GuideBase = require('./base');
const Global = require('../../global');

class Rect extends GuideBase {
  getDefaultCfg() {
    return {
      type: 'rect',
      start: [],
      end: [],
      cfg: Global.guide.rect
    };
  }

  render(coord, container) {
    const start = this.parsePoint(coord, this.start);
    const end = this.parsePoint(coord, this.end);
    container.addShape('rect', {
      className: 'guide-rect',
      attrs: Util.mix({
        x: start.x,
        y: start.y,
        width: Math.abs(end.x - start.x),
        height: Math.abs(start.y - end.y)
      }, this.cfg)
    });
  }
}

module.exports = Rect;
