const Util = require('../util/common');
const Interaction = require('./base');
const Chart = require('../chart/chart');
const Helper = require('./helper');

let Hammer = require('hammerjs');
Hammer = typeof (Hammer) === 'function' ? Hammer : window.Hammer;

class Pan extends Interaction {
  getDefaultCfg() {
    const defaultCfg = super.getDefaultCfg();
    return Util.mix({}, defaultCfg, {
      startEvent: 'panstart',
      processingEvent: 'panmove',
      endEvent: 'panend',
      resetEvent: '',
      mode: 'x', // 方向，可取值 x、y、xy
      rangeMin: null, // 平移的最小范围限制
      rangeMax: null, // 平移的最大范围限制
      threshold: 10, // Minimal pan distance required before recognizing.
      currentDeltaX: null,
      currentDeltaY: null,
      panning: false
      // animate: null // TODO
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

    this.hammer = hammer;
  }

  clearEvents() {
    const hammer = this.hammer;
    if (hammer) {
      const { startEvent, processingEvent, endEvent, resetEvent } = this;
      startEvent && hammer.remove(startEvent);
      processingEvent && hammer.remove(processingEvent);
      endEvent && hammer.remove(endEvent);
      resetEvent && hammer.remove(resetEvent);
    }
  }

  start(e) {
    const chart = this.chart;
    const middlePlot = chart.get('middlePlot');
    if (!middlePlot.attr('clip')) {
      Helper.createClip(chart);
    }

    this.currentDeltaX = 0;
    this.currentDeltaY = 0;
    this._handlePan(e);
  }

  process(e) {
    this._handlePan(e);
  }

  end() {
    const self = this;
    self.currentDeltaX = null;
    self.currentDeltaY = null;
    const chart = self.chart;
    if (chart.get('animate') !== false) {
      chart.animate({
        'axis-grid': false
      });
    }

    // setTimeout(() => {
    //   self.panning = false;
    //   if (self.onPanend) {
    //     self.onPanend(e, self.chart);
    //   }
    // }, 100);
  }

  _handlePan(e) {
    const { currentDeltaX, currentDeltaY } = this;
    if (currentDeltaX !== null && currentDeltaY !== null) {
      this.panning = true;
      const deltaX = e.deltaX - currentDeltaX;
      const deltaY = e.deltaY - currentDeltaY;
      this.currentDeltaX = e.deltaX;
      this.currentDeltaY = e.deltaY;
      this._doPan(deltaX, deltaY);
    }
  }

  _doPan(deltaX, deltaY) {
    const self = this;
    const { mode, chart } = self;
    const coord = chart.get('coord');
    const { start, end } = coord;
    let isScaled;
    if (Helper.directionEnabled(mode, 'x') && deltaX !== 0) {
      const xScale = chart.getXScale();
      const range = end.x - start.x; // 绘图区域宽度
      isScaled = self._panScale(xScale, deltaX, range, 'x');
    }
    if (Helper.directionEnabled(mode, 'y') && deltaY !== 0) {
      const range = start.y - end.y; // 绘图区域高度
      const yScales = chart.getYScales();
      Util.each(yScales, yScale => {
        isScaled = self._panScale(yScale, deltaY, range, 'y');
      });
    }
    if (isScaled) {
      chart.animate({
        'axis-grid': false
      });
      chart.repaint();
    }
    // isScaled && chart.repaint();
  }

  _panScale(scale, delta, range, flag) {
    // 超过用户设置的限制
    if (delta < 0 && Helper.isReachMax(this.rangeMax, scale, flag)) return false;
    if (delta > 0 && Helper.isReachMin(this.rangeMin, scale, flag)) return false;

    const chart = this.chart;
    const { type, field } = scale;
    let colDef = {};
    if (chart.get('colDefs') && chart.get('colDefs')[field]) {
      colDef = chart.get('colDefs')[field];
    }

    if (type === 'linear') {
      const min = scale.min;
      const max = scale.max;
      const ratio = delta / range;
      const panValue = ratio * (max - min);
      const newMax = flag === 'x' ? max - panValue : max + panValue;
      const newMin = flag === 'x' ? min - panValue : min + panValue;

      chart.scale(field, Util.mix(colDef, {
        min: newMin,
        max: newMax,
        nice: false
      }));
    } else if (type === 'timeCat') {
      const values = scale.values;
      const ticks = scale.ticks;
      let gap;
      let tickGap;
      if (values.length > 1) {
        gap = values[1] - values[0];
      } else {
        gap = 86400000;
      }

      if (ticks.length > 1) {
        tickGap = ticks[1] - ticks[0];
      } else {
        tickGap = 86400000;
      }

      const firstValue = values[0];
      const lastValue = values[values.length - 1];
      let newMin;
      let newMax;

      if ((flag === 'x' && delta > 0) || (flag === 'y' && delta < 0)) {
        // newMax = lastValue - gap;
        newMin = firstValue - gap;

        values.pop();
        values.unshift(newMin);

        if (ticks[0] - newMin === tickGap) {
          ticks.unshift(newMin);
        }
      } else if ((flag === 'x' && delta < 0) || (flag === 'y' && delta > 0)) {
        newMax = lastValue + gap;
        // newMin = firstValue + gap;

        values.shift();
        values.push(newMax);
        if (newMax - ticks[ticks.length - 1] === tickGap) {
          ticks.push(newMax);
        }
      }

      chart.scale(field, Util.mix(colDef, {
        values,
        ticks
      }));
    }

    return true;
  }
}

Chart.registerInteraction('pan', Pan);
module.exports = Pan;
