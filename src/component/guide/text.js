const Util = require('../../util/common');
const GuideBase = require('./base');

class Text extends GuideBase {
  _initDefaultCfg() {
    this.type = 'text';
    /**
     * the position of text
     * @type {Function | Array}
     */
    this.position = null;
    /**
     * the display content
     * @type {String}
     */
    this.content = null;
    /**
     * style configuration for text
     * @type {Object}
     */
    this.style = {
      fill: '#000'
    };
    /**
     * offset of horizontal direction
     * @type {Number}
     */
    this.offsetX = 0;
    /**
     * offset of vertical direction
     * @type {Number}
     */
    this.offsetY = 0;
  }

  render(coord, container) {
    const position = this.position;
    const point = this.parsePoint(coord, position);
    if (!point) {
      return;
    }
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
