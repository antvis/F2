import { mix } from '../util/common';

import Interaction from './base';
import Chart from '../chart/chart';
import * as FilterPlugin from '../plugin/filter';
import MoveMixin from './mixin/move';
import UpdateScaleMixin from './mixin/update-scale';

class Swipe extends Interaction {
  getDefaultCfg() {
    let defaultCfg = super.getDefaultCfg();
    defaultCfg = mix({}, defaultCfg, {
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
    mix(self, UpdateScaleMixin, MoveMixin);
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
export default Swipe;
