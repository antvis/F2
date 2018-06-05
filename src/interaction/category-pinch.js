const Util = require('../util/common');
const Helper = require('./helper');
const Interaction = require('./base');
const Chart = require('../chart/chart');

let Hammer = require('hammerjs');
Hammer = typeof (Hammer) === 'function' ? Hammer : window.Hammer;

class CatPinch extends Interaction {
  getDefaultCfg() {
    const defaultCfg = super.getDefaultCfg();
    return Util.mix({}, defaultCfg, {
      startEvent: 'pinchstart',
      processingEvent: 'pinch',
      endEvent: 'pinchend',
      resetEvent: '',
      mode: 'x', // 方向，可取值 x、y、xy
      currentPinchScaling: null, // 当前
      originValues: null,
      minScale: 1,
      maxScale: 4
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
    this._doZoom(diff, center);

    // Keep track of overall scale
    this.currentPinchScaling = e.scale;
  }

  _doZoom(diff, center) {
    const self = this;
    // const mode = self.mode;
    const chart = self.chart;
    const xScale = chart.getXScale();
    self._zoomScale(xScale, diff, center);
    chart.repaint();
  }

  _zoomScale(scale, zoom, center) {
    const { type, field, values } = scale;
    const chart = this.chart;
    const coord = chart.get('coord');
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
      this.originTicks = scale.ticks;
    }

    const minCount = this.originValues.length / this.maxScale;
    const maxCount = this.originValues.length / this.minScale;

    const valuesLength = values.length;
    const offsetPoint = coord.invertPoint(center);
    const percent = offsetPoint.x;
    const deltaCount = parseInt(valuesLength * Math.abs(zoom - 1));
    const minDelta = parseInt(deltaCount * (percent));
    const maxDelta = deltaCount - minDelta;

    if (zoom >= 1 && valuesLength >= minCount) { // 放大
      const newValues = values.slice(minDelta, valuesLength - maxDelta);
      chart.scale(field, Util.mix({}, colDef, {
        values: newValues,
        ticks: this.originTicks
      }));
    } else if (zoom < 1 && valuesLength <= maxCount) { // 缩小
      const firstIndex = this.originValues.indexOf(values[0]);
      const lastIndex = this.originValues.indexOf(values[valuesLength - 1]);
      const minIndex = Math.max(0, firstIndex - minDelta);
      const maxIndex = Math.min(lastIndex + maxDelta, this.originValues.length);
      const newValues = this.originValues.slice(minIndex, maxIndex);
      chart.scale(field, Util.mix({}, colDef, {
        values: newValues,
        ticks: this.originTicks
      }));
    }
  }
}


Chart.registerInteraction('catPinch', CatPinch);
module.exports = CatPinch;
