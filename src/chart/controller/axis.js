const Util = require('../../util/common');
const Axis = require('../../component/axis/');
const Global = require('../../global');
const { Shape } = require('../../graphic/index');

function formatTicks(ticks) {
  const tmp = ticks.slice(0);
  if (tmp.length > 0) {
    const first = tmp[0];
    const last = tmp[tmp.length - 1];
    if (first.value !== 0) {
      tmp.unshift({
        value: 0
      });
    }
    if (last.value !== 1) {
      tmp.push({
        value: 1
      });
    }
  }

  return tmp;
}

class AxisController {
  constructor(cfg) {
    this.axisCfg = {};
    this.frontPlot = null;
    this.backPlot = null;
    this.axes = {}; // 存储各个坐标轴的配置
    Util.mix(this, cfg);
  }

  // 对应的坐标轴是否隐藏
  _isHide(field) {
    const axisCfg = this.axisCfg;
    return !axisCfg || axisCfg[field] === false;
  }

  _getLinePosition(scale, dimType, index, transposed) {
    let position = '';
    const field = scale.field;
    const axisCfg = this.axisCfg;
    if (axisCfg[field] && axisCfg[field].position) {
      position = axisCfg[field].position;
    } else if (dimType === 'x') {
      position = transposed ? 'left' : 'bottom';
    } else if (dimType === 'y') {
      position = index ? 'right' : 'left';
      if (transposed) {
        position = 'bottom';
      }
    }

    return position;
  }

  _getLineCfg(coord, dimType, position) {
    let start;
    let end;
    let factor = 1; // 文本的对齐方式，是顺时针方向还是逆时针方向
    if (dimType === 'x') { // x 轴的坐标轴，底部的横坐标
      start = {
        x: 0,
        y: 0
      };
      end = {
        x: 1,
        y: 0
      };
    } else { // y轴坐标轴
      if (position === 'right') { // 多轴的情况
        start = {
          x: 1,
          y: 0
        };
        end = {
          x: 1,
          y: 1
        };
      } else { // 单个y轴，或者第一个y轴
        start = {
          x: 0,
          y: 0
        };
        end = {
          x: 0,
          y: 1
        };
        factor = -1;
      }
    }
    if (coord.transposed) {
      factor *= -1;
    }

    return {
      offsetFactor: factor,
      start: coord.convertPoint(start),
      end: coord.convertPoint(end)
    };
  }

  _getCircleCfg(coord) {
    return {
      startAngle: coord.startAngle,
      endAngle: coord.endAngle,
      center: coord.center,
      radius: coord.circleRadius
    };
  }

  _getRadiusCfg(coord) {
    const transposed = coord.transposed;
    let start;
    let end;
    if (transposed) {
      start = { x: 0, y: 0 };
      end = { x: 1, y: 0 };
    } else {
      start = { x: 0, y: 0 };
      end = { x: 0, y: 1 };
    }
    return {
      offsetFactor: -1,
      start: coord.convertPoint(start),
      end: coord.convertPoint(end)
    };
  }

  _getAxisCfg(coord, scale, verticalScale, dimType, defaultCfg) {
    const self = this;
    const axisCfg = this.axisCfg;
    const ticks = scale.getTicks();

    const cfg = Util.deepMix({
      ticks,
      frontContainer: this.frontPlot,
      backContainer: this.backPlot
    }, defaultCfg, axisCfg[scale.field]);

    const labels = [];
    const label = cfg.label;
    const count = ticks.length;
    let maxWidth = 0;
    let maxHeight = 0;
    let labelCfg = label;

    Util.each(ticks, (tick, index) => {
      if (Util.isFunction(label)) { // 文本的配置项动态可配置
        const executedLabel = label(tick.text, index, count);
        if (executedLabel) {
          labelCfg = Util.mix({}, Global._defaultAxis.label, executedLabel);
        } else {
          labelCfg = null;
        }
      }
      if (labelCfg) {
        const textStyle = {};
        if (labelCfg.textAlign) {
          textStyle.textAlign = labelCfg.textAlign;
        }
        if (labelCfg.textBaseline) {
          textStyle.textBaseline = labelCfg.textBaseline;
        }
        const axisLabel = new Shape.Text({
          className: 'axis-label',
          attrs: Util.mix({
            x: 0,
            y: 0,
            text: tick.text,
            fontFamily: self.chart.get('canvas').get('fontFamily') // 保持字体一致
          }, labelCfg),
          value: tick.value,
          textStyle,
          top: labelCfg.top,
          context: self.chart.get('canvas').get('context')
        });
        labels.push(axisLabel);
        const { width, height } = axisLabel.getBBox();
        maxWidth = Math.max(maxWidth, width);
        maxHeight = Math.max(maxHeight, height);
      }
    });

    cfg.labels = labels;
    cfg.maxWidth = maxWidth;
    cfg.maxHeight = maxHeight;
    return cfg;
  }

  _createAxis(coord, scale, verticalScale, dimType, index = '') {
    const self = this;
    const coordType = coord.type;
    const transposed = coord.transposed;
    let type;
    let key;
    let defaultCfg;
    if (coordType === 'cartesian' || coordType === 'rect') { // 直角坐标系下
      const position = self._getLinePosition(scale, dimType, index, transposed);
      defaultCfg = Global.axis[position];
      defaultCfg.position = position;
      type = 'Line';
      key = position;
    } else { // 极坐标系下
      if ((dimType === 'x' && !transposed) || (dimType === 'y' && transposed)) { // 圆形坐标轴
        defaultCfg = Global.axis.circle;
        type = 'Circle';
        key = 'circle';
      } else { // 半径坐标轴
        defaultCfg = Global.axis.radius;
        type = 'Line';
        key = 'radius';
      }
    }
    const cfg = self._getAxisCfg(coord, scale, verticalScale, dimType, defaultCfg); // 坐标轴的配置项
    cfg.type = type;
    cfg.dimType = dimType;
    cfg.verticalScale = verticalScale;
    cfg.index = index;
    this.axes[key] = cfg;
  }

  createAxis(coord, xScale, yScales) {
    const self = this;
    if (xScale && !self._isHide(xScale.field)) {
      self._createAxis(coord, xScale, yScales[0], 'x'); // 绘制 x 轴
    }
    Util.each(yScales, function(yScale, index) {
      if (!self._isHide(yScale.field)) {
        self._createAxis(coord, yScale, xScale, 'y', index);
      }
    });

    const axes = this.axes;
    const chart = self.chart;
    if (chart._isAutoPadding()) { // 数据变更时需要重新计算
      const userPadding = Util.parsePadding(chart.get('padding'));
      const appendPadding = Util.parsePadding(chart.get('appendPadding'));
      const legendRange = chart.get('legendRange') || {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };

      const padding = [
        userPadding[0] === 'auto' ? legendRange.top + appendPadding[0] * 2 : userPadding[0],
        userPadding[1] === 'auto' ? legendRange.right + appendPadding[1] : userPadding[1],
        userPadding[2] === 'auto' ? legendRange.bottom + appendPadding[2] : userPadding[2],
        userPadding[3] === 'auto' ? legendRange.left + appendPadding[3] : userPadding[3]
      ];

      if (coord.isPolar) { // 极坐标
        const circleAxis = axes.circle;
        if (circleAxis) {
          const { maxHeight, maxWidth, labelOffset } = circleAxis;
          padding[0] += maxHeight + labelOffset;
          padding[1] += maxWidth + labelOffset;
          padding[2] += maxHeight + labelOffset;
          padding[3] += maxWidth + labelOffset;
        }
      } else { // 直角坐标系
        if (axes.right && userPadding[1] === 'auto') {
          const { maxWidth, labelOffset } = axes.right;
          padding[1] += maxWidth + labelOffset;
        }

        if (axes.left && userPadding[3] === 'auto') {
          const { maxWidth, labelOffset } = axes.left;
          padding[3] += maxWidth + labelOffset;
        }

        if (axes.bottom && userPadding[2] === 'auto') {
          const { maxHeight, labelOffset } = axes.bottom;
          padding[2] += maxHeight + labelOffset;
        }
      }
      chart.set('_padding', padding); // 将计算后的 padding 存储在 _padding 属性中
      chart._updateLayout(padding);
    }

    Util.each(axes, axis => {
      const { type, grid, verticalScale, ticks, dimType, position, index } = axis;
      let appendCfg;
      if (coord.isPolar) {
        if (type === 'Line') {
          appendCfg = self._getRadiusCfg(coord);
        } else if (type === 'Circle') {
          appendCfg = self._getCircleCfg(coord);
        }
      } else {
        appendCfg = self._getLineCfg(coord, dimType, position);
      }

      if (grid && verticalScale) {
        const gridPoints = [];
        const verticalTicks = formatTicks(verticalScale.getTicks());

        Util.each(ticks, tick => {
          const subPoints = [];
          Util.each(verticalTicks, verticalTick => {
            const x = dimType === 'x' ? tick.value : verticalTick.value;
            const y = dimType === 'x' ? verticalTick.value : tick.value;
            const point = coord.convertPoint({
              x,
              y
            });
            subPoints.push(point);
          });

          gridPoints.push({
            points: subPoints,
            _id: 'axis-' + dimType + index + '-grid-' + tick.tickValue
          });
        });
        axis.gridPoints = gridPoints;

        if (coord.isPolar && grid.type === 'arc') {
          axis.center = coord.center;
          axis.startAngle = coord.startAngle;
          axis.endAngle = coord.endAngle;
        }
      }
      appendCfg._id = 'axis-' + dimType;
      if (!Util.isNil(index)) {
        appendCfg._id = 'axis-' + dimType + index;
      }

      new Axis[type](Util.mix(axis, appendCfg));
    });
  }

  clear() {
    this.axes = {};
    this.frontPlot.clear();
    this.backPlot.clear();
  }
}

module.exports = AxisController;
