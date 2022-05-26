import { mix } from '@antv/util';
import { Hammer } from '@antv/f-engine';

// 定义start / end 等
export default class Base {
  chart: any;
  range: any;
  type = '';
  startEvent = 'touchstart';
  processEvent = 'touchmove';
  endEvent = 'touchend';
  resetEvent = null;
  // 交互的上下文
  context = null;

  preStart?: Function;
  onStart?: Function;
  preProcess?: Function;
  onProcess?: Function;
  preEnd?: Function;
  onEnd?: Function;
  preReset?: Function;
  onReset?: Function;
  hammer: Hammer;

  getDefaultCfg() {
    return {};
  }

  constructor(cfg, { chart, context }) {
    mix(this, this.getDefaultCfg(), cfg);
    this.context = context;
    this.chart = chart;

    // 只处理range, 暂时先这么处理后面再看情况调整
    const { range } = this;
    if (range) {
      this.context.range = range;
    }
    this._bindEvents(chart);
  }

  _bindEvents(_chart) {
    const { startEvent, processEvent, endEvent, resetEvent } = this;
    const canvas = this.context.canvas;
    this.hammer = new Hammer(canvas);
    // 统一绑定事件
    this.hammer.on(startEvent, this._start);
    this.hammer.on(processEvent, this._process);
    this.hammer.on(endEvent, this._end);
    this.hammer.on(resetEvent, this._reset);
  }

  _clearEvents() {
    const { startEvent, processEvent, endEvent, resetEvent } = this;
    const canvas = this.context.canvas;

    // 统一解绑事件
    this.hammer.off(startEvent, this._start);
    this.hammer.off(processEvent, this._process);
    this.hammer.off(endEvent, this._end);
    this.hammer.off(resetEvent, this._start);
  }

  _start = (ev) => {
    this.preStart && this.preStart(ev);
    this.start(ev);
    this.onStart && this.onStart(ev);
  };
  _process = (ev) => {
    this.preProcess && this.preProcess(ev);
    this.process(ev);
    this.onProcess && this.onProcess(ev);
  };
  _end = (ev) => {
    this.preEnd && this.preEnd(ev);
    this.end(ev);
    this.onEnd && this.onEnd(ev);
  };
  _reset = (ev) => {
    this.preReset && this.preReset(ev);
    this.reset(ev);
    this.onReset && this.onReset(ev);
  };

  // override
  start(_ev) {}
  // override
  process(_ev) {}
  // override
  end(_ev) {}
  // override
  reset(_pev) {}

  destroy() {
    this.context.destroy();
    this._clearEvents();
  }
}
