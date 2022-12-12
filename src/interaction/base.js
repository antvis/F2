/**
 * The parent class of interaction
 * @author sima.zhang1990@gmail.com
 */
import './register';
import { deepMix, isWx, isMy, addEventListener, removeEventListener } from '../util/common';
// import HammerUtil from 'hammerjs';

let Hammer;
if (!isWx && !isMy) {
  Hammer = require('hammerjs');
}

const TOUCH_EVENTS = [
  'touchstart',
  'touchmove',
  'touchend',
  'click'
];

class Interaction {
  getDefaultCfg() {
    return {
      startEvent: TOUCH_EVENTS[0],
      processEvent: TOUCH_EVENTS[1],
      endEvent: TOUCH_EVENTS[2],
      resetEvent: null
    };
  }

  _start = ev => {
    this.preStart && this.preStart(ev);
    this.start(ev);
    this.onStart && this.onStart(ev);
  }
  _process = ev => {
    this.preProcess && this.preProcess(ev);
    this.process(ev);
    this.onProcess && this.onProcess(ev);
  }
  _end = ev => {
    this.preEnd && this.preEnd(ev);
    this.end(ev);
    this.onEnd && this.onEnd(ev);
  }
  _reset = ev => {
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

  constructor(cfg, chart) {
    const defaultCfg = this.getDefaultCfg();
    deepMix(this, defaultCfg, cfg);
    this.chart = chart;
    this.canvas = chart.get('canvas');
    this.el = chart.get('canvas').get('el');
    this._bindEvents();
  }

  _bindEvents() {
    this._clearEvents(); // clear events
    const { startEvent, processEvent, endEvent, resetEvent, el } = this;
    if (Hammer) {
      this.hammer = new Hammer(el);
    }
    this._bindEvent(startEvent, this._start);
    this._bindEvent(processEvent, this._process);
    this._bindEvent(endEvent, this._end);
    this._bindEvent(resetEvent, this._reset);
  }

  _clearEvents() {
    const { startEvent, processEvent, endEvent, resetEvent } = this;

    if (this.hammer) {
      this.hammer.destroy();
      this.hammer = null;
    }

    this._clearTouchEvent(startEvent, this._start);
    this._clearTouchEvent(processEvent, this._process);
    this._clearTouchEvent(endEvent, this._end);
    this._clearTouchEvent(resetEvent, this._reset);
  }

  _bindEvent(eventName, method) {
    const el = this.el;
    if (eventName) {
      if (TOUCH_EVENTS.indexOf(eventName) !== -1) {
        addEventListener(el, eventName, method);
      } else if (this.hammer) {
        this.hammer.on(eventName, method);
      }
    }
  }

  _clearTouchEvent(eventName, method) {
    const el = this.el;
    if (eventName && TOUCH_EVENTS.indexOf(eventName) !== -1) {
      removeEventListener(el, eventName, method);
    }
  }

  destroy() {
    this._clearEvents();
  }
}

export default Interaction;
