/**
 * @fileOverview 坐标轴的抽象类
 * @author dxq613@gmail.com
 */

const Util = require('../util/common');
const Base = require('../base');
// const G = require('../graphic/g');
const Vector2 = require('../graphic/vector2');

/**
 * Axis.Abastract
 * 坐标轴的抽象类
 */
class Abastract extends Base {
  getDefaultCfg() {
    return {
      /**
       * 坐标点
       * @type {Array}
       */
      ticks: [],
      /**
       * tick 的配置信息
       * @type {Object}
       */
      tickLine: {},
      /**
       * 文本、tick跟坐标轴线的方向，默认是顺时针方向
       * @type {Number}
       */
      offsetFactor: 1,
      /**
       * 画布
       * @type {container}
       */
      container: null,
      /**
       * 绘制栅格的点
       * @type {Array}
       */
      gridPoints: []
    };
  }

  constructor(cfg) {
    super(cfg);
    this.init();
  }

  init() {

  }

  draw() {
    const self = this;
    const line = self.get('line');
    const tickLine = self.get('tickLine');
    const label = self.get('label');

    if (line) {
      self.drawLine(line);
    }
    if (tickLine) {
      self.drawTicks(tickLine);
    }

    if (label) {
      self.drawLabels(label);
    }
  }

  // 绘制栅格
  drawGrid() {
    const self = this;
    const grid = self.get('grid');
    if (!grid) {
      return;
    }
    const container = self.get('container');
    const gridPoints = self.get('gridPoints');
    const ticks = self.get('ticks');
    let gridCfg;
    const count = gridPoints.length;

    Util.each(gridPoints, function(subPoints, index) {
      if (Util.isFunction(grid)) {
        const tick = ticks[index] || {};
        gridCfg = grid(tick.text, index, count);
      } else {
        gridCfg = grid;
      }
      if (gridCfg) {
        // G.drawLines(subPoints, container, gridCfg);
        container.addShape('Polyline', {
          className: 'axis-grid',
          attrs: Util.mix({
            points: subPoints
          }, gridCfg)
        });

      }
    });
  }

  // 获取坐标轴上的点
  getOffsetPoint() {
  }

  // 获取坐标轴上点的向量，极坐标下覆盖此方法
  getAxisVector() {
  }

  // 获取偏移位置的向量
  getOffsetVector(point, offset) {
    const self = this;
    const axisVector = self.getAxisVector(point);
    const normal = axisVector.normalize();
    const factor = self.get('offsetFactor');
    const verticalVector = new Vector2(normal.y * -1 * factor, normal.x * factor);
    return verticalVector.multiply(offset);
  }

  // 获取坐标轴边上的点
  getSidePoint(point, offset) {
    const self = this;
    const offsetVector = self.getOffsetVector(point, offset);
    return {
      x: point.x + offsetVector.x,
      y: point.y + offsetVector.y
    };
  }

  drawTicks(tickCfg) {
    const self = this;
    const ticks = self.get('ticks');
    const length = tickCfg.value;
    const container = self.get('container');
    Util.each(ticks, function(tick) {
      const start = self.getOffsetPoint(tick.value);
      const end = self.getSidePoint(start, length);
      // G.drawLine(start, end, container, tickCfg);
      container.addShape('line', {
        className: 'axis-tick',
        attrs: Util.mix({
          x1: start.x,
          y1: start.y,
          x2: end.x,
          y2: end.y
        }, tickCfg)
      });
    });
  }

  // 获取文本，水平和垂直方向的对齐方式
  getTextAlignInfo(point, offset) {
    const self = this;
    const offsetVector = self.getOffsetVector(point, offset);
    let align;
    let baseLine;
    if (offsetVector.x > 0) {
      align = 'left';
    } else if (offsetVector.x < 0) {
      align = 'right';
    } else {
      align = 'center';
    }
    if (offsetVector.y > 0) {
      baseLine = 'top';
    } else if (offsetVector.y < 0) {
      baseLine = 'bottom';
    } else {
      baseLine = 'middle';
    }
    return {
      textAlign: align,
      textBaseline: baseLine
    };
  }

  drawLabels(label) {
    const self = this;
    const ticks = self.get('ticks');
    const container = self.get('container');
    let labelCfg;
    const count = ticks.length;
    Util.each(ticks, function(tick, index) {
      if (Util.isFunction(label)) { // 文本的配置项动态可配置
        labelCfg = label(tick.text, index, count);
      } else {
        labelCfg = label;
      }
      if (labelCfg) {
        const offset = self.get('labelOffset');
        const start = self.getOffsetPoint(tick.value);
        const end = self.getSidePoint(start, offset);
        const cfg = Util.mix({}, self.getTextAlignInfo(start, offset), labelCfg);
        // G.drawText(cfg.text || tick.text, end, container, cfg);
        container.addShape('text', {
          className: 'axis-text',
          attrs: Util.mix({
            x: end.x,
            y: end.y,
            text: cfg.text || tick.text
          }, cfg)
        });
      }
    });
  }

  drawLine() {}

}

module.exports = Abastract;
