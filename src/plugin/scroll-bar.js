const Helper = require('../interaction/helper');
const Util = require('../util/common');
const DEFAULT_CFG = {
  mode: 'x',
  xStyle: {
    backgroundColor: 'rgba(202, 215, 239, .2)',
    fillerColor: 'rgba(202, 215, 239, .5)',
    size: 4,
    lineCap: 'round',
    offsetX: 0,
    offsetY: 8
  },
  yStyle: {
    backgroundColor: 'rgba(202, 215, 239, .2)',
    fillerColor: 'rgba(202, 215, 239, .5)',
    size: 4,
    lineCap: 'round',
    offsetX: 8,
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

    if (Util.directionEnabled(mode, 'x')) {
      const { offsetX, offsetY, lineCap, backgroundColor, fillerColor, size } = scrollBarCfg.xStyle;
      const xScale = chart.getXScale();
      let xLimitRange = limitRange[xScale.field];
      if (!xLimitRange) {
        xLimitRange = Helper.getLimitRange(data, xScale);
        limitRange[xScale.field] = xLimitRange;
      }

      const currentRange = Helper.getFieldRange(xScale, xLimitRange, xScale.type);
      let horizontalBar = chart.get('_horizontalBar');
      const yPos = canvasHeight - (size / 2) + offsetY;
      if (horizontalBar) {
        const progressLine = horizontalBar.get('children')[1];

        progressLine.attr({
          x1: Math.max(plotRange.bl.x + plotRange.width * currentRange[0] + offsetX, plotRange.bl.x),
          x2: Math.min(plotRange.bl.x + plotRange.width * currentRange[1] + offsetX, plotRange.br.x)
        });
      } else {
        horizontalBar = backPlot.addGroup({
          className: 'horizontalBar'
        });
        horizontalBar.addShape('line', {
          attrs: {
            x1: plotRange.bl.x + offsetX,
            y1: yPos,
            x2: plotRange.br.x + offsetX,
            y2: yPos,
            lineWidth: size,
            stroke: backgroundColor,
            lineCap
          }
        });
        horizontalBar.addShape('line', {
          attrs: {
            x1: Math.max(plotRange.bl.x + plotRange.width * currentRange[0] + offsetX, plotRange.bl.x),
            y1: yPos,
            x2: Math.min(plotRange.bl.x + plotRange.width * currentRange[1] + offsetX, plotRange.br.x),
            y2: yPos,
            lineWidth: size,
            stroke: fillerColor,
            lineCap
          }
        });
        chart.set('_horizontalBar', horizontalBar);
      }
    }

    if (Util.directionEnabled(mode, 'y')) {
      const { offsetX, offsetY, lineCap, backgroundColor, fillerColor, size } = scrollBarCfg.yStyle;
      const yScale = chart.getYScales()[0];

      let yLimitRange = limitRange[yScale.field];
      if (!yLimitRange) {
        yLimitRange = Helper.getLimitRange(data, yScale);
        limitRange[yScale.field] = yLimitRange;
      }

      const currentRange = Helper.getFieldRange(yScale, yLimitRange, yScale.type);
      let verticalBar = chart.get('_verticalBar');
      const xPos = (size / 2) + offsetX;
      if (verticalBar) {
        const progressLine = verticalBar.get('children')[1];

        progressLine.attr({
          y1: Math.max(plotRange.tl.y + plotRange.height * currentRange[0] + offsetY, plotRange.tl.y),
          y2: Math.min(plotRange.tl.y + plotRange.height * currentRange[1] + offsetY, plotRange.bl.y)
        });
      } else {
        verticalBar = backPlot.addGroup({
          className: 'verticalBar'
        });
        verticalBar.addShape('line', {
          attrs: {
            x1: xPos,
            y1: plotRange.tl.y + offsetY,
            x2: xPos,
            y2: plotRange.bl.y + offsetY,
            lineWidth: size,
            stroke: backgroundColor,
            lineCap
          }
        });
        verticalBar.addShape('line', {
          attrs: {
            x1: xPos,
            y1: Math.max(plotRange.tl.y + plotRange.height * currentRange[0] + offsetY, plotRange.tl.y),
            x2: xPos,
            y2: Math.min(plotRange.tl.y + plotRange.height * currentRange[1] + offsetY, plotRange.bl.y),
            lineWidth: size,
            stroke: fillerColor,
            lineCap
          }
        });
        chart.set('_verticalBar', verticalBar);
      }
    }
  }
};
