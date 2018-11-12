const Util = require('../util/common');
const { Group } = require('../graphic/index');

class TextBox {
  getDefaultCfg() {
    return {
      x: 0,
      y: 0,
      content: '',
      textStyle: {
        fontSize: 12,
        fill: '#fff',
        textAlign: 'center',
        textBaseline: 'middle'
      },
      background: {
        radius: 1,
        fill: 'rgba(0, 0, 0, 0.65)',
        padding: [ 3, 5 ]
      },
      width: 0,
      height: 0,
      className: ''
    };
  }

  constructor(cfg) {
    Util.deepMix(this, this.getDefaultCfg(), cfg);
    this._init();
    const { content, x, y } = this;

    if (!Util.isNil(content)) {
      this.updateContent(content);
    }

    this.updatePosition(x, y);
  }

  _init() {
    const { content, textStyle, background, className, visible } = this;
    const container = new Group({
      className,
      zIndex: 0,
      visible
    });
    const text = container.addShape('Text', {
      className: className + '-text',
      zIndex: 1,
      attrs: Util.mix({
        text: content,
        x: 0,
        y: 0
      }, textStyle)
    });
    const backgroundShape = container.addShape('Rect', {
      className: className + '-bg',
      zIndex: -1,
      attrs: Util.mix({
        x: 0,
        y: 0,
        width: 0,
        height: 0
      }, background)
    });
    container.sort();
    this.container = container;
    this.textShape = text;
    this.backgroundShape = backgroundShape;
  }

  _getBBox() {
    const textShape = this.textShape;
    const background = this.background;
    const textBBox = textShape.getBBox();
    const padding = Util.parsePadding(background.padding);
    const width = textBBox.width + padding[1] + padding[3];
    const height = textBBox.height + padding[0] + padding[2];
    const x = textBBox.minX - padding[3];
    const y = textBBox.minY - padding[0];
    return {
      x,
      y,
      width,
      height
    };
  }

  updateContent(text) {
    const { textShape, backgroundShape } = this;
    if (!Util.isNil(text)) {
      if (!Util.isObject(text)) {
        text = { text };
      }
      textShape.attr(text);
      // update box shape
      const { x, y, width: tipWidth, height: tipHeight } = this._getBBox();
      const width = this.width || tipWidth;
      const height = this.height || tipHeight;
      backgroundShape.attr({
        x,
        y,
        width,
        height
      });
      this._width = width;
      this._height = height;
      this.content = text.text;
    }
  }

  updatePosition(x, y) {
    const container = this.container;
    const { x: xMin, y: yMin } = this._getBBox();
    container.moveTo(x - xMin, y - yMin);
    this.x = x - xMin;
    this.y = y - yMin;
  }

  getWidth() {
    return this._width;
  }

  getHeight() {
    return this._height;
  }

  show() {
    this.container.show();
  }

  hide() {
    this.container.hide();
  }

  clear() {
    const container = this.container;
    container.clear();
    container.remove(true);
    this.container = null;
    this.textShape = null;
    this.backgroundShape = null;
  }
}

module.exports = TextBox;
