const Util = require('../util/common');
const Element = require('./element');
const Container = require('./container');

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
    // const self = this;
    // let minX = Infinity;
    // let maxX = -Infinity;
    // let minY = Infinity;
    // let maxY = -Infinity;
    // const children = self.get('children');
    // Util.each(children, function(child) {
    //   if (child.get('visible')) {
    //     const box = child.getBBox();
    //     if (!box) {
    //       return true;
    //     }

    //     const leftTop = [ box.minX, box.minY, 1 ];
    //     const leftBottom = [ box.minX, box.maxY, 1 ];
    //     const rightTop = [ box.maxX, box.minY, 1 ];
    //     const rightBottom = [ box.maxX, box.maxY, 1 ];

    //     child.apply(leftTop);
    //     child.apply(leftBottom);
    //     child.apply(rightTop);
    //     child.apply(rightBottom);

    //     const boxMinX = Math.min(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0]);
    //     const boxMaxX = Math.max(leftTop[0], leftBottom[0], rightTop[0], rightBottom[0]);
    //     const boxMinY = Math.min(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1]);
    //     const boxMaxY = Math.max(leftTop[1], leftBottom[1], rightTop[1], rightBottom[1]);

    //     if (boxMinX < minX) {
    //       minX = boxMinX;
    //     }

    //     if (boxMaxX > maxX) {
    //       maxX = boxMaxX;
    //     }

    //     if (boxMinY < minY) {
    //       minY = boxMinY;
    //     }

    //     if (boxMaxY > maxY) {
    //       maxY = boxMaxY;
    //     }
    //   }
    // });
    // const box = {
    //   minX,
    //   minY,
    //   maxX,
    //   maxY
    // };
    // box.x = box.minX;
    // box.y = box.minY;
    // box.width = box.maxX - box.minX;
    // box.height = box.maxY - box.minY;
    // return box;
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
