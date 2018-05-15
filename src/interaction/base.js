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
      onReset: 'touchstart'
    };
  }

  onStart() {}
  onProcessing() {}
  onEnd() {}
  onReset() {}

  constructor(cfg, chart) {
    const defaultCfg = this.getDefaultCfg();
    Util.deepMix(this, defaultCfg, cfg);
    this.chart = chart;
    this.canvas = chart.get('canvas');
    this.el = chart.get('canvas').get('el'); // TODO 必须保证能够获取到 canvas 和对应的 dom
    this.bindEvents();
  }

  bindEvents() {

  }

  clearEvents() {}

  destroy() {
    this.clearEvents();
  }
}

// TODO: 这里需要好好考虑清楚
Chart._Interactions = {};
Chart.registerInteraction = function(type, constructor) {
  Chart._Interactions[type] = constructor;
};
Chart.getInteraction = function(type) {
  return Chart._Interactions[type];
};

// View.prototype.clearInteraction = function (type) {
//   const me = this;
//   const interactions = me.getInteractions();
//   if (type) {
//     (interactions[type] || []).forEach(interact => {
//       interact.destroy();
//     });
//   } else {
//     Util.each(interactions, collection => {
//       (collection || []).forEach(interact => {
//         interact.destroy();
//       });
//     });
//   }
// };
Chart.prototype.interact = function(type, cfg) {
  const me = this;
  const Ctor = Chart.getInteraction(type);
  const interact = new Ctor(cfg, me);
  const interactions = me.get('interactions') || {};
  interactions[type] = interactions[type] || []; // 同名
  interactions[type].push(interact);
  me.set('interactions', interactions);
  return me;
};

// TODO: 如何摧毁事件

module.exports = Interaction;
