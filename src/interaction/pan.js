const Util = require('../util/common');
const Interaction = require('./base');
const Chart = require('../chart/chart');
const Helper = require('./helper');

let Hammer = require('hammerjs');
Hammer = typeof (Hammer) === 'function' ? Hammer : window.Hammer;

const DAY_TIMESTAMPS = 86400000;

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
    this.currentDeltaY = 0;
    this._handlePan(e);
  }

  process(e) {
    if (this.pressed) return;

    this._handlePan(e);
  }

  end() {
    if (this.pressed) return;

    const self = this;
    self.currentDeltaX = null;
    self.currentDeltaY = null;
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
    let isXScaled;
    let isYScaled;
    if (Helper.directionEnabled(mode, 'x') && deltaX !== 0) {
      const xScale = chart.getXScale();
      const range = end.x - start.x; // 绘图区域宽度
      isXScaled = self._panScale(xScale, deltaX, range, 'x');
    }
    if (Helper.directionEnabled(mode, 'y') && deltaY !== 0) {
      const range = start.y - end.y; // 绘图区域高度
      const yScales = chart.getYScales();
      Util.each(yScales, yScale => {
        isYScaled = self._panScale(yScale, deltaY, range, 'y');
      });
    }
    if (isXScaled || isYScaled) {
      chart.repaint();
    }
  }

  _panScale(scale, delta, range, flag) {
    const { rangeMin, rangeMax } = this;
    // 超过用户设置的限制，防止重复绘制
    if (delta < 0 && Helper.isReachMax(rangeMax, scale, flag)) return false;
    if (delta > 0 && Helper.isReachMin(rangeMin, scale, flag)) return false;

    const chart = this.chart;
    const { type, field } = scale;
    let colDef = {};
    if (chart.get('colDefs') && chart.get('colDefs')[field]) {
      colDef = chart.get('colDefs')[field];
    }

    const ratio = delta / range;

    if (type === 'linear') {
      const min = scale.min;
      const max = scale.max;
      const panValue = ratio * (max - min);
      let newMax = flag === 'x' ? max - panValue : max + panValue;
      let newMin = flag === 'x' ? min - panValue : min + panValue;

      newMax = Helper.limitRangeMax(rangeMax, scale, flag, newMax);
      newMin = Helper.limitRangeMin(rangeMin, scale, flag, newMin);

      chart.scale(field, Util.mix({}, colDef, {
        min: newMin,
        max: newMax,
        nice: false
      }));
    } else if (type === 'timeCat') {
      const values = scale.values;
      const ticks = scale.ticks;
      const valueLength = values.length;
      const tickLength = ticks.length;
      const gap = valueLength > 1 ? values[1] - values[0] : DAY_TIMESTAMPS;
      const tickGap = tickLength > 1 ? ticks[1] - ticks[0] : DAY_TIMESTAMPS;
      let deltaCount = Math.abs(parseInt(ratio * valueLength));
      deltaCount = Math.max(1, deltaCount);

      const firstValue = values[0];
      const lastValue = values[valueLength - 1];
      let newMin;
      let newMax;

      if ((flag === 'x' && delta > 0) || (flag === 'y' && delta < 0)) {
        for (let i = 1; i <= deltaCount; i++) {
          // newMin = firstValue - gap * i;
          newMin = Helper.limitRangeMin(rangeMin, scale, flag, firstValue - gap * i);
          values.pop();
          values.unshift(newMin);
          if (ticks[0] - newMin === tickGap) {
            ticks.unshift(newMin);
          }
          if (newMin !== firstValue - gap * i) {
            break;
          }
        }
      } else if ((flag === 'x' && delta < 0) || (flag === 'y' && delta > 0)) {
        for (let i = 1; i <= deltaCount; i++) {
          newMax = Helper.limitRangeMax(rangeMax, scale, flag, lastValue + gap * i);

          // newMax = lastValue + gap * i;
          values.shift();
          values.push(newMax);
          if (newMax - ticks[tickLength - 1] === tickGap) {
            ticks.push(newMax);
          }

          if (newMax !== lastValue + gap * i) {
            break;
          }
        }
      }

      chart.scale(field, Util.mix({}, colDef, {
        values,
        ticks
      }));
    }

    return true;
  }
}

Chart.registerInteraction('pan', Pan);
module.exports = Pan;
