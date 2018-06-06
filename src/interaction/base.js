/**
 * Interaction 基类
 * @author sima.zhang1990@gmail.com
 */
const Util = require('../util/common');
const Chart = require('../chart/chart');

let Hammer = require('hammerjs');
Hammer = typeof (Hammer) === 'function' ? Hammer : window.Hammer;

const TOUCH_EVENTS = [
  'touchstart',
  'touchmove',
  'touchend'
];

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
  // bindEvents() {}
  // // override
  // clearEvents() {}

  constructor(cfg, chart) {
    const defaultCfg = this.getDefaultCfg();
    Util.deepMix(this, defaultCfg, cfg);
    this.chart = chart;
    this.canvas = chart.get('canvas');
    this.el = chart.get('canvas').get('el');
    this._bindEvents();
  }

  _bindEvents() {
    this._clearEvents(); // clear events
    const { startEvent, processingEvent, endEvent, resetEvent, el } = this;
    const hammer = new Hammer(el);
    this.hammer = hammer;
    this._bindEvent(startEvent, '_start', hammer);
    this._bindEvent(processingEvent, '_process', hammer);
    this._bindEvent(endEvent, '_end', hammer);
    this._bindEvent(resetEvent, '_reset', hammer);
  }

  _clearEvents() {
    const hammer = this.hammer;
    const { startEvent, processingEvent, endEvent, resetEvent } = this;

    if (hammer) {
      hammer.destroy();
      this._clearTouchEvent(startEvent, '_start');
      this._clearTouchEvent(processingEvent, '_process');
      this._clearTouchEvent(endEvent, '_end');
      this._clearTouchEvent(resetEvent, '_reset');
    }
  }

  _bindEvent(eventName, methodName, hammer) {
    const el = this.el;
    if (eventName) {
      if (TOUCH_EVENTS.indexOf(eventName) !== -1) {
        Util.addEventListener(el, eventName, Util.wrapBehavior(this, methodName));
      } else {
        hammer.on(eventName, Util.wrapBehavior(this, methodName));
      }
    }
  }

  _clearTouchEvent(eventName, methodName) {
    const el = this.el;
    if (eventName && TOUCH_EVENTS.indexOf(eventName) !== -1) {
      Util.removeEventListener(el, eventName, Util.getWrapBehavior(this, methodName));
    }
  }

  destroy() {
    this._clearEvents();
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
