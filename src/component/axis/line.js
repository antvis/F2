const Util = require('../../util/common');
const Abstract = require('./abstract');

class Line extends Abstract {
  _initDefaultCfg() {
    super._initDefaultCfg();
    this.start = null;
    this.end = null;
  }

  getOffsetPoint(value) {
    const { start, end } = this;
    return {
      x: start.x + (end.x - start.x) * value,
      y: start.y + (end.y - start.y) * value
    };
  }

  getAxisVector() {
    const { start, end } = this;
    return [ end.x - start.x, end.y - start.y ];
  }

  drawLine(lineCfg) {
    const container = this.getContainer(lineCfg.top);
    const { start, end } = this;
    container.addShape('line', {
      className: 'axis-line',
      attrs: Util.mix({
        x1: start.x,
        y1: start.y,
        x2: end.x,
        y2: end.y
      }, lineCfg)
    });
  }
}

Abstract.Line = Line;
module.exports = Line;
