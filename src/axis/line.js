/**
 * @fileOverview 线性的坐标轴
 * @author dxq613@gmail.com
 */

const Abstract = require('./abstract');
const G = require('../graphic/g');
const Vector2 = require('../graphic/vector2');

class AxisLine extends Abstract {

  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.start = null;
    cfg.end = null;
    return cfg;
  }
  // 获取坐标轴上的点
  getOffsetPoint(value) {
    const self = this;
    const start = self.get('start');
    const end = self.get('end');
    const rangeX = end.x - start.x;
    const rangeY = end.y - start.y;
    return {
      x: start.x + rangeX * value,
      y: start.y + rangeY * value
    };
  }

  // 获取坐标轴上点的向量，极坐标下覆盖此方法
  getAxisVector() {
    const self = this;
    const start = self.get('start');
    const end = self.get('end');
    return new Vector2(end.x - start.x, end.y - start.y);
  }

  drawLine(lineCfg) {
    const self = this;
    const canvas = self.get('canvas');
    const start = self.get('start');
    const end = self.get('end');
    G.drawLine(start, end, canvas, lineCfg);
  }
}

module.exports = AxisLine;
