const Util = require('../../util/common');
const GuideBase = require('./base');

class Line extends GuideBase {
  getDefaultCfg() {
    return {
      type: 'line',
      start: [],
      end: [],
      style: {
        stroke: '#000',
        lineWidth: 1
      }
    };
  }

  render(coord, container) {
    const points = [];
    points[0] = this.parsePoint(coord, this.start);
    points[1] = this.parsePoint(coord, this.end);
    const shape = container.addShape('Line', {
      className: 'guide-line',
      attrs: Util.mix({
        x1: points[0].x,
        y1: points[0].y,
        x2: points[1].x,
        y2: points[1].y
      }, this.style)
    });
    this.element = shape;
  }
}

module.exports = Line;
