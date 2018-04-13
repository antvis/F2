
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

function fromNativeEvent(event, chart) { // TODO: chart 改成 dom
  const type = event.type;

  const point = {};
  const touches = event.targetTouches;
  if (touches && touches.length > 0) {
    point.x = touches[0].clientX;
    point.y = touches[0].clientY;
  } else {
    point.x = event.clientX;
    point.y = event.clientY;
  }
  const canvas = chart.get('canvas');
  const pos = DomUtil.getRelativePosition(point, canvas);
  return createEvent(type, chart, pos.x, pos.y, event);
}

let _dummyCtx;

DomUtil = {
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

    // Scale mouse coordinates into canvas coordinates
    // by following the pattern laid out by 'jerryj' in the comments of
    // http://www.html5canvastutorials.com/advanced/html5-canvas-mouse-coordinates/
    const paddingLeft = parseFloat(this.getStyle(canvasDom, 'padding-left'));
    const paddingTop = parseFloat(this.getStyle(canvasDom, 'padding-top'));
    const paddingRight = parseFloat(this.getStyle(canvasDom, 'padding-right'));
    const paddingBottom = parseFloat(this.getStyle(canvasDom, 'padding-bottom'));
    const width = right - left - paddingLeft - paddingRight;
    const height = bottom - top - paddingTop - paddingBottom;
    const pixelRatio = canvas.get('pixelRatio');

    // We divide by the current device pixel ratio, because the canvas is scaled up by that amount in each direction. However
    // the backend model is in unscaled coordinates. Since we are going to deal with our model coordinates, we go back here
    const mouseX = Math.round((point.x - left - paddingLeft) / (width) * canvasDom.width / pixelRatio);
    const mouseY = Math.round((point.y - top - paddingTop) / (height) * canvasDom.height / pixelRatio);

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
  measureText(text, font) {
    if (!_dummyCtx) {
      _dummyCtx = document.createElement('canvas').getContext('2d');
    }

    _dummyCtx.font = font || '12px sans-serif';
    return _dummyCtx.measureText(text);
  }
};

module.exports = DomUtil;
