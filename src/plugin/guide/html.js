const DOMUtil = require('../../util/dom');
const Guide = require('./guide');
const Global = require('../../global');

function getOffsetFromAlign(align, width, height) {
  const result = [];
  switch (align) {
    case 'tl':
      result[0] = 0;
      result[1] = 0;
      break;
    case 'tr':
      result[0] = -width;
      result[1] = 0;
      break;
    case 'bl':
      result[0] = 0;
      result[1] = Math.floor(-height);
      break;
    case 'br':
      result[0] = Math.floor(-width);
      result[1] = Math.floor(-height);
      break;
    case 'rc':
      result[0] = Math.floor(-width);
      result[1] = Math.floor(-height / 2);
      break;
    case 'lc':
      result[0] = 0;
      result[1] = Math.floor(-height / 2);
      break;
    case 'tc':
      result[0] = Math.floor(-width / 2);
      result[1] = Math.floor(-height);
      break;
    case 'bc':
      result[0] = Math.floor(-width / 2);
      result[1] = 0;
      break;
    default:
      result[0] = Math.floor(-width / 2);
      result[1] = Math.floor(-height / 2);
  }
  return result;
}

class Html extends Guide {
  getDefaultCfg() {
    return {
      type: 'html',
      position: [],
      top: true, // 默认在上面显示
      html: '',
      cfg: Global.guide.html
    };
  }

  // override paint
  paint(coord, container) {
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

    const cfg = self.cfg;
    // 对齐
    if (cfg.align) {
      const align = cfg.align;
      const width = DOMUtil.getWidth(myNode);
      const height = DOMUtil.getHeight(myNode);
      const newOffset = getOffsetFromAlign(align, width, height);
      position.x = position.x + newOffset[0];
      position.y = position.y + newOffset[1];
    }

    // 偏移
    if (cfg.offset) {
      const offset = cfg.offset;
      position.x = position.x + offset[0];
      position.y = position.y + offset[1];
    }

    DOMUtil.modifyCSS(myNode, {
      top: Math.floor(position.y) + 'px',
      left: Math.floor(position.x) + 'px',
      visibility: 'visible'
    });
  }
}

module.exports = Html;
