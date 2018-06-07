const Util = require('../util/common');
const Interaction = require('./base');
const Chart = require('../chart/chart');
const Helper = require('./helper');

class LinearPan extends Interaction {
  getDefaultCfg() {
    const defaultCfg = super.getDefaultCfg();
    return Util.mix({}, defaultCfg, {
      startEvent: 'panstart',
      processingEvent: 'panmove',
      endEvent: 'panend',
      resetEvent: '',
      mode: 'x', // 方向，可取值 x、y、xy
      threshold: 10, // Minimal pan distance required before recognizing.
      currentDeltaX: null,
      currentDeltaY: null,
      panning: false,
      limitRange: {} // 限制范围
    });
  }

  constructor(cfg, chart) {
    super(cfg, chart);
    const hammer = this.hammer;
    const threshold = this.threshold; // Minimal pan distance required before recognizing.
    hammer.get('pan').set({ threshold });
    chart.set('limitInPlot', true);
  }

  start(e) {
    this.currentDeltaX = 0;
    this.currentDeltaY = 0;
    this._handlePan(e);
  }

  process(e) {
    this._handlePan(e);
  }

  end() {
    this.currentDeltaX = null;
    this.currentDeltaY = null;
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
    if (Helper.directionEnabled(mode, 'x') && deltaX !== 0) {
      const xScale = chart.getXScale();
      const coordWidth = end.x - start.x; // 绘图区域宽度
      self._panScale(xScale, deltaX, coordWidth, 'x');
    }
    if (Helper.directionEnabled(mode, 'y') && deltaY !== 0) {
      const coordHeight = start.y - end.y; // 绘图区域高度
      const yScales = chart.getYScales();
      Util.each(yScales, yScale => {
        self._panScale(yScale, deltaY, coordHeight, 'y');
      });
    }
    chart.repaint();
  }

  _panScale(scale, delta, range, flag) {
    const { type, field } = scale;
    if (type !== 'linear') return;

    const chart = this.chart;
    let colDef = {};
    if (chart.get('colDefs') && chart.get('colDefs')[field]) {
      colDef = chart.get('colDefs')[field];
    }

    const ratio = delta / range;
    const min = scale.min;
    const max = scale.max;
    const panValue = ratio * (max - min);
    let newMax = flag === 'x' ? max - panValue : max + panValue;
    let newMin = flag === 'x' ? min - panValue : min + panValue;

    const limitRange = this.limitRange;
    if (limitRange[field] && limitRange[field].min && newMin <= limitRange[field].min) {
      newMin = limitRange[field].min;
      newMax = (max - min) + newMin;
    }
    if (limitRange[field] && limitRange[field].max && newMax >= limitRange[field].max) {
      newMax = limitRange[field].max;
      newMin = newMax - (max - min);
    }

    chart.scale(field, Util.mix({}, colDef, {
      min: newMin,
      max: newMax,
      nice: false
    }));
  }
}

Chart.registerInteraction('linear-pan', LinearPan);
module.exports = LinearPan;
