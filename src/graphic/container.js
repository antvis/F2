const Util = require('../util/common');
const Shape = require('./shape');
const SHAPE_MAP = {}; // 缓存图形类型
const INDEX = '_INDEX';

function getComparer(compare) {
  return function(left, right) {
    const result = compare(left, right);
    return result === 0 ? left[INDEX] - right[INDEX] : result;
  };
}

module.exports = {

  getGroupClass() {},

  /**
   * 创建并添加 Shape
   * @param {String} type 添加的 shape 类型
   * @param {Object} cfg  shape 的配置项
   * @return {Shape} 返回创建的 shape 实例
   */
  addShape(type, cfg = {}) {
    const canvas = this.get('canvas');
    let shapeType = SHAPE_MAP[type];
    if (!shapeType) {
      shapeType = Util.upperFirst(type);
      SHAPE_MAP[type] = shapeType;
    }
    cfg.canvas = canvas;
    // cfg.type = type;

    // 设置字体
    if (shapeType === 'Text' && canvas && canvas.get('fontFamily')) {
      cfg.attrs.fontFamily = cfg.attrs.fontFamily || canvas.get('fontFamily');
    }

    const shape = new Shape[shapeType](cfg);
    this.add(shape);
    return shape;
  },

  /**
   * 创建并添加 Group 组
   * @param {Object|null} cfg 配置信息
   * @return {Group} 返回创建的 Group 实例
   */
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

  /**
   * 判断是否包含 item
   * @param  {Shape|Group} item shape 或者 group 实例
   * @return {Boolean}      true 表示包含，false 表示不包含
   */
  contain(item) {
    const children = this.get('children');
    return children.indexOf(item) > -1;
  },

  /**
   * 按照各个元素的 zIndex 进行从大到小的排序
   * @return {Canvas|Group} 返回自己
   */
  sort() {
    const children = this.get('children');
    // 必须保证稳定排序
    for (let i = 0, len = children.length; i < len; i++) {
      const child = children[i];
      child[INDEX] = i;
    }

    children.sort(getComparer(function(obj1, obj2) {
      return obj1.get('zIndex') - obj2.get('zIndex');
    }));

    return this;
  },

  /**
   * 清除所有的元素
   * @return {Canvas|Group} 返回自己
   */
  clear() {
    const children = this.get('children');

    while (children.length !== 0) {
      children[children.length - 1].remove(true);
    }
    return this;
  },

  /**
   * 添加元素
   * @param {Array|Group|Shape} items group 实例或者 shape 实例或者他们的数组集合
   * @return {Group} 返回自身
   */
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
