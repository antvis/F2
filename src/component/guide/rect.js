const Util = require('../../util/common');
const GuideBase = require('./base');

class Rect extends GuideBase {
  _initDefaultCfg() {
    this.type = 'rect';
    this.start = [];
    this.end = [];
    this.style = {
      fill: '#CCD7EB',
      opacity: 0.4
    };
  }

  render(coord, container) {
    const start = this.parsePoint(coord, this.start);
    const end = this.parsePoint(coord, this.end);
    if (!start || !end) {
      return;
    }
    const shape = container.addShape('rect', {
      className: 'guide-rect',
      attrs: Util.mix({
        x: Math.min(start.x, end.x),
        y: Math.min(start.y, end.y),
        width: Math.abs(end.x - start.x),
        height: Math.abs(start.y - end.y)
      }, this.style)
    });
    this.element = shape;
    return shape;
  }
}

GuideBase.Rect = Rect;
module.exports = Rect;
