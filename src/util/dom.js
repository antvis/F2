import { isFunction, isNumber } from '@antv/util';

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

/* global wx, my */
// weixin miniprogram
const isWx = (typeof wx === 'object') && (typeof wx.getSystemInfoSync === 'function');
// ant miniprogram
const isMy = (typeof my === 'object') && (typeof my.getSystemInfoSync === 'function');
// in node
const isNode = (typeof global) && (!typeof window);
// in browser
const isBrowser = (typeof window !== 'undefined')
                && (typeof window.document !== 'undefined')
                && (typeof window.sessionStorage !== 'undefined');

function isCanvasElement(el) {
  if (!el || typeof el !== 'object') return false;
  if (el.nodeType === 1 && el.nodeName) {
    // HTMLCanvasElement
    return true;
  }
  // CanvasElement
  return !!el.isCanvasElement;
}

function getPixelRatio() {
  return window && window.devicePixelRatio || 1;
}

function getStyle(el, property) {
  return el.currentStyle ?
    el.currentStyle[property] :
    document.defaultView.getComputedStyle(el, null).getPropertyValue(property);
}

function getWidth(el) {
  let width = getStyle(el, 'width');
  if (width === 'auto') {
    width = el.offsetWidth;
  }
  return parseFloat(width);
}

function getHeight(el) {
  let height = getStyle(el, 'height');
  if (height === 'auto') {
    height = el.offsetHeight;
  }
  return parseFloat(height);
}

function getDomById(id) {
  if (!id) {
    return null;
  }
  return document.getElementById(id);
}

function getRelativePosition(point, canvas) {
  const canvasDom = canvas.get('el');
  if (!canvasDom) return point;
  const { top, left } = canvasDom.getBoundingClientRect();

  const paddingLeft = parseFloat(getStyle(canvasDom, 'padding-left'));
  const paddingTop = parseFloat(getStyle(canvasDom, 'padding-top'));

  const mouseX = point.x - left - paddingLeft;
  const mouseY = point.y - top - paddingTop;
  return {
    x: mouseX,
    y: mouseY
  };
}

function addEventListener(source, type, listener) {
  source.addEventListener(type, listener, eventListenerOptions);
}

function removeEventListener(source, type, listener) {
  source.removeEventListener(type, listener, eventListenerOptions);
}

function landscapePoint(point, canvas) {
  const landscape = canvas.get('landscape');
  if (!landscape) {
    return point;
  }
  if (isFunction(landscape)) {
    return landscape(point, canvas);
  }
  // 默认顺时针旋转90度
  const height = canvas.get('height');
  const x = point.y;
  const y = height - point.x;
  return { x, y };
}

function convertPoints(ev, canvas) {
  let touches = ev.touches;
  // 认为是mouse事件
  if (!touches) {
    const point = getRelativePosition({ x: ev.clientX, y: ev.clientY }, canvas);
    return [ landscapePoint(point, canvas) ];
  }
  // 单指 touchend 后，touchs 会变空，最后的触点要从changedTouches里拿
  if (!touches.length) {
    // 为了防止万一，加个空逻辑
    touches = ev.changedTouches || [];
  }
  const points = [];
  for (let i = 0, len = touches.length; i < len; i++) {
    const touch = touches[i];
    // x, y: 相对canvas原点的位置，clientX, clientY 相对于可视窗口的位置
    const { x, y, clientX, clientY } = touch;
    let point;
    // 小程序环境会有x,y
    if (isNumber(x) || isNumber(y)) {
      point = { x, y };
    } else {
      // 浏览器环境再计算下canvas的相对位置
      point = getRelativePosition({ x: clientX, y: clientY }, canvas);
    }
    points.push(landscapePoint(point, canvas));
  }
  return points;
}

function createEvent(event, chart) {
  const canvas = chart.get('canvas');
  const points = convertPoints(event, canvas);
  // touchend会没有points
  const point = points[0] || {};
  return {
    type: event.type,
    chart,
    native: event,
    x: point.x,
    y: point.y
  };
}

function measureText(text, font, ctx) {
  if (!ctx) {
    ctx = document.createElement('canvas').getContext('2d');
  }

  ctx.font = font || '12px sans-serif';
  return ctx.measureText(text);
}

export {
  isWx,
  isMy,
  isNode,
  isBrowser,
  isCanvasElement,
  getPixelRatio,
  getStyle,
  getWidth,
  getHeight,
  getDomById,
  getRelativePosition,
  addEventListener,
  removeEventListener,
  createEvent,
  convertPoints,
  measureText
};
