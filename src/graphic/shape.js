const Util = require('../util/common');
const Element = require('./element');

class Shape extends Element {
  _initProperties() {
    this._attrs = {
      zIndex: 0,
      visible: true,
      destroyed: false,
      isShape: true,
      attrs: {}
    };
  }

  drawInner(context) {
    const self = this;
    const attrs = self.get('attrs');
    self.createPath(context);
    const originOpacity = context.globalAlpha;
    if (self.hasFill()) {
      const fillOpacity = attrs.fillOpacity;
      if (!Util.isNil(fillOpacity) && fillOpacity !== 1) {
        context.globalAlpha = fillOpacity;
        context.fill();
        context.globalAlpha = originOpacity;
      } else {
        context.fill();
      }
    }
    if (self.hasStroke()) {
      const lineWidth = attrs.lineWidth;
      if (lineWidth > 0) {
        const strokeOpacity = attrs.strokeOpacity;
        if (!Util.isNil(strokeOpacity) && strokeOpacity !== 1) {
          context.globalAlpha = strokeOpacity;
        }
        context.stroke();
      }
    }
  }

  getBBox() {
    let bbox = this._attrs.bbox;
    // 延迟计算
    if (!bbox) {
      bbox = this.calculateBox();
      if (bbox) {
        bbox.x = bbox.minX;
        bbox.y = bbox.minY;
        bbox.width = bbox.maxX - bbox.minX;
        bbox.height = bbox.maxY - bbox.minY;
      }
      this._attrs.bbox = bbox;
    }
    return bbox;
  }

  /**
   * @protected
   * 计算包围盒
   * @return {Object} 包围盒
   */
  calculateBox() {
    return null;
  }

  createPath() {}
}

module.exports = Shape;
