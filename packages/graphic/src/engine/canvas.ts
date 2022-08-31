import EventEmit from '../event/emit';
import EventController from '../event/controller';
import CanvasElement from './canvas-element';
import { mix, isString, substitute } from '@antv/util';
import * as DOMUtil from '../util/dom';
import Container from './container';
import Group from './group';
import { requestAnimationFrame } from '../util/requestAnimationFrame';
import lang from './lang';

const { getPixelRatio, getDomById, getWidth, getHeight, isCanvasElement } = DOMUtil;

class Canvas extends EventEmit {
  /* eslint-disable */
  _attrs: any;
  drawChildren: any;
  _getAriaLabel: any;
  clear: any;

  // Container
  getChildren: any;
  addShape: any;
  addGroup: any;
  contain: any;
  sort: any;
  add: any;
  _setEvn: any;
  offset: any;
  /* eslint-enable */

  get(name) {
    return this._attrs[name];
  }

  set(name, value) {
    this._attrs[name] = value;
  }

  constructor(cfg) {
    super();
    const { title } = cfg;
    const ariaLabel = title ? substitute(lang.general.withTitle, { title }) : lang.general.title;
    this._attrs = mix(
      {
        type: 'canvas',
        children: [],
        ariaLabel,
      },
      cfg
    );
    this._initPixelRatio();
    this._initCanvas();
  }

  _initPixelRatio() {
    const pixelRatio = this.get('pixelRatio');
    if (!pixelRatio) {
      this.set('pixelRatio', getPixelRatio());
    }
  }

  beforeDraw() {
    const context = this._attrs.context;
    const el = this._attrs.el;
    context && context.clearRect && context.clearRect(0, 0, el.width, el.height);
  }

  _initCanvas() {
    const el = this.get('el');
    const context = this.get('context');
    if (!el && !context) {
      throw new Error('Please specify the id, el or context of the chart!');
    }
    let canvas;
    if (el) {
      // DOMElement or String
      canvas = isString(el) ? getDomById(el) : el;
    } else {
      // 说明没有指定el
      canvas = CanvasElement.create(context);
    }

    if (context && canvas && !canvas.getContext) {
      canvas.getContext = function() {
        return context;
      };
    }
    const width = this.get('width') || getWidth(canvas) || canvas.width;

    const height = this.get('height') || getHeight(canvas) || canvas.height;

    this.set('canvas', this);
    this.set('el', canvas);
    this.set('context', context || canvas.getContext('2d'));
    this.changeSize(width, height);

    // 初始化事件控制器
    const eventController = new EventController({
      canvas: this,
      el: canvas,
    });
    this.set('eventController', eventController);
  }

  changeSize(width, height) {
    const pixelRatio = this.get('pixelRatio');
    const canvasDOM = this.get('el'); // HTMLCanvasElement or canvasElement

    // 浏览器环境设置style样式
    if (canvasDOM.style) {
      canvasDOM.style.width = width + 'px';
      canvasDOM.style.height = height + 'px';
    }

    if (isCanvasElement(canvasDOM)) {
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
      y: (clientY - bbox.top) * (el.height / height),
    };
  }

  _beginDraw() {
    this._attrs.toDraw = true;
  }
  _endDraw() {
    this._attrs.toDraw = false;
  }

  draw() {
    const drawInner = () => {
      this.set(
        'animateHandler',
        requestAnimationFrame(() => {
          this.set('animateHandler', undefined);
          if (this.get('toDraw')) {
            drawInner();
          }
        })
      );
      this.beforeDraw();
      try {
        const context = this._attrs.context;
        this.drawChildren(context);
        // 支付宝，微信小程序，需要调context.draw才能完成绘制， 所以这里直接判断是否有.draw方法
        if (context.draw) {
          context.draw();
        }
        // 设置无障碍文本
        this.setAriaLabel();
      } catch (ev) {
        console.warn('error in draw canvas, detail as:');
        console.warn(ev);
        this._endDraw();
      }
      this._endDraw();
    };

    if (this.get('destroyed')) {
      return;
    }
    if (this.get('animateHandler')) {
      this._beginDraw();
    } else {
      drawInner();
    }
  }

  // 设置无障碍文本
  setAriaLabel() {
    const { el } = this._attrs;
    const ariaLabel = this._getAriaLabel();
    if (ariaLabel && el.setAttribute) {
      el.setAttribute('aria-label', ariaLabel);
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

// @ts-ignore
mix(Canvas.prototype, Container, {
  getGroupClass() {
    return Group;
  },
});

export default Canvas;
