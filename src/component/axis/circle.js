const Util = require('../../util/common');
const Abstract = require('./abstract');

class Circle extends Abstract {
  _initDefaultCfg() {
    super._initDefaultCfg();
    this.startAngle = -Math.PI / 2; // 起始角度，弧度
    this.endAngle = Math.PI * 3 / 2; // 结束角度，弧度
    this.radius = null; // 半径
    this.center = null; // 圆心
  }

  // 获取坐标轴上的点
  getOffsetPoint(value) {
    const { startAngle, endAngle } = this;
    const angle = startAngle + (endAngle - startAngle) * value;
    return this._getCirclePoint(angle);
  }

  // 获取圆上的点
  _getCirclePoint(angle, radius) {
    const self = this;
    const center = self.center;
    radius = radius || self.radius;
    return {
      x: center.x + Math.cos(angle) * radius,
      y: center.y + Math.sin(angle) * radius
    };
  }

  getTextAlignInfo(point, offset) {
    const self = this;
    const offsetVector = self.getOffsetVector(point, offset);
    let align;
    let baseLine = 'middle';
    if (offsetVector[0] > 0) {
      align = 'left';
    } else if (offsetVector[0] < 0) {
      align = 'right';
    } else {
      align = 'center';
      if (offsetVector[1] > 0) {
        baseLine = 'top';
      } else if (offsetVector[1] < 0) {
        baseLine = 'bottom';
      }
    }
    return {
      textAlign: align,
      textBaseline: baseLine
    };
  }

  // 获取坐标轴上点的向量，极坐标下覆盖此方法
  getAxisVector(point) {
    const center = this.center;
    const factor = this.offsetFactor;
    return [ (point.y - center.y) * factor, (point.x - center.x) * -1 * factor ];
  }

  drawLine(lineCfg) {
    const { center, radius, startAngle, endAngle } = this;
    const container = this.getContainer(lineCfg.top);
    container.addShape('arc', {
      className: 'axis-line',
      attrs: Util.mix({
        x: center.x,
        y: center.y,
        r: radius,
        startAngle,
        endAngle
      }, lineCfg)
    });
  }
}

Abstract.Circle = Circle;
module.exports = Circle;
