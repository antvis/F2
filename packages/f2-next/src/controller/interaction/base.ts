import { mix } from '@antv/util';

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

  _bindEvents(chart) {
    const { startEvent, processEvent, endEvent, resetEvent } = this;
    const canvas = chart.getCanvas();
    // 统一绑定事件
    canvas.on(startEvent, this._start);
    canvas.on(processEvent, this._process);
    canvas.on(endEvent, this._end);
    canvas.on(resetEvent, this._reset);
  }

  _clearEvents() {
    const { chart, startEvent, processEvent, endEvent, resetEvent } = this;
    const canvas = chart.getCanvas();

    // 统一解绑事件
    canvas.off(startEvent, this._start);
    canvas.off(processEvent, this._process);
    canvas.off(endEvent, this._end);
    canvas.off(resetEvent, this._start);
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
  start(ev) { }
  // override
  process(ev) { }
  // override
  end(ev) { }
  // override
  reset(ev) { }

  destroy() {
    this.context.destroy();
    this._clearEvents();
  }
}