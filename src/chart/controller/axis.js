const Util = require('../../util/common');
const { Axis } = require('../../component/index');
const Global = require('../../global');
const { Text } = require('../../graphic/index');

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

  _getLinePosition(scale, dimType, index) {
    let position = '';
    const field = scale.field;
    const axisCfg = this.axisCfg;
    if (axisCfg[field] && axisCfg[field].position) {
      position = axisCfg[field].position;
    } else if (dimType === 'x') {
      position = 'bottom';
    } else if (dimType === 'y') {
      position = index ? 'right' : 'left';
    }

    return position;
  }

  _getLineCfg(coord, position) {
    let start;
    let end;
    let factor = 1; // 文本的对齐方式，是顺时针方向还是逆时针方向
    if (position === 'bottom') { // x轴的坐标轴,底部的横坐标
      start = { x: 0, y: 0 };
      end = { x: 1, y: 0 };
    } else if (position === 'right') { // 左侧 Y 轴
      start = { x: 1, y: 0 };
      end = { x: 1, y: 1 };
    } else if (position === 'left') { // 右侧 Y 轴
      start = { x: 0, y: 0 };
      end = { x: 0, y: 1 };
      factor = -1;
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
      radius: coord.radius
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
    ticks.map((tick, index) => {
      if (Util.isFunction(label)) { // 文本的配置项动态可配置
        labelCfg = Util.mix({}, Global._defaultAxis.label, label(tick.text, index, count));
      }
      if (labelCfg) {
        const textStyle = {};
        if (labelCfg.textAlign) {
          textStyle.textAlign = labelCfg.textAlign;
        }
        if (labelCfg.textBaseline) {
          textStyle.textBaseline = labelCfg.textBaseline;
        }
        const axisLabel = new Text({
          className: 'axis-label',
          attrs: Util.mix({
            x: 0,
            y: 0,
            text: tick.text
          }, labelCfg),
          value: tick.value,
          textStyle,
          top: labelCfg.top
        });
        labels.push(axisLabel);
        const { width, height } = axisLabel.getBBox();
        maxWidth = Math.max(maxWidth, width);
        maxHeight = Math.max(maxHeight, height);
      }
      return tick;
    });

    cfg.labels = labels;
    cfg.maxWidth = maxWidth;
    cfg.maxHeight = maxHeight;
    return cfg;
  }

  _createAxis(coord, scale, verticalScale, dimType, index) {
    const self = this;
    const coordType = coord.type;
    const transposed = coord.transposed;
    let type;
    let key;
    let defaultCfg;
    if (coordType === 'cartesian' || coordType === 'rect') { // 直角坐标系下
      const position = self._getLinePosition(scale, dimType, index);
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
    this.axes[key] = cfg;
  }

  createAxis(coord, xScale, yScales, chart) {
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
    if (chart._isAutoPadding()) {
      const userPadding = Util.parsePadding(chart.get('padding'));
      const appendPadding = chart.get('appendPadding');
      const legendRange = chart.get('legendRange') || {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      };

      const padding = [
        userPadding[0] === 'auto' ? 0 : userPadding[0],
        userPadding[1] === 'auto' ? 0 : userPadding[1],
        userPadding[2] === 'auto' ? 0 : userPadding[2],
        userPadding[3] === 'auto' ? 0 : userPadding[3]
      ];
      padding[0] += legendRange.top + appendPadding * 2; // top 需要给 tooltip 留一些距离
      padding[1] += legendRange.right + appendPadding;
      padding[2] += legendRange.bottom + appendPadding;
      padding[3] += legendRange.left + appendPadding;

      if (coord.isPolar) {
        const circleAxis = axes.circle;
        if (circleAxis) {
          const { maxHeight, maxWidth, labelOffset } = circleAxis;
          padding[0] += maxHeight + labelOffset;
          padding[1] += maxWidth + labelOffset;
          padding[2] += maxHeight + labelOffset;
          padding[3] += maxWidth + labelOffset;
        }
      } else {
        if (axes.right && userPadding[1] === 'auto') {
          const { maxWidth, maxHeight, labelOffset } = axes.right;
          padding[1] += maxWidth + labelOffset;
          padding[0] = Math.max(maxHeight, padding[0]);
          padding[2] = Math.max(maxHeight, padding[2]);
        }

        if (axes.left && userPadding[3] === 'auto') {
          const { maxWidth, maxHeight, labelOffset } = axes.left;
          padding[3] += maxWidth + labelOffset;
          padding[0] = Math.max(maxHeight, padding[0]);
          padding[2] = Math.max(maxHeight, padding[2]);
        }

        if (axes.bottom && userPadding[2] === 'auto') {
          const { maxWidth, maxHeight, labelOffset } = axes.bottom;
          padding[2] += maxHeight + labelOffset;
          padding[1] = Math.max(maxWidth, padding[1]);
          padding[3] = Math.max(maxWidth, padding[3]);
        }
      }

      chart._updateLayout(padding);
    }

    Util.each(axes, axis => {
      const { type, position, grid, verticalScale, ticks, dimType } = axis;
      let appendCfg;
      if (coord.isPolar) {
        if (type === 'Line') {
          appendCfg = self._getRadiusCfg(coord);
        } else if (type === 'Circle') {
          appendCfg = self._getCircleCfg(coord);
        }
      } else {
        appendCfg = self._getLineCfg(coord, position);
      }

      if (grid && verticalScale) {
        const gridPoints = [];
        const verticalTicks = formatTicks(verticalScale.getTicks());

        Util.each(ticks, function(tick) {
          const subPoints = [];
          Util.each(verticalTicks, function(verticalTick) {
            const x = dimType === 'x' ? tick.value : verticalTick.value;
            const y = dimType === 'x' ? verticalTick.value : tick.value;
            const point = coord.convertPoint({
              x,
              y
            });
            subPoints.push({
              x: point.x,
              y: point.y
            });
          });
          gridPoints.push(subPoints);
        });
        axis.gridPoints = gridPoints;
      }

      new Axis[type](Util.mix(axis, appendCfg));
    });
  }

  clear() {
    this.axes = {};
  }
}

module.exports = AxisController;
