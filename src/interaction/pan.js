const Util = require('../util/common');
const Interaction = require('./base');
const Chart = require('../chart/chart');
const FilterPlugin = require('../plugin/filter');
const MoveMixin = require('./mixin/move');
const PressTooltipMixin = require('./mixin/press-tooltip');
const UpdateScaleMixin = require('./mixin/update-scale');

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
    const { hammer, panThreshold } = self;

    if (hammer) {
      hammer.get('pan').set({
        threshold: panThreshold
      });
    }

    chart.registerPlugins([ FilterPlugin, {
      changeData() {
        self.limitRange = {};
      },
      clear() {
        self.limitRange = {};
      }
    }]);

    Util.mix(this, UpdateScaleMixin, MoveMixin, PressTooltipMixin);
    this._bindPress();
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
}

Chart.registerInteraction('pan', Pan);
module.exports = Pan;
