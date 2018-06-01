/**
 * Interaction 基类
 * @author sima.zhang1990@gmail.com
 */
const Util = require('../util/common');
const Chart = require('../chart/chart');

class Interaction {
  getDefaultCfg() {
    return {
      startEvent: 'touchstart',
      processingEvent: 'touchmove',
      endEvent: 'touchend',
      resetEvent: 'touchstart'
    };
  }

  _start(ev) {
    this.preStart && this.preStart(ev);
    this.start(ev);
    this.onStart && this.onStart(ev);
  }
  _process(ev) {
    this.preProcess && this.preProcess(ev);
    this.process(ev);
    this.onProcess && this.onProcess(ev);
  }
  _end(ev) {
    this.preEnd && this.preEnd(ev);
    this.end(ev);
    this.onEnd && this.onEnd(ev);
  }

  _reset(ev) {
    this.preReset && this.preReset(ev);
    this.reset(ev);
    this.onReset && this.onReset(ev);
  }

  // override
  start() {}
  // override
  process() {}
  // override
  end() {}
  // override
  reset() {}
  // override
  bindEvents() {}
  // override
  clearEvents() {}

  constructor(cfg, chart) {
    const defaultCfg = this.getDefaultCfg();
    Util.deepMix(this, defaultCfg, cfg);
    this.chart = chart;
    this.canvas = chart.get('canvas');
    this.el = chart.get('canvas').get('el'); // TODO 必须保证能够获取到 canvas 和对应的 dom
    this._bindEvents(); // TODO
  }

  _bindEvents() {
    this.clearEvents();
    this.bindEvents();
  }

  destroy() {
    this.clearEvents();
  }
}

Chart._Interactions = {};
Chart.registerInteraction = function(type, constructor) {
  Chart._Interactions[type] = constructor;
};
Chart.getInteraction = function(type) {
  return Chart._Interactions[type];
};

Chart.plugins.register({
  init(chart) {
    chart.interact = function(type, cfg) {
      const Ctor = Chart.getInteraction(type);
      const interact = new Ctor(cfg, this);
      const interactions = this._interactions || {};
      interactions[type] = interactions[type] || []; // 同名
      interactions[type].push(interact);
      this._interactions = interactions;
      return this;
    };
    chart.clearInteraction = function(type) {
      const interactions = this._interactions;
      if (!interactions) return;
      if (type) {
        (interactions[type] || []).forEach(interact => {
          interact.destroy();
        });
        delete interactions[type];
      } else {
        Util.each(interactions, (collection, key) => {
          (collection || []).forEach(interact => {
            interact.destroy();
          });
          delete interactions[key];
        });
      }
    };

  },
  afterCanvasDestroyed(chart) {
    const interactions = chart._interactions;
    Util.each(interactions, collection => {
      (collection || []).forEach(interact => {
        interact.destroy();
      });
    });
  }
});
module.exports = Interaction;
