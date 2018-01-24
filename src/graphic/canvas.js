const Util = require('../util/common');
const DOMUtil = require('../util/dom');
const Base = require('../base');
const Container = require('./container');
const Group = require('./group');

class Canvas extends Base {
  getDefaultCfg() {
    return {
      type: 'canvas',
      el: null,
      context: null,
      width: null,
      height: null,
      children: [],
      pixelRatio: null
    };
  }

  constructor(cfg) {
    super(cfg);
    this._initPixelRatio();
    this._initCanvas();
  }

  _initPixelRatio() {
    const pixelRatio = this.get('pixelRatio');
    if (!pixelRatio) {
      this.set('pixelRatio', DOMUtil.getPixelRatio());
    }
  }

  _beforeDraw() {
    const context = this.get('context');
    const el = this.get('el');
    context && context.clearRect(0, 0, el.width, el.height);
  }

  _initCanvas() {
    const self = this;
    const el = self.get('el');
    const context = self.get('context');
    let canvas;

    if (context) { // CanvasRenderingContext2D
      canvas = context.canvas;
    } else if (Util.isString(el)) { // HTMLElement's id
      canvas = DOMUtil.getDomById(el);
    } else { // HTMLElement
      canvas = el;
    }

    if (!canvas) {
      throw new Error('Please specify the id or el of the chart!');
    }

    if (context && canvas && !canvas.getContext) {
      canvas.getContext = function() {
        return context;
      };
    }

    let width = self.get('width');
    if (!width) {
      width = DOMUtil.getWidth(canvas);
      self.set('width', width);
    }

    let height = self.get('height');
    if (!height) {
      height = DOMUtil.getHeight(canvas);
      self.set('height', height);
    }

    const ratio = self.get('pixelRatio');
    if (ratio) {
      canvas.width = width * ratio;
      canvas.height = height * ratio;
      canvas.style.height = height + 'px';
      canvas.style.width = width + 'px';
      if (ratio !== 1) {
        const ctx = canvas.getContext('2d');
        ctx.scale(ratio, ratio);
      }
    }
    self.set('canvas', this);
    self.set('el', canvas);
    self.set('context', context || canvas.getContext('2d'));
  }

  /**
   * 获取 canvas 对应 dom 元素的宽度
   * @return {Number} 返回宽度
   */
  getWidth() {
    const pixelRatio = this.get('pixelRatio');
    const width = this.get('width');
    return width * pixelRatio;
  }

  /**
   * 获取 canvas 对应 dom 元素的高度
   * @return {Number} 返回高度
   */
  getHeight() {
    const pixelRatio = this.get('pixelRatio');
    const height = this.get('height');
    return height * pixelRatio;
  }

  /**
   * 改变 canvas 的宽高
   * @param  {Number} width  宽度
   * @param  {Number} height 高度
   */
  changeSize(width, height) {
    const pixelRatio = this.get('pixelRatio');
    const canvasDOM = this.get('el');
    canvasDOM.style.width = width + 'px';
    canvasDOM.style.height = height + 'px';
    canvasDOM.setAttribute('width', width * pixelRatio);
    canvasDOM.setAttribute('height', height * pixelRatio);
  }

  /**
   * 将窗口坐标转变成 canvas 坐标
   * @param  {Number} clientX 窗口x坐标
   * @param  {Number} clientY 窗口y坐标
   * @return {Object} canvas坐标
   */
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

  draw() {
    const self = this;
    if (self.get('destroyed')) {
      return;
    }
    self._beforeDraw();
    try {
      const context = self.get('context');
      const children = self.get('children');
      for (let i = 0, len = children.length; i < len; i++) {
        const child = children[i];
        child.draw(context);
      }
    } catch (ev) { // 绘制时异常，中断重绘
      console.warn('error in draw canvas, detail as:');
      console.warn(ev);
    }
  }

  destroy() {
    if (this.get('destroyed')) {
      return;
    }
    this.clear();
    this._attrs = {};
    this.set('destroyed', true);
  }
}

Util.mix(Canvas.prototype, Container, {
  getGroupClass() {
    return Group;
  }
});

module.exports = Canvas;
