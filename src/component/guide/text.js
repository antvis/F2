const Util = require('../../util/common');
const GuideBase = require('./base');

class Text extends GuideBase {
  _initDefaultCfg() {
    this.type = 'text';
    /**
     * 辅助文本的位置
     * @type {Function | Array}
     */
    this.position = null;
    /**
     * 辅助文本的显示文字
     * @type {String}
     */
    this.content = null;
    /**
     * 辅助文本的样式配置
     * @type {Object}
     */
    this.style = {
      fill: '#000'
    };
    /**
     * x 方向的偏移量
     * @type {Number}
     */
    this.offsetX = 0;
    /**
     * y 方向的偏移量
     * @type {Number}
     */
    this.offsetY = 0;
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
    return shape;
  }
}

GuideBase.Text = Text;
module.exports = Text;
