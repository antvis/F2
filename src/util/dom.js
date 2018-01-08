/**
 * TODO: 这个会抽离至 platfrom，在 html5 环境下使用这个
 */
let DomUtil;
const EXPANDO_KEY = '$f2chart';
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

function addEventListener(node, type, listener) {
  node.addEventListener(type, listener, eventListenerOptions);
}

function removeEventListener(node, type, listener) {
  node.removeEventListener(type, listener, eventListenerOptions);
}

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

  const point = {};
  const touches = event.touches;
  if (touches && touches.length > 0) {
    point.x = touches[0].clientX;
    point.y = touches[0].clientY;
  } else {
    point.x = event.clientX;
    point.y = event.clientY;
  }
  const canvas = chart.get('canvas');
  // const canvasEl = canvas.get('el');
  const pos = DomUtil.getRelativePosition(point, canvas);
  return createEvent(type, chart, pos.x, pos.y, event);
}

DomUtil = {
  modifyCSS(DOM, CSS) {
    for (const key in CSS) {
      if (CSS.hasOwnProperty(key)) {
        DOM.style[key] = CSS[key];
      }
    }
    return DOM;
  },
  createDom(str) {
    const container = document.createElement('div');
    str = str.replace(/(^\s*)|(\s*$)/g, '');
    container.innerHTML = '' + str;
    return container.childNodes[0];
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
  createCanvas() {
    return document.createElement('canvas');
  },
  /**
   * Registers the specified listener on the given chart.
   * @param {Chart} chart - Chart from which to listen for event
   * @param {String} type - The ({@link IEvent}) type to listen for
   * @param {Function} listener - Receives a notification (an object that implements
   * the {@link IEvent} interface) when an event of the specified type occurs.
   */
  addEventListener(chart, type, listener) {
    const canvas = chart.get('canvas').get('el');

    const expando = listener[EXPANDO_KEY] || (listener[EXPANDO_KEY] = {});
    const proxies = expando.proxies || (expando.proxies = {});
    const proxy = proxies[chart.get('chartId') + '_' + type] = event => {
      listener(fromNativeEvent(event, chart));
    };

    addEventListener(canvas, type, proxy);
  },
  /**
   * Removes the specified listener previously registered with addEventListener.
   * @param {Chart} chart -Chart from which to remove the listener
   * @param {String} type - The ({@link IEvent}) type to remove
   * @param {Function} listener - The listener function to remove from the event target.
   */
  removeEventListener(chart, type, listener) {
    const canvas = chart.get('canvas').get('el');

    const expando = listener[EXPANDO_KEY] || {};
    const proxies = expando.proxies || {};
    const proxy = proxies[chart.get('chartId') + '_' + type];
    if (!proxy) {
      return;
    }

    removeEventListener(canvas, type, proxy);
  }
};

module.exports = DomUtil;
