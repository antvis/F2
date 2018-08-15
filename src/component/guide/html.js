const Util = require('../../util/common');
const GuideBase = require('./base');

function getOffsetFromAlign(alignX, alignY, width, height) {
  const result = [];

  if (alignX === 'left' && alignY === 'top') {
    result[0] = 0;
    result[1] = 0;
  } else if (alignX === 'right' && alignY === 'top') {
    result[0] = -width;
    result[1] = 0;
  } else if (alignX === 'left' && alignY === 'bottom') {
    result[0] = 0;
    result[1] = Math.floor(-height);
  } else if (alignX === 'right' && alignY === 'bottom') {
    result[0] = Math.floor(-width);
    result[1] = Math.floor(-height);
  } else if (alignX === 'right' && alignY === 'middle') {
    result[0] = Math.floor(-width);
    result[1] = Math.floor(-height / 2);
  } else if (alignX === 'left' && alignY === 'middle') {
    result[0] = 0;
    result[1] = Math.floor(-height / 2);
  } else if (alignX === 'center' && alignY === 'bottom') {
    result[0] = Math.floor(-width / 2);
    result[1] = Math.floor(-height);
  } else if (alignX === 'center' && alignY === 'top') {
    result[0] = Math.floor(-width / 2);
    result[1] = 0;
  } else {
    result[0] = Math.floor(-width / 2);
    result[1] = Math.floor(-height / 2);
  }

  return result;
}

function modifyCSS(DOM, CSS) {
  for (const key in CSS) {
    if (CSS.hasOwnProperty(key)) {
      DOM.style[key] = CSS[key];
    }
  }
  return DOM;
}

function createDom(str) {
  const container = document.createElement('div');
  str = str.replace(/(^\s*)|(\s*$)/g, '');
  container.innerHTML = '' + str;
  return container.childNodes[0];
}

class Html extends GuideBase {
  _initDefaultCfg() {
    this.type = 'html';
    /**
     * dom 显示位置点
     * @type {Object | Array}
     */
    this.position = null;
    /**
      * 水平方向对齐方式，可取值 'left'、'center'、'right'
      * @type {String}
      */
    this.alignX = 'center';
    /**
      * 垂直方向对齐方式，可取值 'top'、'middle'、'bottom'
      * @type {String}
      */
    this.alignY = 'middle';
    /**
      * x 方向的偏移量
      * @type {Number}
      */
    this.offsetX = null;
    /**
      * y 方向的偏移量
      * @type {Number}
      */
    this.offsetY = null;
    /**
    * html内容
    *@type {String | Function}
    */
    this.html = null;
  }

  // override paint
  render(coord, container) {
    const self = this;
    const position = self.parsePoint(coord, self.position);
    if (!position) {
      return;
    }
    let myNode = createDom(self.html);
    myNode = modifyCSS(myNode, {
      position: 'absolute',
      top: Math.floor(position.y) + 'px',
      left: Math.floor(position.x) + 'px',
      visibility: 'hidden'
    });

    const canvasDom = container.get('canvas').get('el');
    let parentNode = canvasDom.parentNode;
    parentNode = modifyCSS(parentNode, {
      position: 'relative'
    });
    // 创建html guide 的容器
    const wrapperNode = createDom('<div class="guideWapper" style="position: absolute;top: 0; left: 0;"></div>');
    parentNode.appendChild(wrapperNode);
    wrapperNode.appendChild(myNode);

    // 需要考虑 canvas 元素在父容器中的相对位置
    const canvasOffsetTop = canvasDom.offsetTop;
    const canvasOffsetLeft = canvasDom.offsetLeft;
    const { alignX, alignY, offsetX, offsetY } = self;
    const width = Util.getWidth(myNode);
    const height = Util.getHeight(myNode);
    const newOffset = getOffsetFromAlign(alignX, alignY, width, height);
    position.x = position.x + newOffset[0] + canvasOffsetLeft;
    position.y = position.y + newOffset[1] + canvasOffsetTop;

    if (offsetX) {
      position.x += offsetX;
    }

    if (offsetY) {
      position.y += offsetY;
    }

    modifyCSS(myNode, {
      top: Math.floor(position.y) + 'px',
      left: Math.floor(position.x) + 'px',
      visibility: 'visible'
    });
    self.element = wrapperNode;
  }

  remove() {
    const element = this.element;
    element && element.parentNode && element.parentNode.removeChild(element);
  }
}

GuideBase.Html = Html;
module.exports = Html;
