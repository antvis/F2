const DOMUtil = require('../../util/dom');
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
  } else if (alignX === 'middle' && alignY === 'bottom') {
    result[0] = Math.floor(-width / 2);
    result[1] = Math.floor(-height);
  } else if (alignX === 'middle' && alignY === 'top') {
    result[0] = Math.floor(-width / 2);
    result[1] = 0;
  } else {
    result[0] = Math.floor(-width / 2);
    result[1] = Math.floor(-height / 2);
  }

  return result;
}

class Html extends GuideBase {
  getDefaultCfg() {
    return {
      type: 'html',
      /**
       * dom 显示位置点
       * @type {Object | Array}
       */
      position: null,
      /**
       * 水平方向对齐方式，可取值 'left'、'middle'、'right'
       * @type {String}
       */
      alignX: 'middle',
      /**
       * 垂直方向对齐方式，可取值 'top'、'middle'、'bottom'
       * @type {String}
       */
      alignY: 'middle',
      /**
       * x 方向的偏移量
       * @type {Number}
       */
      offsetX: null,
      /**
       * y 方向的偏移量
       * @type {Number}
       */
      offsetY: null,
      /**
      * html内容
      *@type {String | Function}
      */
      html: null
    };
  }

  // override paint
  render(coord, container) {
    const self = this;
    const position = self.parsePoint(coord, self.position);
    let myNode = DOMUtil.createDom(self.html);
    myNode = DOMUtil.modifyCSS(myNode, {
      position: 'absolute',
      top: Math.floor(position.y) + 'px',
      left: Math.floor(position.x) + 'px',
      visibility: 'hidden'
    });

    let parentNode = container.get('canvas').get('el').parentNode;
    parentNode = DOMUtil.modifyCSS(parentNode, {
      position: 'relative'
    });
    // 创建html guide 的容器
    let wrapperNode;
    if (parentNode.getElementsByClassName('guideWapper').length > 0) {
      wrapperNode = parentNode.getElementsByClassName('guideWapper')[0];
    } else {
      wrapperNode = DOMUtil.createDom('<div class="guideWapper"></div>');
      wrapperNode = DOMUtil.modifyCSS(wrapperNode, {
        position: 'absolute',
        top: 0,
        left: 0
      });
      parentNode.appendChild(wrapperNode);
    }
    wrapperNode.appendChild(myNode);

    const { alignX, alignY, offsetX, offsetY } = self;
    const width = DOMUtil.getWidth(myNode);
    const height = DOMUtil.getHeight(myNode);
    const newOffset = getOffsetFromAlign(alignX, alignY, width, height);
    position.x = position.x + newOffset[0];
    position.y = position.y + newOffset[1];

    if (offsetX) {
      position.x += offsetX;
    }

    if (offsetY) {
      position.y += offsetY;
    }

    DOMUtil.modifyCSS(myNode, {
      top: Math.floor(position.y) + 'px',
      left: Math.floor(position.x) + 'px',
      visibility: 'visible'
    });
  }
}

module.exports = Html;
