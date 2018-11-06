const Util = require('../util/common');
const Interaction = require('./base');
const Chart = require('../chart/chart');
const FilterPlugin = require('../plugin/filter');
const MoveMixin = require('./mixin/move');

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
      lastPoint: null,
      _panCumulativeDelta: 0,
      speed: 5
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

    Util.mix(this, MoveMixin);
  }

  start(e) {
    if (this.pressed) return;
    this.currentDeltaX = 0;
    this.currentDeltaY = 0;
    if (e.type === 'touchstart' || e.type === 'touchStart') {
      this.lastPoint = e.touches[0];
    }
    this._handleMove(e);
  }

  process(e) {
    if (this.pressed) return;
    this._handleMove(e);
  }

  end() {
    if (this.pressed) return;
    this.currentDeltaX = null;
    this.currentDeltaY = null;
    this.lastPoint = null;
    this._panCumulativeDelta = 0;
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
}

Chart.registerInteraction('pan', Pan);
module.exports = Pan;
