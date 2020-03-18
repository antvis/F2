import EventEmit from './event/emit';
import EventController from './event/controller';
import CanvasElement from './canvas-element';

const Util = require('../util/common');
const Container = require('./container');
const Group = require('./group');
const { requestAnimationFrame } = require('./util/requestAnimationFrame');

class Canvas extends EventEmit {
  get(name) {
    return this._attrs[name];
  }

  set(name, value) {
    this._attrs[name] = value;
  }

  constructor(cfg) {
    super();
    this._attrs = Util.mix({
      type: 'canvas',
      children: []
    }, cfg);
    this._initPixelRatio();
    this._initCanvas();
  }

  _initPixelRatio() {
    const pixelRatio = this.get('pixelRatio');
    if (!pixelRatio) {
      this.set('pixelRatio', Util.getPixelRatio());
    }
  }

  beforeDraw() {
    const context = this._attrs.context;
    const el = this._attrs.el;
    context && context.clearRect && context.clearRect(0, 0, el.width, el.height);
  }

  _initCanvas() {
    const self = this;
    const el = self.get('el');
    const context = self.get('context');
    if (!el && !context) {
      throw new Error('Please specify the id, el or context of the chart!');
    }
    let canvas;
    if (el) {
      // DOMElement or String
      canvas = Util.isString(el) ? Util.getDomById(el) : el;
    } else {
      // 说明没有指定el
      canvas = CanvasElement.create(context);
    }

    if (context && canvas && !canvas.getContext) {
      canvas.getContext = function() {
        return context;
      };
    }
    let width = self.get('width');
    if (!width) {
      width = Util.getWidth(canvas);
    }

    let height = self.get('height');
    if (!height) {
      height = Util.getHeight(canvas);
    }

    self.set('canvas', this);
    self.set('el', canvas);
    self.set('context', context || canvas.getContext('2d'));
    self.changeSize(width, height);

    // 初始化事件控制器
    const eventController = new EventController({
      canvas: this,
      el: canvas
    });
    self.set('eventController', eventController);
  }

  changeSize(width, height) {
    const pixelRatio = this.get('pixelRatio');
    const canvasDOM = this.get('el'); // HTMLCanvasElement or canvasElement

    // 浏览器环境设置style样式
    if (canvasDOM.style) {
      canvasDOM.style.width = width + 'px';
      canvasDOM.style.height = height + 'px';
    }

    if (Util.isCanvasElement(canvasDOM)) {
      canvasDOM.width = width * pixelRatio;
      canvasDOM.height = height * pixelRatio;

      if (pixelRatio !== 1) {
        const ctx = this.get('context');
        ctx.scale(pixelRatio, pixelRatio);
      }
    }

    this.set('width', width);
    this.set('height', height);
  }

  getWidth() {
    const pixelRatio = this.get('pixelRatio');
    const width = this.get('width');
    return width * pixelRatio;
  }

  getHeight() {
    const pixelRatio = this.get('pixelRatio');
    const height = this.get('height');
    return height * pixelRatio;
  }

  getPointByClient(clientX, clientY) {
    const el = this.get('el');
    const bbox = el.getBoundingClientRect();
    const width = bbox.right - bbox.left;
    const height = bbox.bottom - bbox.top;
    return {
      x: (clientX - bbox.left) * (el.width / width),
      y: (clientY - bbox.top) * (el.height / height)
    };
  }

  _beginDraw() {
    this._attrs.toDraw = true;
  }
  _endDraw() {
    this._attrs.toDraw = false;
  }

  draw() {
    const self = this;
    function drawInner() {
      self.set('animateHandler', requestAnimationFrame(() => {
        self.set('animateHandler', undefined);
        if (self.get('toDraw')) {
          drawInner();
        }
      }));
      self.beforeDraw();
      try {
        const context = self._attrs.context;
        const children = self._attrs.children;
        for (let i = 0, len = children.length; i < len; i++) {
          const child = children[i];
          child.draw(context);
        }

        // 支付宝，微信小程序，需要调context.draw才能完成绘制， 所以这里直接判断是否有.draw方法
        if (context.draw) {
          context.draw();
        }
      } catch (ev) {
        console.warn('error in draw canvas, detail as:');
        console.warn(ev);
        self._endDraw();
      }
      self._endDraw();
    }

    if (self.get('destroyed')) {
      return;
    }
    if (self.get('animateHandler')) {
      this._beginDraw();
    } else {
      drawInner();
    }
  }

  destroy() {
    if (this.get('destroyed')) {
      return;
    }
    // 需要清理 canvas 画布内容，否则会导致 spa 应用 ios 下 canvas 白屏
    // https://stackoverflow.com/questions/52532614/total-canvas-memory-use-exceeds-the-maximum-limit-safari-12
    // https://github.com/antvis/F2/issues/630
    const el = this.get('el');
    el.width = 0;
    el.height = 0;
    this.clear();
    this._attrs = {};
    this.set('destroyed', true);
  }

  isDestroyed() {
    return this.get('destroyed');
  }
}

Util.mix(Canvas.prototype, Container, {
  getGroupClass() {
    return Group;
  }
});

module.exports = Canvas;
