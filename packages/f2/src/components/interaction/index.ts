import Component from '../../base/component';

// 缩放
class interaction extends Component {
  startEvent = 'touchstart';
  processEvent = 'touchmove';
  endEvent = 'touchend';
  resetEvent = null;

  preStart?: (ev) => void;
  onStart?: (ev) => void;
  preProcess?: (ev) => void;
  onProcess?: (ev) => void;
  preEnd?: (ev) => void;
  onEnd?: (ev) => void;
  preReset?: (ev) => void;
  onReset?: (ev) => void;

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
    canvas.on(startEvent, this._start);
    canvas.on(processEvent, this._process);
    canvas.on(endEvent, this._end);
    canvas.on(resetEvent, this._reset);
  }

  _clearEvents() {
    const { context, startEvent, processEvent, endEvent, resetEvent } = this;
    const { canvas } = context;

    // 统一解绑事件
    canvas.off(startEvent, this._start);
    canvas.off(processEvent, this._process);
    canvas.off(endEvent, this._end);
    canvas.off(resetEvent, this._reset);
  }
}

export default interaction;
