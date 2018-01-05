const Util = require('../util/common');
const Element = require('./element');
const Container = require('./container');
const Vector2 = require('./util/vector2');

class Group extends Element {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    return Util.mix({}, cfg, {
      isGroup: true,
      children: []
    });
  }

  drawInner(context) {
    const children = this.get('children');
    for (let i = 0; i < children.length; i++) {
      const child = children[i];
      child.draw(context);
    }
    return this;
  }

  clearTotalMatrix() {
    const m = this._attrs.totalMatrix;
    if (m) {
      this._attrs.totalMatrix = null;
      const children = this._attrs.children;
      for (let i = 0; i < children.length; i++) {
        const child = children[i];
        child.clearTotalMatrix();
      }
    }
  }

  getBBox() {
    const self = this;
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    const children = self.get('children');
    // Util.each(children, function(child) {
    for (let i = 0, length = children.length; i < length; i++) {
      const child = children[i];
      if (child.get('visible')) {
        const box = child.getBBox();
        if (!box) {
          continue;
        }

        const leftTop = [ box.minX, box.minY ];
        const leftBottom = [ box.minX, box.maxY ];
        const rightTop = [ box.maxX, box.minY ];
        const rightBottom = [ box.maxX, box.maxY ];

        Vector2.transformMat2d(leftTop, leftTop, child.get('matrix'));
        Vector2.transformMat2d(leftBottom, leftBottom, child.get('matrix'));
        Vector2.transformMat2d(rightTop, rightTop, child.get('matrix'));
        Vector2.transformMat2d(rightBottom, rightBottom, child.get('matrix'));

        minX = Math.min(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0], minX);
        maxX = Math.max(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0], maxX);
        minY = Math.min(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1], minY);
        maxY = Math.max(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1], maxY);
      }
    }

    return {
      minX,
      minY,
      maxX,
      maxY,
      x: minX,
      y: minY,
      width: maxX - minX,
      height: maxY - minY
    };
  }

  destroy() {
    if (this.get('destroyed')) {
      return;
    }
    this.clear();
    super.destroy();
  }
}

Util.mix(Group.prototype, Container, {
  getGroupClass() {
    return Group;
  }
});

module.exports = Group;
