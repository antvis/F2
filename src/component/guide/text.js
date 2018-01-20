const Util = require('../../util/common');
const GuideBase = require('./base');

class Text extends GuideBase {
  getDefaultCfg() {
    return {
      type: 'text',
      /**
       * 辅助文本的位置
       * @type {Object | Function | Array}
       */
      position: null,
      /**
       * 辅助文本的显示文字
       * @type {String}
       */
      content: null,
      /**
       * 辅助文本的样式配置
       * @type {Object}
       */
      style: {
        fill: '#000'
      },
      /**
       * x 方向的偏移量
       * @type {Number}
       */
      offsetX: 0,
      /**
       * y 方向的偏移量
       * @type {Number}
       */
      offsetY: 0
    };
  }

  render(coord, container) {
    const position = this.position;
    const point = this.parsePoint(coord, position);
    const { content, style, offsetX, offsetY } = this;

    if (offsetX) {
      point.x += offsetX;
    }

    if (offsetY) {
      point.y += offsetY;
    }

    const shape = container.addShape('text', {
      className: 'guide-text',
      attrs: Util.mix({
        x: point.x,
        y: point.y,
        text: content
      }, style)
    });
    this.element = shape;
  }
}

module.exports = Text;
