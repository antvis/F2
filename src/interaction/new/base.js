import { mix } from '../../util/common';
import Context from './context';

class Base {
  type = '';
  startEvent = 'touchstart';
  processEvent = 'touchmove';
  endEvent = 'touchend';
  resetEvent = null;
  // 交互的上下文
  context = null;

  getDefaultCfg() {
    return {};
  }

  getInteractionContext(chart) {
    let interactionContext = chart.get('interactionContext');
    if (interactionContext) {
      return interactionContext;
    }
    interactionContext = new Context(chart);
    chart.set('interactionContext', interactionContext);
    return interactionContext;
  }

  constructor(cfg, chart) {
    mix(this, this.getDefaultCfg(), cfg);
    this.context = this.getInteractionContext(chart);
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
    const canvas = chart.get('canvas');
    // 统一绑定事件
    canvas.on(startEvent, this._start);
    canvas.on(processEvent, this._process);
    canvas.on(endEvent, this._end);
    canvas.on(resetEvent, this._reset);
  }

  _clearEvents() {
    const { chart, startEvent, processEvent, endEvent, resetEvent } = this;
    const canvas = chart.get('canvas');

    // 统一绑定事件
    canvas.off(startEvent, this._start);
    canvas.off(processEvent, this._process);
    canvas.off(endEvent, this._end);
    canvas.off(resetEvent, this._start);
  }

  _start = ev => {
    this.start(ev);
  }
  _process = ev => {
    this.process(ev);
  }
  _end = ev => {
    this.end(ev);
  }
  _reset = ev => {
    this.reset(ev);
  }

  // override
  start() {}
  // override
  process() {}
  // override
  end() {}
  // override
  reset() {}

  destroy() {
    this._clearEvents();
  }
}

export default Base;
