import { upperFirst, isArray, Array } from '../../util/common';
import Shape from './shape';

const SHAPE_MAP = {};
const INDEX = '_INDEX';

function getComparer(compare) {
  return function(left, right) {
    const result = compare(left, right);
    return result === 0 ? left[INDEX] - right[INDEX] : result;
  };
}

export default {

  getGroupClass() {},

  getChildren() {
    return this.get('children');
  },

  addShape(type, cfg = {}) {
    let shapeType = SHAPE_MAP[type];
    if (!shapeType) {
      shapeType = upperFirst(type);
      SHAPE_MAP[type] = shapeType;
    }
    const shape = new Shape[shapeType](cfg);
    this.add(shape);
    return shape;
  },

  addGroup(cfg) {
    const groupClass = this.getGroupClass();
    const rst = new groupClass(cfg);
    this.add(rst);
    return rst;
  },

  contain(item) {
    const children = this.get('children');
    return children.indexOf(item) > -1;
  },

  sort() {
    const children = this.get('children');
    for (let i = 0, len = children.length; i < len; i++) {
      const child = children[i];
      child[INDEX] = i;
    }

    children.sort(getComparer(function(obj1, obj2) {
      return obj1.get('zIndex') - obj2.get('zIndex');
    }));

    return this;
  },

  drawChildren(context) {
    const children = this.get('children');
    for (let i = 0, len = children.length; i < len; i++) {
      const child = children[i];
      child.draw(context);
    }
    return this;
  },

  clear() {
    const children = this.get('children');

    while (children.length !== 0) {
      children[children.length - 1].remove(true);
    }
    return this;
  },

  add(items) {
    const self = this;
    const children = self.get('children');
    if (!isArray(items)) {
      items = [ items ];
    }

    for (let i = 0, len = items.length; i < len; i++) {
      const item = items[i];
      const parent = item.get('parent');
      if (parent) {
        const descendants = parent.get('children');
        Array.remove(descendants, item);
      }
      self._setEvn(item);
      children.push(item);
    }

    return self;
  },

  _setEvn(item) {
    const self = this;
    const { context, canvas, aria } = self._attrs;
    const { isGroup, type } = item._attrs;

    item._attrs.parent = self;
    item._attrs.context = context;
    item._attrs.canvas = canvas;
    // 是否需要无障碍处理
    if (aria && item._attrs.aria !== false) {
      item._attrs.aria = aria;
    }

    if (type === 'text' && canvas && canvas.get('fontFamily')) {
      item._attrs.attrs.fontFamily = item._attrs.attrs.fontFamily || canvas.get('fontFamily');
    }

    const clip = item._attrs.attrs.clip;
    if (clip) {
      clip._attrs.parent = self;
      clip._attrs.context = context;
      clip._attrs.canvas = canvas;
    }
    if (isGroup) {
      const children = item._attrs.children;
      for (let i = 0, len = children.length; i < len; i++) {
        item._setEvn(children[i]);
      }
    }
  },

  _getAriaLabel() {
    const { aria, ariaLabel, children } = this._attrs;
    // 主动关闭
    if (!aria) return;
    const childAriaLabels = [];
    if (children && children.length) {
      for (let i = 0, len = children.length; i < len; i++) {
        const childAriaLabel = children[i].getAriaLabel();
        if (childAriaLabel) {
          childAriaLabels.push(childAriaLabel);
        }
      }
    }

    const childAriaLabel = childAriaLabels.join(' ');
    // 2个都有时拼接成完整句子
    if (ariaLabel && childAriaLabel) {
      return `${ariaLabel} ${childAriaLabel} `;
    }
    // 只有1个，或者都没有
    return ariaLabel || childAriaLabel;
  }
};
