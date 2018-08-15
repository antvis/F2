const Util = require('../../util/common');
const GuideBase = require('./base');

class Line extends GuideBase {
  _initDefaultCfg() {
    this.type = 'line';
    this.start = [];
    this.end = [];
    this.style = {
      stroke: '#000',
      lineWidth: 1
    };
  }

  render(coord, container) {
    const points = [];
    points[0] = this.parsePoint(coord, this.start);
    points[1] = this.parsePoint(coord, this.end);
    if (!points[0] || !points[1]) {
      return;
    }
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
    return shape;
  }
}

GuideBase.Line = Line;
module.exports = Line;
