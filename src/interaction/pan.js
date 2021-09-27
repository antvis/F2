
import { mix, isWx, isMy } from '../util/common';
import Interaction from './base';
import Chart from '../chart/chart';
// import * as FilterPlugin from '../plugin/filter';
import MoveMixin from './mixin/move';
import UpdateScaleMixin from './mixin/update-scale';

class Pan extends Interaction {
  getDefaultCfg() {
    let defaultCfg = super.getDefaultCfg();
    defaultCfg = mix({}, defaultCfg, {
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

    if (isWx || isMy) { // 小程序
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
    chart.set('limitInPlot', true);

    if (hammer) {
      hammer.get('pan').set({
        threshold: panThreshold
      });
      // 为了兼容hammer的pan 和 tooltips里的press, 后面去hammerjs的时候需要去掉
      chart.get('canvas').on('pan', () => {});
    }

    // chart.registerPlugins([ FilterPlugin, {
    //   changeData() {
    //     self.limitRange = {};
    //   },
    //   clear() {
    //     self.limitRange = {};
    //   }
    // }]);

    mix(this, UpdateScaleMixin, MoveMixin);
  }

  start(e) {
    if (this.pressed) return;
    this.currentDeltaX = 0;
    this.currentDeltaY = 0;
    if (e.type === 'touchstart' || e.type === 'touchStart') {
      this.lastPoint = e.touches[0];
    }
    // this._handleMove(e);
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
export default Pan;
