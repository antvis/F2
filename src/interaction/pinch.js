const Util = require('../util/common');
const Helper = require('./helper');
const Interaction = require('./base');
const Chart = require('../chart/chart');
const FilterPlugin = require('../plugin/filter');

class Pinch extends Interaction {
  getDefaultCfg() {
    const defaultCfg = super.getDefaultCfg();
    return Util.mix({}, defaultCfg, {
      startEvent: 'pinchstart',
      processEvent: 'pinch',
      endEvent: 'pinchend',
      resetEvent: 'touchend',
      pressThreshold: 9, // Minimal movement that is allowed while pressing
      pressTime: 251, // Minimal press time in ms
      mode: 'x',
      currentPinchScaling: null,
      originValues: null,
      minScale: null,
      maxScale: null,
      _timestamp: 0,
      limitRange: {}
    });
  }

  constructor(cfg, chart) {
    super(cfg, chart);
    const self = this;
    const { hammer, pressThreshold, pressTime } = self;
    hammer.get('pinch').set({ // open pinch recognizer
      enable: true
    });

    chart.registerPlugins([ FilterPlugin, {
      changeData() {
        self.limitRange = {};
        self.originTicks = null;
      },
      clear() {
        self.limitRange = {};
        self.originTicks = null;
      }
    }]);

    const tooltipController = chart.get('tooltipController');
    if (tooltipController && tooltipController.enable) {
      chart.tooltip(false);
      hammer.get('press').set({
        threshold: pressThreshold,
        time: pressTime
      });
      hammer.on('press', Util.wrapBehavior(this, '_handlePress'));
    }
  }

  start() {
    if (this.pressed) return;
    this.currentPinchScaling = 1;
  }

  process(e) {
    if (this.pressed) return;
    this._handlePinch(e);
  }

  end(e) {
    if (this.pressed) return;
    this._handlePinch(e);
    this.currentPinchScaling = null; // reset
  }

  reset() {
    const chart = this.chart;
    if (chart.get('tooltipController')) {
      this.pressed = false;
      chart.hideTooltip();
      chart.tooltip(false);
    }
  }

  _handlePress(e) {
    this.pressed = true;
    const center = e.center;
    this.chart.tooltip(true);
    this.chart.showTooltip(center);
  }

  _handlePinch(e) {
    const currentPinchScaling = this.currentPinchScaling;
    const diff = 1 / (currentPinchScaling) * e.scale;
    const rect = e.target.getBoundingClientRect();
    const offsetX = e.center.x - rect.left;
    const offsetY = e.center.y - rect.top;
    const center = {
      x: offsetX,
      y: offsetY
    };

    // fingers position difference
    const x = Math.abs(e.pointers[0].clientX - e.pointers[1].clientX);
    const y = Math.abs(e.pointers[0].clientY - e.pointers[1].clientY);

    // diagonal fingers will change both (xy) axes
    const p = x / y;
    let xy;
    if (p > 0.3 && p < 1.7) {
      xy = 'xy';
    } else if (x > y) {
      xy = 'x';
    } else {
      xy = 'y';
    }
    const lastTimestamp = this._timestamp;
    const now = +new Date();
    if ((now - lastTimestamp) > 16) {
      this._doZoom(diff, center, xy);
      this._timestamp = now;
    }

    // Keep track of overall scale
    this.currentPinchScaling = e.scale;
  }

  _doZoom(diff, center, whichAxes) {
    const self = this;
    const { mode, chart, limitRange } = self;
    // Which axe should be modified when figers were used.
    let _whichAxes;
    if (mode === 'xy' && whichAxes !== undefined) {
      // based on fingers positions
      _whichAxes = whichAxes;
    } else {
      _whichAxes = 'xy';
    }
    const data = chart.get('data');

    if (Helper.directionEnabled(mode, 'x') && Helper.directionEnabled(_whichAxes, 'x')) { // x
      const xScale = chart.getXScale();
      const xField = xScale.field;
      if (!limitRange[xField]) {
        limitRange[xField] = Helper._getLimitRange(data, xScale);
      }

      if (xScale.isCategory) { // 横轴为分类类型
        self._zoomCatScale(xScale, diff, center);
      } else if (xScale.isLinear) {
        self._zoomLinearScale(xScale, diff, center, 'x');
      }
      const xDef = Helper.getColDef(chart, xField);
      this.xRange = Helper._getFieldRange(xDef, limitRange[xField], xScale.type);
    }

    if (Helper.directionEnabled(mode, 'y') && Helper.directionEnabled(_whichAxes, 'y')) { // y
      const yScales = chart.getYScales();
      Util.each(yScales, yScale => {
        const yField = yScale.field;
        if (!limitRange[yField]) {
          limitRange[yField] = Helper._getLimitRange(data, yScale);
        }
        yScale.isLinear && self._zoomLinearScale(yScale, diff, center, 'y');
      });
      const yDef = Helper.getColDef(chart, yScales[0].field);
      this.yRange = Helper._getFieldRange(yDef, limitRange[yScales[0].field], yScales[0].type);
    }

    chart.repaint();
  }

  _zoomLinearScale(scale, zoom, center, flag) {
    const type = scale.type;
    if (type !== 'linear') return;
    const field = scale.field;
    const chart = this.chart;
    const { min, max } = scale;
    const valueRange = max - min;
    const limitRange = this.limitRange;
    const originRange = limitRange[field].max - limitRange[field].min;

    const coord = chart.get('coord');
    const colDef = Helper.getColDef(chart, field);

    let newDiff = valueRange * (zoom - 1);
    if (this.minScale && zoom < 1) { // zoom in
      const maxRange = originRange / this.minScale;
      newDiff = Math.max(valueRange - maxRange, newDiff);
    }

    if (this.maxScale && zoom >= 1) { // zoom out
      const minRange = originRange / this.maxScale;
      newDiff = Math.min(valueRange - minRange, newDiff);
    }

    const offsetPoint = coord.invertPoint(center);
    const percent = flag === 'x' ? offsetPoint.x : offsetPoint.y;
    const minDelta = newDiff * percent;
    const maxDelta = newDiff * (1 - percent);
    const newMax = max - maxDelta;
    const newMin = min + minDelta;

    chart.scale(field, Util.mix({}, colDef, {
      min: newMin,
      max: newMax,
      nice: false
    }));
  }

  _zoomCatScale(scale, zoom, center) {
    const { field, values } = scale;
    const chart = this.chart;
    const coord = chart.get('coord');
    const colDef = Helper.getColDef(chart, field);

    if (!this.originTicks) { // Need to be optimized
      this.originTicks = scale.ticks;
    }

    const originTicks = this.originTicks;
    const originValues = this.limitRange[field];
    const originValuesLen = originValues.length;
    const maxScale = this.maxScale || 4;
    const minScale = this.minScale || 1;
    const minCount = originValuesLen / maxScale;
    const maxCount = originValuesLen / minScale;

    const valuesLength = values.length;
    const offsetPoint = coord.invertPoint(center);
    const percent = offsetPoint.x;
    const deltaCount = parseInt(valuesLength * Math.abs(zoom - 1));
    const minDelta = parseInt(deltaCount * (percent));
    const maxDelta = deltaCount - minDelta;

    if (zoom >= 1 && valuesLength >= minCount) { // zoom out
      const newValues = values.slice(minDelta, valuesLength - maxDelta);
      chart.scale(field, Util.mix({}, colDef, {
        values: newValues,
        ticks: originTicks
      }));
    } else if (zoom < 1 && valuesLength <= maxCount) { // zoom in
      const firstIndex = originValues.indexOf(values[0]);
      const lastIndex = originValues.indexOf(values[valuesLength - 1]);
      const minIndex = Math.max(0, firstIndex - minDelta);
      const maxIndex = Math.min(lastIndex + maxDelta, originValuesLen);
      const newValues = originValues.slice(minIndex, maxIndex);
      chart.scale(field, Util.mix({}, colDef, {
        values: newValues,
        ticks: originTicks
      }));
    }
  }
}

Chart.registerInteraction('pinch', Pinch);
module.exports = Pinch;
