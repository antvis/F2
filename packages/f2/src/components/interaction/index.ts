import { Component, Hammer } from '@antv/f-engine';

// 缩放
class interaction extends Component {
  startEvent = 'touchstart';
  processEvent = 'touchmove';
  endEvent = 'touchend';
  resetEvent = null;
  hammer: Hammer;

  preStart?: (ev) => void;
  onStart?: (ev) => void;
  preProcess?: (ev) => void;
  onProcess?: (ev) => void;
  preEnd?: (ev) => void;
  onEnd?: (ev) => void;
  preReset?: (ev) => void;
  onReset?: (ev) => void;

  willMount(): void {
    const { context } = this;
    const { canvas } = context;
    this.hammer = new Hammer(canvas);
  }

  didMount(): void {
    this._bindEvents();
  }

  didUnmount(): void {
    this._clearEvents();
  }

  // override
  start(_ev) {}
  // override
  process(_ev) {}
  // override
  end(_ev) {}
  // override
  reset(_ev) {}

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

  _bindEvents() {
    const { context, startEvent, processEvent, endEvent, resetEvent } = this;
    const { canvas } = context;
    // 统一绑定事件
    this.hammer.on(startEvent, this._start);
    this.hammer.on(processEvent, this._process);
    this.hammer.on(endEvent, this._end);
    this.hammer.on(resetEvent, this._reset);
  }

  _clearEvents() {
    const { context, startEvent, processEvent, endEvent, resetEvent } = this;
    const { canvas } = context;

    // 统一解绑事件
    this.hammer.off(startEvent, this._start);
    this.hammer.off(processEvent, this._process);
    this.hammer.off(endEvent, this._end);
    this.hammer.off(resetEvent, this._reset);
  }
}

export default interaction;
