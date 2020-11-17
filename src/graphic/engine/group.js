import { mix } from '../../util/common';
import Element from './element';
import Container from './container';
import Vector2 from '../util/vector2';

class Group extends Element {
  _initProperties() {
    this._attrs = {
      zIndex: 0,
      visible: true,
      destroyed: false,
      isGroup: true,
      children: []
    };
  }

  getBBox() {
    const self = this;
    let minX = Infinity;
    let maxX = -Infinity;
    let minY = Infinity;
    let maxY = -Infinity;
    const children = self.get('children');
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
        const matrix = child.attr('matrix');

        Vector2.transformMat2d(leftTop, leftTop, matrix);
        Vector2.transformMat2d(leftBottom, leftBottom, matrix);
        Vector2.transformMat2d(rightTop, rightTop, matrix);
        Vector2.transformMat2d(rightBottom, rightBottom, matrix);

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

mix(Group.prototype, Container, {
  getGroupClass() {
    return Group;
  }
});

export default Group;
