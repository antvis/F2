const Util = require('../util/common');
const Interaction = require('./base');
const Chart = require('../chart/chart');
const FilterPlugin = require('../plugin/filter');
const MoveMixin = require('./mixin/move');
const UpdateScaleMixin = require('./mixin/update-scale');

class Swipe extends Interaction {
  getDefaultCfg() {
    let defaultCfg = super.getDefaultCfg();
    defaultCfg = Util.mix({}, defaultCfg, {
      startEvent: 'touchstart',
      processEvent: 'swipe',
      endEvent: 'touchend',
      currentDeltaX: null,
      threshold: 10, // Minimal distance required before recognizing.
      velocity: 0.3, // Minimal velocity required before recognizing, unit is in px per ms.
      limitRange: {},
      _timestamp: 0,
      _panCumulativeDelta: 0,
      speed: 5
    });

    return defaultCfg;
  }

  constructor(cfg, chart) {
    super(cfg, chart);
    const self = this;
    const { hammer, threshold, velocity } = self;

    if (hammer) {
      hammer.get('swipe').set({
        direction: 6, // only support horizontal
        threshold,
        velocity
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
    self.mode = 'x';
    Util.mix(self, UpdateScaleMixin, MoveMixin);
  }

  process(e) {
    this.currentDeltaX = 0;
    this._handleMove(e);
  }

  end() {
    this.currentDeltaX = null;
    this._panCumulativeDelta = 0;
  }
}

Chart.registerInteraction('swipe', Swipe);
module.exports = Swipe;
