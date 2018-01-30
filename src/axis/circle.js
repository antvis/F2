/**
 * @fileOverview 圆形坐标轴
 * @author dxq613@gmail.com
 */

const Util = require('../util');
const Abstract = require('./abstract');
const G = require('../graphic/g');
const Vector2 = require('../graphic/vector2');

class AxisCircle extends Abstract {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    Util.mix(cfg, {
      /**
       * 起始角度
       * @type {Number}
       */
      startAngle: -Math.PI / 2,

      /**
       * 结束角度
       * @type {Number}
       */
      endAngle: Math.PI * 3 / 2,

      /**
       * 半径
       * @type {Number}
       */
      radius: null,

      /**
       * 圆心
       * @type {Object}
       */
      center: null
    });
    return cfg;
  }

  // 获取坐标轴上的点
  getOffsetPoint(value) {
    const self = this;
    const startAngle = self.get('startAngle');
    const endAngle = self.get('endAngle');
    const angle = startAngle + (endAngle - startAngle) * value;
    return self._getCirclePoint(angle);
  }

  // 获取圆上的点
  _getCirclePoint(angle, radius) {
    const self = this;
    const center = self.get('center');
    radius = radius || self.get('radius');
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
    if (offsetVector.x > 0) {
      align = 'left';
    } else if (offsetVector.x < 0) {
      align = 'right';
    } else {
      align = 'center';
      if (offsetVector.y > 0) {
        baseLine = 'top';
      } else if (offsetVector.y < 0) {
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
    const self = this;
    const center = self.get('center');
    const factor = self.get('offsetFactor');
    return new Vector2((point.y - center.y) * factor, (point.x - center.x) * -1 * factor);
  }

  drawLine(lineCfg) {
    const self = this;
    const center = self.get('center');
    const radius = self.get('radius');
    const canvas = self.get('canvas');
    const startAngle = self.get('startAngle');
    const endAngle = self.get('endAngle');
    G.drawArc(center, radius, startAngle, endAngle, canvas, lineCfg);
  }
}

module.exports = AxisCircle;
