let DomUtil;
/**
 * Detects support for options object argument in addEventListener.
 * https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener#Safely_detecting_option_support
 * @private
 */
const supportsEventListenerOptions = (function() {
  let supports = false;
  try {
    const options = Object.defineProperty({}, 'passive', {
      get() {
        supports = true;
      }
    });
    window.addEventListener('e', null, options);
  } catch (e) {
    // continue regardless of error
  }
  return supports;
}());

// Default passive to true as expected by Chrome for 'touchstart' and 'touchend' events.
// https://github.com/chartjs/Chart.js/issues/4287
const eventListenerOptions = supportsEventListenerOptions ? { passive: true } : false;

function createEvent(type, chart, x, y, nativeEvent) {
  return {
    type,
    chart,
    native: nativeEvent || null,
    x: x !== undefined ? x : null,
    y: y !== undefined ? y : null
  };
}

function fromNativeEvent(event, chart) {
  const type = event.type;
  let clientPoint;
  // 说明是touch相关事件
  if (event.touches) {
    // https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent/changedTouches
    // 这里直接拿changedTouches就可以了，不管是touchstart, touchmove, touchend changedTouches 都是有的
    // 为了以防万一，做个空判断
    const touch = event.changedTouches[0] || {};
    // x, y: 相对canvas原点的位置，clientX, clientY 相对于可视窗口的位置
    const { x, y, clientX, clientY } = touch;
    // 小程序环境会有x,y，这里就直接返回
    if (x && y) {
      return createEvent(type, chart, x, y, event);
    }
    clientPoint = { x: clientX, y: clientY };
  } else {
    // mouse相关事件
    clientPoint = { x: event.clientX, y: event.clientY };
  }
  // 理论上应该是只有有在浏览器环境才会走到这里
  const canvas = chart.get('canvas');
  // 通过clientX, clientY 计算x, y
  const point = DomUtil.getRelativePosition(clientPoint, canvas);
  return createEvent(type, chart, point.x, point.y, event);
}

DomUtil = {
  /* global wx, my */
  isWx: (typeof wx === 'object') && (typeof wx.getSystemInfoSync === 'function'), // weixin miniprogram
  isMy: (typeof my === 'object') && (typeof my.getSystemInfoSync === 'function'), // ant miniprogram
  isNode: (typeof module !== 'undefined') && (typeof module.exports !== 'undefined'), // in node
  isBrowser: (typeof window !== 'undefined') && (typeof window.document !== 'undefined') && (typeof window.sessionStorage !== 'undefined'), // in browser
  isCanvasElement(el) {
    if (!el || typeof el !== 'object') return false;
    if (el.nodeType === 1 && el.nodeName) {
      // HTMLCanvasElement
      return true;
    }
    // CanvasElement
    return !!el.isCanvasElement;
  },
  getPixelRatio() {
    return window && window.devicePixelRatio || 1;
  },
  getStyle(el, property) {
    return el.currentStyle ?
      el.currentStyle[property] :
      document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
  },
  getWidth(el) {
    let width = this.getStyle(el, 'width');
    if (width === 'auto') {
      width = el.offsetWidth;
    }
    return parseFloat(width);
  },
  getHeight(el) {
    let height = this.getStyle(el, 'height');
    if (height === 'auto') {
      height = el.offsetHeight;
    }
    return parseFloat(height);
  },
  getDomById(id) {
    if (!id) {
      return null;
    }
    return document.getElementById(id);
  },
  getRelativePosition(point, canvas) {
    const canvasDom = canvas.get('el');
    const { top, right, bottom, left } = canvasDom.getBoundingClientRect();

    const paddingLeft = parseFloat(this.getStyle(canvasDom, 'padding-left'));
    const paddingTop = parseFloat(this.getStyle(canvasDom, 'padding-top'));
    const paddingRight = parseFloat(this.getStyle(canvasDom, 'padding-right'));
    const paddingBottom = parseFloat(this.getStyle(canvasDom, 'padding-bottom'));
    const width = right - left - paddingLeft - paddingRight;
    const height = bottom - top - paddingTop - paddingBottom;
    const pixelRatio = canvas.get('pixelRatio');

    const mouseX = (point.x - left - paddingLeft) / (width) * canvasDom.width / pixelRatio;
    const mouseY = (point.y - top - paddingTop) / (height) * canvasDom.height / pixelRatio;

    return {
      x: mouseX,
      y: mouseY
    };
  },
  addEventListener(source, type, listener) {
    source.addEventListener(type, listener, eventListenerOptions);
  },
  removeEventListener(source, type, listener) {
    source.removeEventListener(type, listener, eventListenerOptions);
  },
  createEvent(event, chart) {
    return fromNativeEvent(event, chart);
  },
  measureText(text, font, ctx) {
    if (!ctx) {
      ctx = document.createElement('canvas').getContext('2d');
    }

    ctx.font = font || '12px sans-serif';
    return ctx.measureText(text);
  }
};

module.exports = DomUtil;
