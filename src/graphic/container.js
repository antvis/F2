const Util = require('../util/common');
const Shape = require('./shape');
const SHAPE_MAP = {};
const INDEX = '_INDEX';

function getComparer(compare) {
  return function(left, right) {
    const result = compare(left, right);
    return result === 0 ? left[INDEX] - right[INDEX] : result;
  };
}

module.exports = {

  getGroupClass() {},

  getChildren() {
    return this.get('children');
  },

  addShape(type, cfg = {}) {
    const canvas = this.get('canvas');
    let shapeType = SHAPE_MAP[type];
    if (!shapeType) {
      shapeType = Util.upperFirst(type);
      SHAPE_MAP[type] = shapeType;
    }
    cfg.canvas = canvas;
    if (shapeType === 'Text' && canvas && canvas.get('fontFamily')) {
      cfg.attrs.fontFamily = cfg.attrs.fontFamily || canvas.get('fontFamily');
    }

    const shape = new Shape[shapeType](cfg);
    this.add(shape);
    return shape;
  },

  addGroup(cfg) {
    const canvas = this.get('canvas');
    const groupClass = this.getGroupClass();
    cfg = Util.mix({}, cfg);
    cfg.canvas = canvas;
    cfg.parent = this;
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
    if (!Util.isArray(items)) {
      items = [ items ];
    }

    for (let i = 0, len = items.length; i < len; i++) {
      const item = items[i];
      const parent = item.get('parent');
      if (parent) {
        const descendants = parent.get('children');
        Util.Array.remove(descendants, item);
      }
      self._setEvn(item);
      children.push(item);
    }

    return self;
  },

  _setEvn(item) {
    const self = this;
    item._attrs.parent = self;
    item._attrs.context = self._attrs.context;
    item._attrs.canvas = self._attrs.canvas;
    const clip = item._attrs.attrs.clip;
    if (clip) {
      clip.set('parent', self);
      clip.set('context', self.get('context'));
    }
    if (item._attrs.isGroup) {
      const children = item._attrs.children;
      for (let i = 0, len = children.length; i < len; i++) {
        item._setEvn(children[i]);
      }
    }
  }
};
