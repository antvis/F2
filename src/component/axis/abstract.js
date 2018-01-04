const Util = require('../../util/common');
const Vector2 = require('../../graphic/util/vector2');

class Abastract {
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
       * 上层图层
       * @type {container}
       */
      frontContainer: null,
      /**
       * 下层图层
       * @type {[type]}
       */
      backContainer: null,
      /**
       * 绘制栅格的点
       * @type {Array}
       */
      gridPoints: []
    };
  }

  constructor(cfg) {
    const defaultCfg = this.getDefaultCfg();
    Util.mix(this, defaultCfg, cfg);
    this.draw();
  }

  draw() {
    const { line, tickLine, label, grid } = this;

    line && this.drawLine(line);
    tickLine && this.drawTicks(tickLine);
    label && this.drawLabels(label);
    grid && this.drawGrid(grid);
  }

  drawTicks(tickCfg) {
    const self = this;
    const ticks = self.ticks;
    const length = tickCfg.length; // Change: value 改为 length， 同 G2 统一
    const container = self.getContainer(tickCfg.top);
    Util.each(ticks, function(tick) {
      const start = self.getOffsetPoint(tick.value);
      const end = self.getSidePoint(start, length);
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

  drawLabels(label) {
    const self = this;
    const { ticks, labelOffset } = self;
    let labelCfg = label;
    const count = ticks.length;
    Util.each(ticks, function(tick, index) {
      if (Util.isFunction(label)) { // 文本的配置项动态可配置
        labelCfg = label(tick.text, index, count);
      }
      if (labelCfg) {
        const container = self.getContainer(labelCfg.top);
        const start = self.getOffsetPoint(tick.value);
        const { x, y } = self.getSidePoint(start, labelOffset);
        const cfg = Util.mix({}, self.getTextAlignInfo(start, labelOffset), labelCfg);
        container.addShape('text', {
          className: 'axis-label',
          attrs: Util.mix({
            x,
            y,
            text: cfg.text || tick.text
          }, cfg)
        });
      }
    });
  }

  drawLine() {}

  drawGrid(grid) {
    const self = this;
    const { gridPoints, ticks } = self;
    let gridCfg = grid;
    const count = gridPoints.length;

    Util.each(gridPoints, function(subPoints, index) {
      if (Util.isFunction(grid)) {
        const tick = ticks[index] || {};
        gridCfg = grid(tick.text, index, count);
      }

      if (gridCfg) {
        const container = self.getContainer(gridCfg.top);
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
  getOffsetPoint() {}

  // 获取坐标轴上点的向量，极坐标下覆盖此方法
  getAxisVector() {}

  // 获取偏移位置的向量
  getOffsetVector(point, offset) {
    const self = this;
    const axisVector = self.getAxisVector(point);
    const normal = Vector2.normalize([], axisVector);
    const factor = self.offsetFactor;
    const verticalVector = [ normal[1] * -1 * factor, normal[0] * factor ];
    return Vector2.scale([], verticalVector, offset);
  }

  // 获取坐标轴边上的点
  getSidePoint(point, offset) {
    const self = this;
    const offsetVector = self.getOffsetVector(point, offset);
    return {
      x: point.x + offsetVector[0],
      y: point.y + offsetVector[1]
    };
  }

  // 获取文本，水平和垂直方向的对齐方式
  getTextAlignInfo(point, offset) {
    const self = this;
    const offsetVector = self.getOffsetVector(point, offset);
    let align;
    let baseLine;
    if (offsetVector[0] > 0) {
      align = 'left';
    } else if (offsetVector[0] < 0) {
      align = 'right';
    } else {
      align = 'center';
    }
    if (offsetVector[1] > 0) {
      baseLine = 'top';
    } else if (offsetVector[1] < 0) {
      baseLine = 'bottom';
    } else {
      baseLine = 'middle';
    }
    return {
      textAlign: align,
      textBaseline: baseLine
    };
  }

  getContainer(isTop) {
    const { frontContainer, backContainer } = this;
    return isTop ? frontContainer : backContainer;
  }
}

module.exports = Abastract;
