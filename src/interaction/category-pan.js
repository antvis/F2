const Util = require('../util/common');
const Interaction = require('./base');
const Chart = require('../chart/chart');
const Helper = require('./helper');

let Hammer = require('hammerjs');
Hammer = typeof (Hammer) === 'function' ? Hammer : window.Hammer;

const DAY_TIMESTAMPS = 86400000;

class CatPan extends Interaction {
  getDefaultCfg() {
    const defaultCfg = super.getDefaultCfg();
    return Util.mix({}, defaultCfg, {
      startEvent: 'panstart',
      processingEvent: 'panmove',
      endEvent: 'panend',
      resetEvent: '',
      threshold: 10, // Minimal pan distance required before recognizing.
      currentDeltaX: null,
      panning: false,
      originValues: null
    });
  }

  bindEvents() {
    const el = this.el;
    const { startEvent, processingEvent, endEvent, resetEvent, threshold } = this;
    const hammer = new Hammer(el);
    hammer.get('pan').set({ threshold });

    startEvent && hammer.on(startEvent, Util.wrapBehavior(this, '_start'));
    processingEvent && hammer.on(processingEvent, Util.wrapBehavior(this, '_process'));
    endEvent && hammer.on(endEvent, Util.wrapBehavior(this, '_end'));
    resetEvent && hammer.on(resetEvent, Util.wrapBehavior(this, '_reset'));

    // TODO
    hammer.on('press', Util.wrapBehavior(this, '_press'));
    Util.addEventListener(el, 'touchend', Util.wrapBehavior(this, 'ontouchend'));
    // TODO

    this.hammer = hammer;
  }

  clearEvents() {
    const hammer = this.hammer;
    if (hammer) {
      hammer.destroy();
      // TODO
      Util.removeEventListener(this.el, 'touchend', Util.getWrapBehavior(this, 'ontouchend'));
      // TODO
    }
  }

  _press(e) {
    this.pressed = true;
    const center = e.center;
    this.chart.tooltip(true);
    this.chart.showTooltip(center);
  }

  ontouchend() {
    const self = this;
    self.pressed = false;
    self.chart.hideTooltip();
    self.chart.tooltip(false);
  }

  start(e) {
    if (this.pressed) return;
    const chart = this.chart;
    const middlePlot = chart.get('middlePlot');
    if (!middlePlot.attr('clip')) {
      Helper.createClip(chart);
    }

    this.currentDeltaX = 0;
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
  }

  _handlePan(e) {
    const currentDeltaX = this.currentDeltaX;
    if (currentDeltaX !== null) {
      this.panning = true;
      const deltaX = e.deltaX - currentDeltaX;
      this.currentDeltaX = e.deltaX;
      this._doPan(deltaX);
    }
  }

  _doPan(deltaX) {
    const chart = this.chart;
    const coord = chart.get('coord');
    const { start, end } = coord;
    const xScale = chart.getXScale();
    const range = end.x - start.x; // 绘图区域宽度
    this._panScale(xScale, deltaX, range);
    chart.repaint();
  }

  _panScale(scale, delta, range) {
    const chart = this.chart;
    const { type, field, values, ticks } = scale;
    let colDef = {};
    if (chart.get('colDefs') && chart.get('colDefs')[field]) {
      colDef = chart.get('colDefs')[field];
    }

    if (!this.originValues || chart.get('dataChanged')) {
      const data = chart.get('data');
      const originValues = [];
      data.map(obj => {
        let value = obj[field];
        if (type === 'timeCat') {
          value = scale._toTimeStamp(value);
        }
        if (originValues.indexOf(value) === -1) {
          originValues.push(value);
        }
        return obj;
      });
      this.originValues = originValues;
    }

    const ratio = delta / range;
    const valueLength = values.length;
    let deltaCount = Math.abs(parseInt(ratio * valueLength));
    deltaCount = Math.max(1, deltaCount); // 变动的个数

    let firstIndex = this.originValues.indexOf(values[0]);
    let lastIndex = this.originValues.indexOf(values[valueLength - 1]);
    if (delta > 0 && firstIndex >= 0) { // 右移
      for (let i = 0; i < deltaCount && firstIndex > 0; i++) {
        firstIndex -= 1;
        lastIndex -= 1;
      }
      const newValues = this.originValues.slice(firstIndex, lastIndex + 1);

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
    } else if (delta < 0 && lastIndex <= this.originValues.length - 1) { // 左移
      for (let i = 0; i < deltaCount && lastIndex < this.originValues.length - 1; i++) {
        firstIndex += 1;
        lastIndex += 1;
      }
      const newValues = this.originValues.slice(firstIndex, lastIndex + 1);

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

Chart.registerInteraction('catPan', CatPan);
module.exports = CatPan;
