const Util = require('../util/common');
const Helper = require('./helper');
const Interaction = require('./base');
const Chart = require('../chart/chart');

let Hammer = require('hammerjs');
Hammer = typeof (Hammer) === 'function' ? Hammer : window.Hammer;

class Zoom extends Interaction {
  getDefaultCfg() {
    const defaultCfg = super.getDefaultCfg();
    return Util.mix({}, defaultCfg, {
      startEvent: 'pinchstart',
      processingEvent: 'pinch',
      endEvent: 'pinchend',
      resetEvent: '',
      mode: 'x', // 方向，可取值 x、y、xy
      rangeMin: null, // 缩放的最小范围限制
      rangeMax: null, // 缩放的最大范围限制
      currentPinchScaling: null // 当前
    });
  }

  bindEvents() {
    const el = this.el;
    const hammer = new Hammer(el);
    hammer.get('pinch').set({
      enable: true
    });

    const { startEvent, processingEvent, endEvent, resetEvent } = this;
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
    this.chart.hideTooltip();
    self.chart.tooltip(false);
  }

  start() {
    const chart = this.chart;
    const middlePlot = chart.get('middlePlot');
    if (!middlePlot.attr('clip')) {
      Helper.createClip(chart);
    }
    this.currentPinchScaling = 1;
  }

  process(e) {
    this._handlePinch(e);
  }

  end(e) {
    this._handlePinch(e);
    this.currentPinchScaling = null; // reset
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
    this._doZoom(diff, center, xy);

    // Keep track of overall scale
    this.currentPinchScaling = e.scale;
  }

  _doZoom(diff, center, whichAxes) {
    const self = this;
    const mode = self.mode;
    const chart = self.chart;
    // Which axe should be modified when figers were used.
    let _whichAxes;
    if (mode === 'xy' && whichAxes !== undefined) {
      // based on fingers positions
      _whichAxes = whichAxes;
    } else {
      _whichAxes = 'xy';
    }
    let isXScaled;
    let isYScaled;

    if (Helper.directionEnabled(mode, 'x') && Helper.directionEnabled(_whichAxes, 'x')) { // x
      const xScale = chart.getXScale();
      isXScaled = self._zoomScale(xScale, diff, center, 'x');
    }

    if (Helper.directionEnabled(mode, 'y') && Helper.directionEnabled(_whichAxes, 'y')) { // y
      const yScales = chart.getYScales();
      Util.each(yScales, yScale => {
        isYScaled = self._zoomScale(yScale, diff, center, 'y');
      });
    }
    if (isXScaled || isYScaled) {
      chart.repaint();
    }
  }

  _zoomScale(scale, zoom, center, flag) {
    const { type, field } = scale;
    const { rangeMin, rangeMax } = this;

    // 超过用户设置的限制
    if (zoom > 1 && Helper.isReachMax(this.rangeMax, scale, flag)) return false; // 放大
    if (zoom < 1 && Helper.isReachMin(this.rangeMin, scale, flag)) return false; // 缩小

    const chart = this.chart;
    const coord = chart.get('coord');
    let colDef = {};
    if (chart.get('colDefs') && chart.get('colDefs')[field]) {
      colDef = chart.get('colDefs')[field];
    }

    if (type === 'linear') {
      const { min, max } = scale;
      const valueRange = max - min;
      const newDiff = valueRange * (zoom - 1);
      const offsetPoint = coord.invertPoint(center);
      const percent = flag === 'x' ? offsetPoint.x : offsetPoint.y;
      const minDelta = newDiff * percent;
      const maxDelta = newDiff * (1 - percent);
      const newMax = Helper.limitRangeMax(rangeMax, scale, flag, max - maxDelta);
      const newMin = Helper.limitRangeMin(rangeMin, scale, flag, min + minDelta);
      chart.scale(field, Util.mix({}, colDef, {
        min: newMin,
        max: newMax,
        nice: false
      }));
    } else if (type === 'timeCat') { // 时间类型，往前缩放 TODO 还是有问题
      const values = scale.values;
      const ticks = scale.ticks;

      if (!this.originValuesLen) {
        this.originValuesLen = values.length;
      }
      if (!this.originTicksLen) {
        this.originTicksLen = ticks.length;
      }

      if (zoom > 1 && values.length <= 2) return false;
      if (zoom < 1 && values.length > this.originValuesLen) return false;

      const gap = values[1] - values[0];
      const tickGap = (ticks.length > 1) ? ticks[1] - ticks[0] : 86400000;

      let diffCount = Math.ceil(values.length * Math.abs(zoom - 1));
      // diffCount = Math.max(1, diffCount);
      if (zoom > 1) {
        if (diffCount >= values.length) {
          diffCount = values.length - 2;
        }
        values.splice(0, diffCount);

        const firstValue = values[0];
        const firstTick = ticks[0];
        const tickDiff = parseInt((firstValue - firstTick) / tickGap);
        tickDiff && ticks.splice(0, tickDiff);
      } else if (zoom < 1) {
        const headValue = values[0];
        for (let i = 1; i <= diffCount; i++) {
          if (values.length === this.originValuesLen) {
            break;
          }
          const newMin = headValue - gap * i;
          values.unshift(newMin);
          if (ticks[0] - newMin === tickGap) {
            ticks.unshift(newMin);
          }
        }
      }

      chart.scale(field, Util.mix({}, colDef, {
        values,
        ticks
      }));
      return true;
    }
  }
}


Chart.registerInteraction('zoom', Zoom);
module.exports = Zoom;
