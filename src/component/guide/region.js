const Util = require('../../util/common');
const GuideBase = require('./base');

class Rect extends GuideBase {
  getDefaultCfg() {
    return {
      type: 'region',
      start: [],
      end: [],
      style: {
        fill: '#CCD7EB',
        opacity: 0.4
      }
    };
  }

  render(coord, container) {
    const start = this.parsePoint(coord, this.start);
    const end = this.parsePoint(coord, this.end);
    container.addShape('rect', {
      className: 'guide-region',
      attrs: Util.mix({
        x: start.x,
        y: start.y,
        width: Math.abs(end.x - start.x),
        height: Math.abs(start.y - end.y)
      }, this.style)
    });
  }
}

module.exports = Rect;
