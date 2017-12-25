const Abstract = require('./abstract');
const Vector2 = require('../g/util/vector2');
const Util = require('../util/common');

class AxisLine extends Abstract {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      start: null,
      end: null
    });
  }
  // 获取坐标轴上的点
  getOffsetPoint(value) {
    const { start, end } = this;
    return {
      x: start.x + (end.x - start.x) * value,
      y: start.y + (end.y - start.y) * value
    };
  }

  // 获取坐标轴上点的向量，极坐标下覆盖此方法
  getAxisVector() {
    const { start, end } = this;
    return new Vector2(end.x - start.x, end.y - start.y);
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

module.exports = AxisLine;
