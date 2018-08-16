const Util = require('../../util/common');
const GuideBase = require('./base');

class Arc extends GuideBase {
  _initDefaultCfg() {
    this.type = 'arc';
    /**
     * start point
     * @type {Array | Function}
     */
    this.start = [];
    /**
     * end point
     * @type {Array | Function}
     */
    this.end = [];
    /**
     * style configuration
     * @type {Object}
     */
    this.style = {
      stroke: '#999',
      lineWidth: 1
    };
  }

  render(coord, container) {
    const self = this;
    const start = self.parsePoint(coord, self.start);
    const end = self.parsePoint(coord, self.end);
    if (!start || !end) {
      return;
    }
    const coordCenter = coord.center;
    const radius = Math.sqrt((start.x - coordCenter.x) * (start.x - coordCenter.x)
      + (start.y - coordCenter.y) * (start.y - coordCenter.y));
    const startAngle = Math.atan2(start.y - coordCenter.y, start.x - coordCenter.x);
    const endAngle = Math.atan2(end.y - coordCenter.y, end.x - coordCenter.x);
    const shape = container.addShape('arc', {
      className: 'guide-arc',
      attrs: Util.mix({
        x: coordCenter.x,
        y: coordCenter.y,
        r: radius,
        startAngle,
        endAngle
      }, self.style)
    });
    self.element = shape;
    return shape;
  }
}

GuideBase.Arc = Arc;
module.exports = Arc;
