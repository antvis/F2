/**
 * @fileOverview axis assist
 * @author dxq613@gmail.com
 */

const Util = require('../../util');
const Axis = require('../../axis/index');
const Global = require('../../global');

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

class AxisAssist {

  constructor(cfg) {
    this.axisCfg = {};
    this.canvas = null;
    Util.mix(this, cfg);
  }

  // 对应的坐标轴是否隐藏
  _isHide(field) {
    const axisCfg = this.axisCfg;
    return !axisCfg || axisCfg[field] === false;
  }

  _getLinePosition(dimType, index) {
    let position = '';
    if (dimType === 'x') {
      position = 'bottom';
    }
    if (dimType === 'y') {
      if (index) {
        position = 'right';
      } else {
        position = 'left';
      }
    }
    return position;
  }

  _getLineCfg(coord, dimType, index) {
    let start;
    let end;
    let factor = 1; // 文本的对齐方式，是顺时针方向还是逆时针方向
    if (dimType === 'x') { // x轴的坐标轴,底部的横坐标
      start = {
        x: 0,
        y: 0
      };
      end = {
        x: 1,
        y: 0
      };
    } else { // y轴坐标轴
      if (index) { // 多轴的情况
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
      startAngle: coord.get('startAngle'),
      endAngle: coord.get('endAngle'),
      center: coord.get('center'),
      radius: coord.get('radius')
    };
  }

  _getRadiusCfg(coord) {
    const transposed = coord.transposed;
    let start;
    let end;
    if (transposed) {
      start = {
        x: 0,
        y: 0
      };
      end = {
        x: 1,
        y: 0
      };
    } else {
      start = {
        x: 0,
        y: 0
      };
      end = {
        x: 0,
        y: 1
      };
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
      canvas: this.canvas
    }, defaultCfg, axisCfg[scale.field]);

    // 计算栅格
    if (cfg.grid && verticalScale) {
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
          subPoints.push(point);
        });
        gridPoints.push(subPoints);
      });
      cfg.gridPoints = gridPoints;
    }
    return cfg;
  }

  _createAxis(coord, scale, verticalScale, dimType, index) {
    const self = this;
    const coordType = coord.get('type');
    const transposed = coord.transposed;
    let C;
    let defaultCfg;
    let appendCfg; // 跟特定坐标轴相关的配置项
    if (coordType === 'cartesian' || coordType === 'rect') { // 直角坐标系下
      C = Axis.Line;
      const position = self._getLinePosition(dimType, index);
      defaultCfg = Global.axis[position];
      appendCfg = self._getLineCfg(coord, dimType, index);
    } else { // 极坐标系下
      if ((dimType === 'x' && !transposed) || (dimType === 'y' && transposed)) { // 圆形坐标轴
        C = Axis.Circle;
        defaultCfg = Global.axis.circle;
        appendCfg = self._getCircleCfg(coord);
      } else { // 半径坐标轴
        C = Axis.Line;
        defaultCfg = Global.axis.radius;
        appendCfg = self._getRadiusCfg(coord);
      }
    }
    let cfg = self._getAxisCfg(coord, scale, verticalScale, dimType, defaultCfg); // 坐标轴的配置项
    cfg = Util.mix({}, cfg, appendCfg);
    const axis = new C(cfg);
    axis.drawGrid();
    return axis;
  }

  /**
   * 绘制坐标轴
   * @param  {Coord} coord 坐标系
   * @param  {Scale} xScale  x轴的度量
   * @param  {Scale} yScales y轴的度量
   */
  createAxis(coord, xScale, yScales) {
    const self = this;
    const arr = [];
    if (xScale && !self._isHide(xScale.field)) {
      const xAxis = self._createAxis(coord, xScale, yScales[0], 'x'); // 绘制 x 轴
      arr.push(xAxis);
    }
    Util.each(yScales, function(yScale, index) {
      if (!self._isHide(yScale.field)) {
        const axis = self._createAxis(coord, yScale, xScale, 'y', index);
        arr.push(axis);
      }
    });

    Util.each(arr, function(axis) {
      axis.draw();
    });
  }

}

module.exports = AxisAssist;
