const Helper = require('./helper');
const TimeUtil = require('@antv/scale/lib/time-util');
const Util = require('../../util/common');

function _getLimitRange(data, field, type, scale) {
  let result;
  const values = Util.Array.values(data, field);
  if (type === 'linear') {
    result = Util.Array.getRange(values);
    // 调整范围
    if (scale.min < result.min) {
      result.min = scale.min;
    }
    if (scale.max > result.max) {
      result.max = scale.max;
    }
  } else if (type === 'timeCat') {
    Util.each(values, (v, i) => {
      values[i] = TimeUtil.toTimeStamp(v);
    });
    values.sort(function(v1, v2) {
      return v1 - v2;
    });
    result = values;
  } else {
    result = values;
  }
  return result;
}

function _getFieldRange(scale, limitRange) {
  const { type } = scale;
  let minRatio = 0;
  let maxRatio = 0;
  if (type === 'linear') {
    const { min, max } = limitRange;
    minRatio = (scale.min - min) / (max - min);
    maxRatio = (scale.max - min) / (max - min);
  } else {
    const originValues = limitRange;
    const values = scale.values;
    const firstIndex = originValues.indexOf(values[0]);
    const lastIndex = originValues.indexOf(values[values.length - 1]);
    minRatio = firstIndex / (originValues.length - 1);
    maxRatio = lastIndex / (originValues.length - 1);
  }
  return [ minRatio, maxRatio ];
}

module.exports = {
  clearInner(chart) {
    const hBar = chart.get('_horizontalBar');
    const vBar = chart.get('_verticalBar');
    hBar && hBar.remove(true);
    vBar && vBar.remove(true);
    chart.set('_horizontalBar', null);
    chart.set('_verticalBar', null);
  },
  changeData(chart) {
    chart.set('_limitRange', null);
    const interactions = chart._interactions;
    if (interactions.pan) {
      interactions.pan.limitRange = {};
    } else if (interactions.pinch) {
      interactions.pinch.limitRange = {};
    }
  },
  afterGeomDraw(chart) {
    let range = chart.get('_limitRange');
    const data = chart.get('data');
    const xScale = chart.getXScale();
    const yScales = chart.getYScales();
    const interactions = chart._interactions;

    if (!range) {
      range = {};
      if (interactions.pan) { // 以 pan 中设置的 limitRange 为主
        const { mode, limitRange } = interactions.pan;
        if (Helper.directionEnabled(mode, 'x')) {
          const { field, type } = xScale;
          if (!limitRange[field]) {
            limitRange[field] = _getLimitRange(data, field, type, xScale);
          }
          range[field] = limitRange[field];
        }

        if (Helper.directionEnabled(mode, 'y')) {
          Util.each(yScales, yScale => {
            const { field, type } = yScale;
            if (!limitRange[field]) {
              limitRange[field] = _getLimitRange(data, field, type, yScale);
            }
            range[field] = limitRange[field];
          });
        }
      }

      if (interactions.pinch) { // pinch 不开放 limitRange 接口
        const { mode, limitRange } = interactions.pinch;
        if (Helper.directionEnabled(mode, 'x')) {
          const { field, type } = xScale;
          if (!range[field]) {
            range[field] = _getLimitRange(data, field, type, xScale);
          }
          limitRange[field] = range[field];
        }

        if (Helper.directionEnabled(mode, 'y')) {
          Util.each(yScales, yScale => {
            const { field, type } = yScale;
            if (!range[field]) {
              range[field] = _getLimitRange(data, field, type, yScale);
            }
            limitRange[field] = range[field];
          });
        }
      }

      chart.set('_limitRange', range);
    }

    let isShowBar = false;
    Util.each(interactions, interaction => {
      if (interaction.showBar) {
        isShowBar = true;
        return false;
      }
    });

    if (!isShowBar) return;

    // 绘制状态栏
    const xField = xScale.field;
    const yField = yScales[0].field;
    const plotRange = chart.get('plotRange');
    const backPlot = chart.get('backPlot');
    const canvas = chart.get('canvas');
    const canvasHeight = canvas.get('height');
    const barSize = 4;

    if (range[xField]) { // x 轴
      const currentRange = _getFieldRange(xScale, range[xField]);
      let horizontalBar = chart.get('_horizontalBar');
      if (horizontalBar) {
        const progressLine = horizontalBar.get('children')[1];

        progressLine.attr({
          x1: Math.max(plotRange.bl.x + plotRange.width * currentRange[0], plotRange.bl.x),
          x2: Math.min(plotRange.bl.x + plotRange.width * currentRange[1], plotRange.br.x)
        });
      } else {
        horizontalBar = backPlot.addGroup({
          className: 'horizontalBar'
        });
        horizontalBar.addShape('line', {
          attrs: {
            x1: plotRange.bl.x,
            y1: canvasHeight - barSize / 2,
            x2: plotRange.br.x,
            y2: canvasHeight - barSize / 2,
            lineWidth: barSize,
            stroke: 'rgba(202, 215, 239, 0.2)',
            lineCap: 'round'
          }
        });
        horizontalBar.addShape('line', {
          attrs: {
            x1: Math.max(plotRange.bl.x + plotRange.width * currentRange[0], plotRange.bl.x),
            y1: canvasHeight - barSize / 2,
            x2: Math.min(plotRange.bl.x + plotRange.width * currentRange[1], plotRange.br.x),
            y2: canvasHeight - barSize / 2,
            lineWidth: barSize,
            stroke: 'rgba(202, 215, 239, 0.5)',
            lineCap: 'round'
          }
        });
        chart.set('_horizontalBar', horizontalBar);
      }
    }

    if (range[yField]) { // y 轴
      const currentRange = _getFieldRange(yScales[0], range[yField]);
      let verticalBar = chart.get('_verticalBar');
      if (verticalBar) {
        const progressLine = verticalBar.get('children')[1];

        progressLine.attr({
          y1: Math.max(plotRange.tl.y + plotRange.height * currentRange[0], plotRange.tl.y),
          y2: Math.min(plotRange.tl.y + plotRange.height * currentRange[1], plotRange.bl.y)
        });
      } else {
        verticalBar = backPlot.addGroup({
          className: 'verticalBar'
        });
        verticalBar.addShape('line', {
          attrs: {
            x1: barSize / 2,
            y1: plotRange.tl.y,
            x2: barSize / 2,
            y2: plotRange.bl.y,
            lineWidth: barSize,
            stroke: 'rgba(202, 215, 239, 0.2)',
            lineCap: 'round'
          }
        });
        verticalBar.addShape('line', {
          attrs: {
            x1: barSize / 2,
            y1: Math.max(plotRange.tl.y + plotRange.height * currentRange[0], plotRange.tl.y),
            x2: barSize / 2,
            y2: Math.min(plotRange.tl.y + plotRange.height * currentRange[1], plotRange.bl.y),
            lineWidth: barSize,
            stroke: 'rgba(202, 215, 239, 0.5)',
            lineCap: 'round'
          }
        });
        chart.set('_verticalBar', verticalBar);
      }
    }
  }
};
