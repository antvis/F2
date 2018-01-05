const Util = require('../../util/common');
const DOMUtil = require('../../util/dom');
const Shape = require('../shape');

let dummyContext;
let textWidthCacheCounter = 0;
let textWidthCache = {};
const TEXT_CACHE_MAX = 5000;

class Text extends Shape {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      canFill: true,
      canStroke: true,
      type: 'text'
    });
  }

  getDefaultAttrs() {
    return {
      lineWidth: 1,
      lineCount: 1,
      fontSize: 12,
      fontFamily: 'sans-serif',
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontVariant: 'normal',
      textAlign: 'start',
      textBaseline: 'bottom',
      lineHeight: null,
      textArr: null
    };
  }

  initTransform() {
    const attrs = this._attrs.attrs;
    this._attrs.matrix = [ 1, 0, 0, 1, 0, 0 ];
    const fontSize = attrs.fontSize;
    if (fontSize && +fontSize < 12) { // 小于 12 像素的文本进行 scale 处理
      this.transform([
        [ 't', attrs.x, attrs.y ],
        [ 's', +fontSize / 12, +fontSize / 12 ],
        [ 't', -attrs.x, -attrs.y ]
      ]);
    }
  }

  _getFontStyle() {
    const attrs = this.get('attrs');
    const { fontSize, fontFamily, fontWeight, fontStyle, fontVariant } = attrs;
    return [ fontStyle, fontVariant, fontWeight, fontSize + 'px', fontFamily ].join(' ');
  }

  _afterAttrsSet() {
    const attrs = this.get('attrs');
    attrs.font = this._getFontStyle();

    if (attrs.text) {
      const text = attrs.text;
      let textArr;
      if (Util.isString(text) && (text.indexOf('\n') !== -1)) {
        textArr = text.split('\n');
        const lineCount = textArr.length;
        attrs.lineCount = lineCount;
        attrs.textArr = textArr;
      }
    }
    this.set('attrs', attrs);
  }

  _getTextHeight() {
    const attrs = this.get('attrs');
    const lineCount = attrs.lineCount;
    const fontSize = attrs.fontSize * 1;
    if (lineCount > 1) {
      const spaceingY = this._getSpaceingY();
      return fontSize * lineCount + spaceingY * (lineCount - 1);
    }
    return fontSize;
  }

  _getSpaceingY() {
    const attrs = this.get('attrs');
    const lineHeight = attrs.lineHeight;
    const fontSize = attrs.fontSize * 1;
    return lineHeight ? (lineHeight - fontSize) : fontSize * 0.14;
  }

  drawInner(context) {
    const self = this;
    const attrs = self.get('attrs');
    const text = attrs.text;
    if (!text) {
      return;
    }
    const textArr = attrs.textArr;
    const fontSize = attrs.fontSize * 1;
    const spaceingY = self._getSpaceingY();
    const x = attrs.x;
    const y = attrs.y;
    const textBaseline = attrs.textBaseline;
    let height;
    if (textArr) {
      height = self._getTextHeight();
    }
    let subY;

    // context.beginPath();
    if (self.hasFill()) {
      const fillOpacity = attrs.fillOpacity;
      if (!Util.isNil(fillOpacity) && fillOpacity !== 1) {
        context.globalAlpha = fillOpacity;
      }
      if (textArr) {
        for (let i = 0; i < textArr.length; i++) {
          const subText = textArr[i];
          subY = y + i * (spaceingY + fontSize) - height + fontSize; // bottom;
          if (textBaseline === 'middle') {
            subY += height - fontSize - (height - fontSize) / 2;
          }
          if (textBaseline === 'top') {
            subY += height - fontSize;
          }
          context.fillText(subText, x, subY);
        }
      } else {
        context.fillText(text, x, y);
      }
    }

    if (self.hasStroke()) {
      if (textArr) {
        for (let i = 0; i < textArr.length; i++) {
          const subText = textArr[i];
          subY = y + i * (spaceingY + fontSize) - height + fontSize; // bottom;
          if (textBaseline === 'middle') {
            subY += height - fontSize - (height - fontSize) / 2;
          }
          if (textBaseline === 'top') {
            subY += height - fontSize;
          }
          context.strokeText(subText, x, subY);
        }
      } else {
        context.strokeText(text, x, y);
      }
    }
  }

  calculateBox() {
    const self = this;
    const attrs = self.get('attrs');
    const { x, y, textAlign, textBaseline, lineWidth } = attrs;
    const width = self._getTextWidth(); // attrs.width
    if (!width) {
      // 如果width不存在，四点共其实点
      return {
        minX: x,
        minY: y,
        maxX: x,
        maxY: y
      };
    }
    const height = self._getTextHeight(); // attrs.height
    const point = {
      x,
      y: y - height
    }; // default textAlign: start, textBaseline: bottom

    if (textAlign) {
      if (textAlign === 'end' || textAlign === 'right') {
        point.x -= width;
      } else if (textAlign === 'center') {
        point.x -= width / 2;
      }
    }

    if (textBaseline) {
      if (textBaseline === 'top') {
        point.y += height;
      } else if (textBaseline === 'middle') {
        point.y += height / 2;
      }
    }

    const halfWidth = lineWidth / 2;
    return {
      minX: point.x - halfWidth,
      minY: point.y - halfWidth,
      maxX: point.x + width + halfWidth,
      maxY: point.y + height + halfWidth
    };
  }

  _getDummyContext() {
    if (dummyContext) {
      return dummyContext;
    }
    dummyContext = DOMUtil.createCanvas().getContext('2d');
    return dummyContext;
  }

  _getTextWidth() {
    const self = this;
    const attrs = self.get('attrs');
    const { text, font, textArr } = attrs;

    if (Util.isNil(text)) return undefined;

    const key = text + '' + font;
    if (textWidthCache[key]) {
      return textWidthCache[key];
    }

    let width = 0;
    const context = self._getDummyContext();
    context.font = font;
    if (textArr) {
      for (let i = 0, length = textArr.length; i < length; i++) {
        const subText = textArr[i];
        width = Math.max(width, context.measureText(subText).width);
      }
    } else {
      width = context.measureText(text).width;
    }

    if (textWidthCacheCounter > TEXT_CACHE_MAX) {
      textWidthCacheCounter = 0;
      textWidthCache = {};
    }
    textWidthCacheCounter++;
    textWidthCache[key] = width;

    return width;
  }
}

module.exports = Text;
