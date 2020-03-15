import EventEmit from './event/emit';

class CanvasElement extends EventEmit {
  constructor(ctx) {
    super();
    this.context = ctx;
    // canvas实际的宽高 (width/height) * pixelRatio
    this.width = 0;
    this.height = 0;
    this.style = {};
    this.currentStyle = {};
    // 用来标识是CanvasElement实例
    this.isCanvasElement = true;
  }

  getContext(/* type */) {
    return this.context;
  }

  getBoundingClientRect() {
    const width = this.width;
    const height = this.height;
    // 默认都处理成可视窗口的顶部位置
    return {
      top: 0,
      right: width,
      bottom: height,
      left: 0
    };
  }

  addEventListener(type, listener) {
    this.on(type, listener);
  }

  removeEventListener(type, listener) {
    this.off(type, listener);
  }

  dispatchEvent(type, e) {
    this.emit(type, e);
  }
}

function supportEventListener(canvas) {
  if (!canvas) {
    return false;
  }
  // 非 HTMLCanvasElement
  if (canvas.nodeType !== 1 || !canvas.nodeName || canvas.nodeName.toLowerCase() !== 'canvas') {
    return false;
  }
  // 微信小程序canvas.getContext('2d')时也是CanvasRenderingContext2D
  // 也会有ctx.canvas, 而且nodeType也是1，所以还要在看下是否支持addEventListener
  let support = false;
  try {
    canvas.addEventListener('eventTest', () => {
      support = true;
    });
    canvas.dispatchEvent(new Event('eventTest'));
  } catch (error) {
    support = false;
  }
  return support;
}


export default {
  create(ctx) {
    if (!ctx) {
      return null;
    }
    if (supportEventListener(ctx.canvas)) {
      return ctx.canvas;
    }
    return new CanvasElement(ctx);
  }
};
