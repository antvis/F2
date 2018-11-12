const Util = require('../util/common');
const Helper = require('./helper');
const Interaction = require('./base');
const Chart = require('../chart/chart');
const FilterPlugin = require('../plugin/filter');
const PressTooltipMixin = require('./mixin/press-tooltip');
const updateScaleMixin = require('./mixin/update-scale');

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
      limitRange: {},
      sensitivity: 1,
      _pinchCumulativeDelta: 0,
      _timestamp: 0
    });
  }

  constructor(cfg, chart) {
    super(cfg, chart);
    const self = this;
    const { hammer } = self;
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

    Util.mix(self, PressTooltipMixin, updateScaleMixin);
    self._bindPress();
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
    this.pinchCumulativeDelta = 0;
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

    if (Util.directionEnabled(mode, 'x') && Util.directionEnabled(_whichAxes, 'x')) { // x
      const xScale = chart.getXScale();
      const xField = xScale.field;
      if (!limitRange[xField]) {
        limitRange[xField] = Helper.getLimitRange(data, xScale);
      }

      if (xScale.isCategory) { // 横轴为分类类型
        self._zoomCatScale(xScale, diff, center);
      } else if (xScale.isLinear) {
        self._zoomLinearScale(xScale, diff, center, 'x');
      }
      const xDef = Helper.getColDef(chart, xField);
      this.xRange = Helper.getFieldRange(xDef, limitRange[xField], xScale.type);
    }

    if (Util.directionEnabled(mode, 'y') && Util.directionEnabled(_whichAxes, 'y')) { // y
      const yScales = chart.getYScales();
      Util.each(yScales, yScale => {
        const yField = yScale.field;
        if (!limitRange[yField]) {
          limitRange[yField] = Helper.getLimitRange(data, yScale);
        }
        yScale.isLinear && self._zoomLinearScale(yScale, diff, center, 'y');
      });
      const yDef = Helper.getColDef(chart, yScales[0].field);
      this.yRange = Helper.getFieldRange(yDef, limitRange[yScales[0].field], yScales[0].type);
    }

    chart.repaint();
  }

  _zoomLinearScale(scale, zoom, center, flag) {
    const chart = this.chart;
    const { min, max, field } = scale;
    const valueRange = max - min;
    const limitRange = this.limitRange;
    const originRange = limitRange[field].max - limitRange[field].min;

    const coord = chart.get('coord');

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
    this.updateLinearScale(field, newMin, newMax);
  }

  // 针对分类类型
  _zoomCatScale(scale, zoom, center) {
    let pinchCumulativeDelta = this._pinchCumulativeDelta;
    const sensitivity = this.sensitivity;
    pinchCumulativeDelta = zoom > 1 ? pinchCumulativeDelta + 1 : pinchCumulativeDelta - 1;
    this._pinchCumulativeDelta = pinchCumulativeDelta;

    const { field, values } = scale;
    const chart = this.chart;
    const coord = chart.get('coord');

    if (!this.originTicks) {
      this.originTicks = scale.ticks;
    }

    const originValues = this.limitRange[field];
    const originValuesLen = originValues.length;
    const minScale = this.minScale || 1;
    const maxScale = this.maxScale || 5;
    const minCount = parseInt(originValuesLen / maxScale);
    const maxCount = parseInt(originValuesLen / minScale);
    const currentLen = values.length;
    if (pinchCumulativeDelta > 0 && currentLen <= minCount) {
      return null;
    }
    if (pinchCumulativeDelta < 0 && currentLen >= maxCount) {
      return null;
    }

    const lastLabelIndex = originValuesLen - 1;
    const firstValue = values[0];
    const lastValue = values[currentLen - 1];
    let minIndex = originValues.indexOf(firstValue);
    let maxIndex = originValues.indexOf(lastValue);
    const chartCenter = (coord.start.x + coord.end.x) / 2;
    const centerPointer = center.x;

    if (Math.abs(pinchCumulativeDelta) > sensitivity) {
      const deltaCount = Math.max(1, parseInt(currentLen * Math.abs(zoom - 1)));
      if (pinchCumulativeDelta < 0) {
        if (centerPointer >= chartCenter) {
          if (minIndex <= 0) {
            maxIndex = Math.min(lastLabelIndex, maxIndex + deltaCount);
          } else {
            minIndex = Math.max(0, minIndex - deltaCount);
          }
        } else if (centerPointer < chartCenter) {
          if (maxIndex >= lastLabelIndex) {
            minIndex = Math.max(0, minIndex - deltaCount);
          } else {
            maxIndex = Math.min(lastLabelIndex, maxIndex + deltaCount);
          }
        }
        this._pinchCumulativeDelta = 0;
      } else if (pinchCumulativeDelta > 0) {
        if (centerPointer >= chartCenter) {
          minIndex = minIndex < maxIndex ? minIndex = Math.min(maxIndex, minIndex + deltaCount) : minIndex;
        } else if (centerPointer < chartCenter) {
          maxIndex = maxIndex > minIndex ? maxIndex = Math.max(minIndex, maxIndex - deltaCount) : maxIndex;
        }
        this._pinchCumulativeDelta = 0;
      }

      const newValues = originValues.slice(minIndex, maxIndex + 1);
      this.updateCatScale(field, newValues, this.originTicks, originValues, minIndex, maxIndex);
    }
  }
}

Chart.registerInteraction('pinch', Pinch);
module.exports = Pinch;
