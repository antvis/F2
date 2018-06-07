const Util = require('../util/common');
const Helper = require('./helper');
const Interaction = require('./base');
const Chart = require('../chart/chart');

class LinearPinch extends Interaction {
  getDefaultCfg() {
    const defaultCfg = super.getDefaultCfg();
    return Util.mix({}, defaultCfg, {
      startEvent: 'pinchstart',
      processingEvent: 'pinch',
      endEvent: 'pinchend',
      resetEvent: '',
      mode: 'x', // 方向，可取值 x、y、xy
      currentPinchScaling: null, // 当前
      minScale: null,
      maxScale: null,
      _timestamp: 0
    });
  }

  constructor(cfg, chart) {
    super(cfg, chart);
    const hammer = this.hammer;
    hammer.get('pinch').set({ // open pinch recognizer
      enable: true
    });
    this._originRange = {};
    chart.set('limitInPlot', true);
  }

  start() {
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

    if (Helper.directionEnabled(mode, 'x') && Helper.directionEnabled(_whichAxes, 'x')) { // x
      const xScale = chart.getXScale();
      self._zoomScale(xScale, diff, center, 'x');
    }

    if (Helper.directionEnabled(mode, 'y') && Helper.directionEnabled(_whichAxes, 'y')) { // y
      const yScales = chart.getYScales();
      Util.each(yScales, yScale => {
        self._zoomScale(yScale, diff, center, 'y');
      });
    }

    chart.repaint();
  }

  _zoomScale(scale, zoom, center, flag) {
    const type = scale.type;
    if (type !== 'linear') return;
    const field = scale.field;
    const chart = this.chart;
    const { min, max } = scale;
    const valueRange = max - min;
    if (!this._originRange[field] || chart.get('dataChanged')) {
      this._originRange[field] = valueRange;
    }

    const coord = chart.get('coord');
    let colDef = {};
    if (chart.get('colDefs') && chart.get('colDefs')[field]) {
      colDef = chart.get('colDefs')[field];
    }

    let newDiff = valueRange * (zoom - 1);
    if (this.minScale && zoom < 1) { // 缩小
      const maxRange = this._originRange[field] / this.minScale;
      newDiff = Math.max(valueRange - maxRange, newDiff);
    }

    if (this.maxScale && zoom >= 1) { // 放大
      const minRange = this._originRange[field] / this.maxScale;
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
}

Chart.registerInteraction('linear-pinch', LinearPinch);
module.exports = LinearPinch;
