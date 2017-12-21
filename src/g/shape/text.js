const Util = require('../../util/common');
const Shape = require('../shape');

const STYLES = [ 'fontSize', 'fontFamily', 'fontStyle', 'fontWeight', 'fontVariant' ];

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
        [ 't', -1 * attrs.x, -1 * attrs.y ],
        [ 's', +fontSize / 12, +fontSize / 12 ],
        [ 't', attrs.x, attrs.y ]
      ]);
    }
  }

  _getFontStyle() {
    const attrs = this.get('attrs');
    const { fontSize, fontFamily, fontWeight, fontStyle, fontVariant } = attrs;
    attrs.font = [ fontStyle, fontVariant, fontWeight, fontSize + 'px', fontFamily ].join(' ');
  }

  _setAttr(name, value) {
    super._setAttr(name, value);

    if (STYLES.indexOf(name) > -1) {
      this._getFontStyle();
    }

    if (name === 'text') {
      const attrs = this.get('attrs');
      const text = attrs.text;
      let textArr;
      if (Util.isString(text) && (text.indexOf('\n') !== -1)) {
        textArr = text.split('\n');
        const lineCount = textArr.length;
        attrs.lineCount = lineCount;
        attrs.textArr = textArr;
      }
    }
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

    context.beginPath();
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
}

module.exports = Text;
