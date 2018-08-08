const Helper = require('../interaction/helper');
const Util = require('../util/common');
const DEFAULT_CFG = {
  mode: 'x',
  xStyle: {
    backgroundColor: 'rgba(202, 215, 239, 0.5)',
    fillerColor: 'rgb(202, 215, 239)',
    size: 4,
    lineCap: 'round',
    offsetX: 0,
    offsetY: 0
  },
  yStyle: {
    backgroundColor: 'rgba(202, 215, 239, 0.5)',
    fillerColor: 'rgb(202, 215, 239)',
    size: 4,
    lineCap: 'round',
    offsetX: 0,
    offsetY: 0
  }
};

module.exports = {
  init(chart) {
    chart.set('_limitRange', {});
    chart.scrollBar = function(cfg) {
      if (cfg === true) {
        cfg = DEFAULT_CFG;
      } else if (Util.isObject(cfg)) {
        cfg = Util.deepMix({}, DEFAULT_CFG, cfg);
      }
      this.set('_scrollBarCfg', cfg);
    };
  },
  clear(chart) {
    chart.set('_limitRange', {});
  },
  changeData(chart) {
    chart.set('_limitRange', {});
  },
  clearInner(chart) {
    const hBar = chart.get('_horizontalBar');
    const vBar = chart.get('_verticalBar');
    hBar && hBar.remove(true);
    vBar && vBar.remove(true);
    chart.set('_horizontalBar', null);
    chart.set('_verticalBar', null);
  },
  afterGeomDraw(chart) {
    const scrollBarCfg = chart.get('_scrollBarCfg');

    if (!scrollBarCfg) return;
    const data = chart.get('data');
    const plotRange = chart.get('plotRange');
    const backPlot = chart.get('backPlot');
    const canvas = chart.get('canvas');
    const canvasHeight = canvas.get('height');
    const limitRange = chart.get('_limitRange');

    const mode = scrollBarCfg.mode;

    if (Helper.directionEnabled(mode, 'x')) {
      const xStyle = scrollBarCfg.xStyle;
      const xScale = chart.getXScale();
      let xLimitRange = limitRange[xScale.field];
      if (!xLimitRange) {
        xLimitRange = Helper._getLimitRange(data, xScale);
        limitRange[xScale.field] = xLimitRange;
      }

      const currentRange = Helper._getFieldRange(xScale, xLimitRange, xScale.type);
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
            y1: canvasHeight - xStyle.size / 2,
            x2: plotRange.br.x,
            y2: canvasHeight - xStyle.size / 2,
            lineWidth: xStyle.size,
            stroke: xStyle.backgroundColor,
            lineCap: xStyle.lineCap
          }
        });
        horizontalBar.addShape('line', {
          attrs: {
            x1: Math.max(plotRange.bl.x + plotRange.width * currentRange[0], plotRange.bl.x),
            y1: canvasHeight - xStyle.size / 2,
            x2: Math.min(plotRange.bl.x + plotRange.width * currentRange[1], plotRange.br.x),
            y2: canvasHeight - xStyle.size / 2,
            lineWidth: xStyle.size,
            stroke: xStyle.fillerColor,
            lineCap: xStyle.lineCap
          }
        });
        chart.set('_horizontalBar', horizontalBar);
      }
    }

    if (Helper.directionEnabled(mode, 'y')) {
      const yStyle = scrollBarCfg.yStyle;
      const yScale = chart.getYScales()[0];

      let yLimitRange = limitRange[yScale.field];
      if (!yLimitRange) {
        yLimitRange = Helper._getLimitRange(data, yScale);
        limitRange[yScale.field] = yLimitRange;
      }

      const currentRange = Helper._getFieldRange(yScale, yLimitRange, yScale.type);
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
            x1: yStyle.size / 2,
            y1: plotRange.tl.y,
            x2: yStyle.size / 2,
            y2: plotRange.bl.y,
            lineWidth: yStyle.size,
            stroke: yStyle.backgroundColor,
            lineCap: yStyle.lineCap
          }
        });
        verticalBar.addShape('line', {
          attrs: {
            x1: yStyle.size / 2,
            y1: Math.max(plotRange.tl.y + plotRange.height * currentRange[0], plotRange.tl.y),
            x2: yStyle.size / 2,
            y2: Math.min(plotRange.tl.y + plotRange.height * currentRange[1], plotRange.bl.y),
            lineWidth: yStyle.size,
            stroke: yStyle.fillerColor,
            lineCap: yStyle.lineCap
          }
        });
        chart.set('_verticalBar', verticalBar);
      }
    }
  }
};
