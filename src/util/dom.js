const DomUtil = {
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
  }
};

module.exports = DomUtil;
