const Util = require('../util/common');
const Helper = require('./helper');
const Interaction = require('./base');
const Chart = require('../chart/chart');
const FilterPlugin = require('../plugin/filter');
const DAY_TIMESTAMPS = 86400000;

const TOUCH_EVENTS = [
  'touchstart',
  'touchmove',
  'touchend',
  'touchStart',
  'touchMove',
  'touchEnd'
];

class Pan extends Interaction {
  getDefaultCfg() {
    let defaultCfg = super.getDefaultCfg();
    defaultCfg = Util.mix({}, defaultCfg, {
      startEvent: 'panstart',
      processEvent: 'panmove',
      endEvent: 'panend',
      resetEvent: 'touchend',
      mode: 'x',
      panThreshold: 10, // Minimal pan distance required before recognizing
      pressThreshold: 9, // Minimal movement that is allowed while pressing
      pressTime: 251, // Minimal press time in ms
      currentDeltaX: null,
      currentDeltaY: null,
      panning: false,
      limitRange: {},
      _timestamp: 0,
      lastPoint: null
    });

    if (Util.isWx || Util.isMy) { // 小程序
      defaultCfg.startEvent = 'touchstart';
      defaultCfg.processEvent = 'touchmove';
      defaultCfg.endEvent = 'touchend';
    }

    return defaultCfg;
  }

  constructor(cfg, chart) {
    super(cfg, chart);
    const self = this;
    const { hammer, panThreshold, pressThreshold, pressTime } = self;

    if (hammer) {
      hammer.get('pan').set({
        threshold: panThreshold
      });
    }

    const tooltipController = chart.get('tooltipController');
    if (tooltipController && tooltipController.enable) {
      chart.tooltip(false);
      if (hammer) {
        hammer.get('press').set({
          threshold: pressThreshold,
          time: pressTime
        });
        hammer.on('press', Util.wrapBehavior(this, '_handlePress'));
      } else {
        Util.addEventListener(this.el, 'press', Util.wrapBehavior(this, '_handlePress'));
      }
    }

    chart.registerPlugins([ FilterPlugin, {
      changeData() {
        self.limitRange = {};
      },
      clear() {
        self.limitRange = {};
      }
    }]);
  }

  start(e) {
    if (this.pressed) return;
    this.currentDeltaX = 0;
    this.currentDeltaY = 0;
    if (e.type === 'touchstart' || e.type === 'touchStart') {
      this.lastPoint = e.touches[0];
    }
    this._handlePan(e);
  }

  process(e) {
    if (this.pressed) return;
    this._handlePan(e);
  }

  end() {
    if (this.pressed) return;
    this.currentDeltaX = null;
    this.currentDeltaY = null;
    this.lastPoint = null;
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
    const center = e.center || e.touches[0];
    this.chart.tooltip(true);
    this.chart.showTooltip(center);
  }

  _handlePan(e) {
    const { currentDeltaX, currentDeltaY, lastPoint } = this;
    let deltaX;
    let deltaY;
    if (TOUCH_EVENTS.indexOf(e.type) !== -1) {
      const currentPoint = e.touches[0];
      deltaX = currentPoint.x - lastPoint.x;
      deltaY = currentPoint.y - lastPoint.y;
      this.lastPoint = currentPoint;
    } else if (currentDeltaX !== null && currentDeltaY !== null) {
      this.panning = true;
      deltaX = e.deltaX - currentDeltaX;
      deltaY = e.deltaY - currentDeltaY;
      this.currentDeltaX = e.deltaX;
      this.currentDeltaY = e.deltaY;
    }

    if (!Util.isNil(deltaX) || !Util.isNil(deltaY)) {
      const lastTimestamp = this._timestamp;
      const now = +new Date();
      if ((now - lastTimestamp) > 16) {
        this._doPan(deltaX, deltaY);
        this._timestamp = now;
      }
    }
  }

  _doPan(deltaX, deltaY) {
    const self = this;
    const { mode, chart, limitRange } = self;
    const coord = chart.get('coord');
    const { start, end } = coord;
    const data = chart.get('data');
    if (Helper.directionEnabled(mode, 'x') && deltaX !== 0) {
      const xScale = chart.getXScale();
      const xField = xScale.field;
      if (!limitRange[xField]) {
        limitRange[xField] = Helper._getLimitRange(data, xScale);
      }

      const coordWidth = end.x - start.x;

      if (xScale.isCategory) {
        self._panCatScale(xScale, deltaX, coordWidth);
      } else if (xScale.isLinear) {
        self._panLinearScale(xScale, deltaX, coordWidth, 'x');
      }
      const xDef = Helper.getColDef(chart, xField);
      this.xRange = Helper._getFieldRange(xDef, limitRange[xField], xScale.type);
    }

    if (Helper.directionEnabled(mode, 'y') && deltaY !== 0) {
      const coordHeight = start.y - end.y;
      const yScales = chart.getYScales();
      Util.each(yScales, yScale => {
        const yField = yScale.field;
        if (!limitRange[yField]) {
          limitRange[yField] = Helper._getLimitRange(data, yScale);
        }

        yScale.isLinear && self._panLinearScale(yScale, deltaY, coordHeight, 'y');
      });
      const yDef = Helper.getColDef(chart, yScales[0].field);
      this.yRange = Helper._getFieldRange(yDef, limitRange[yScales[0].field], yScales[0].type);
    }
    chart.repaint();
  }

  _panLinearScale(scale, delta, range, flag) {
    const { field, min, max } = scale;
    const limitRange = this.limitRange;

    if (min === limitRange[field].min && max === limitRange[field].max) return;

    const chart = this.chart;
    const ratio = delta / range;
    const panValue = ratio * (max - min);
    let newMax = flag === 'x' ? max - panValue : max + panValue;
    let newMin = flag === 'x' ? min - panValue : min + panValue;
    if (limitRange[field] && !Util.isNil(limitRange[field].min) && newMin <= limitRange[field].min) {
      newMin = limitRange[field].min;
      newMax = (max - min) + newMin;
    }
    if (limitRange[field] && !Util.isNil(limitRange[field].max) && newMax >= limitRange[field].max) {
      newMax = limitRange[field].max;
      newMin = newMax - (max - min);
    }
    const colDef = Helper.getColDef(chart, field);
    chart.scale(field, Util.mix({}, colDef, {
      min: newMin,
      max: newMax,
      nice: false
    }));
  }

  _panCatScale(scale, delta, range) {
    const chart = this.chart;
    const { type, field, values, ticks } = scale;
    const colDef = Helper.getColDef(chart, field);

    const originValues = this.limitRange[field];
    const ratio = delta / range;
    const valueLength = values.length;
    const deltaCount = Math.max(1, Math.abs(parseInt(ratio * valueLength)));

    let firstIndex = originValues.indexOf(values[0]);
    let lastIndex = originValues.indexOf(values[valueLength - 1]);
    if (delta > 0 && firstIndex >= 0) { // right
      for (let i = 0; i < deltaCount && firstIndex > 0; i++) {
        firstIndex -= 1;
        lastIndex -= 1;
      }
      const newValues = originValues.slice(firstIndex, lastIndex + 1);
      let newTicks = null;
      if (type === 'timeCat') {
        const tickGap = ticks.length > 2 ? ticks[1] - ticks[0] : DAY_TIMESTAMPS;
        for (let i = ticks[0] - tickGap; i >= newValues[0]; i -= tickGap) {
          ticks.unshift(i);
        }
        newTicks = ticks;
      }

      chart.scale(field, Util.mix({}, colDef, {
        values: newValues,
        ticks: newTicks
      }));
    } else if (delta < 0 && lastIndex <= originValues.length - 1) { // left
      for (let i = 0; i < deltaCount && lastIndex < originValues.length - 1; i++) {
        firstIndex += 1;
        lastIndex += 1;
      }
      const newValues = originValues.slice(firstIndex, lastIndex + 1);

      let newTicks = null;
      if (type === 'timeCat') {
        const tickGap = ticks.length > 2 ? ticks[1] - ticks[0] : DAY_TIMESTAMPS;
        for (let i = ticks[ticks.length - 1] + tickGap; i <= newValues[newValues.length - 1]; i += tickGap) {
          ticks.push(i);
        }
        newTicks = ticks;
      }

      chart.scale(field, Util.mix({}, colDef, {
        values: newValues,
        ticks: newTicks
      }));
    }
  }
}

Chart.registerInteraction('pan', Pan);
module.exports = Pan;
