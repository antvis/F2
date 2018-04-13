const Util = require('../util/common');
const MatrixUtil = require('./util/matrix');
const Vector2 = require('./util/vector2');

// 是否未改变
function isUnchanged(m) {
  return m[0] === 1 && m[1] === 0 && m[2] === 0 && m[3] === 1 && m[4] === 0 && m[5] === 0;
}

const ALIAS_ATTRS_MAP = {
  stroke: 'strokeStyle',
  fill: 'fillStyle',
  opacity: 'globalAlpha'
};

const SHAPE_ATTRS = [
  'fillStyle',
  'font',
  'globalAlpha',
  'lineCap',
  'lineWidth',
  'lineJoin',
  'miterLimit',
  'shadowBlur',
  'shadowColor',
  'shadowOffsetX',
  'shadowOffsetY',
  'strokeStyle',
  'textAlign',
  'textBaseline',
  'lineDash'
];

const CLIP_SHAPES = [ 'circle', 'sector', 'polygon', 'rect', 'polyline' ];

class Element {
  _initProperties() {
    this._attrs = {
      zIndex: 0,
      visible: true,
      destroyed: false
    };
  }

  constructor(cfg) {
    this._initProperties();
    Util.mix(this._attrs, cfg);

    const attrs = this._attrs.attrs;
    if (attrs) { // 初始化图形属性
      this.initAttrs(attrs);
    }

    this.initTransform(); // 初始化变换
  }

  get(name) {
    return this._attrs[name];
  }

  set(name, value) {
    this._attrs[name] = value;
  }

  initAttrs(attrs) {
    this.attr(Util.mix(this.getDefaultAttrs(), attrs));
  }

  getDefaultAttrs() {
    return {};
  }

  _setAttr(name, value) {
    const attrs = this._attrs.attrs;
    if (name === 'clip') {
      value = this._setAttrClip(value);
    } else {
      const alias = ALIAS_ATTRS_MAP[name];
      if (alias) {
        attrs[alias] = value;
      }
    }
    attrs[name] = value;
  }

  _getAttr(name) {
    return this._attrs.attrs[name];
  }

  // _afterAttrsSet() {}

  _setAttrClip(clip) {
    if (clip && (CLIP_SHAPES.indexOf(clip._attrs.type) > -1)) {
      if (clip.get('canvas') === null) {
        clip = Object.assign({}, clip);
      }
      clip.set('parent', this.get('parent'));
      clip.set('context', this.get('context'));
      return clip;
    }
    return null;
  }

  attr(name, value) {
    const self = this;
    if (self.get('destroyed')) return null;
    const argumentsLen = arguments.length;
    if (argumentsLen === 0) {
      return self._attrs.attrs;
    }

    if (Util.isObject(name)) {
      this._attrs.bbox = null; // attr 改变了有可能会导致 bbox 改变，故在此清除
      for (const k in name) {
        self._setAttr(k, name[k]);
      }
      if (self._afterAttrsSet) {
        self._afterAttrsSet();
      }
      return self;
    }
    if (argumentsLen === 2) {
      this._attrs.bbox = null;
      self._setAttr(name, value);
      if (self._afterAttrsSet) {
        self._afterAttrsSet();
      }
      return self;
    }
    return self._getAttr(name);
  }

  getParent() {
    return this.get('parent');
  }

  draw(context) {
    if (this.get('destroyed')) {
      return;
    }
    if (this.get('visible')) {
      this.setContext(context);
      this.drawInner(context);
      this.restoreContext(context);
    }
  }

  setContext(context) {
    const clip = this._attrs.attrs.clip;
    context.save();
    if (clip) {
      clip.resetTransform(context);
      clip.createPath(context);
      context.clip();
    }
    this.resetContext(context);
    this.resetTransform(context);
  }

  restoreContext(context) {
    context.restore();
  }

  resetContext(context) {
    const elAttrs = this._attrs.attrs;
    if (!this.get('isGroup')) {
      for (const k in elAttrs) {
        if (SHAPE_ATTRS.indexOf(k) > -1) { // 非canvas属性不附加
          const v = elAttrs[k];
          if (k === 'lineDash' && context.setLineDash && v) {
            context.setLineDash(v);
          } else {
            context[k] = v;
          }
        }
      }
    }
  }

  hasFill() {
    return this.get('canFill') && this._attrs.attrs.fillStyle;
  }

  hasStroke() {
    return this.get('canStroke') && this._attrs.attrs.strokeStyle;
  }

  drawInner(/* context */) {

  }

  show() {
    this.set('visible', true);
    return this;
  }

  hide() {
    this.set('visible', false);
    return this;
  }

  _removeFromParent() {
    const parent = this.get('parent');
    if (parent) {
      const children = parent.get('children');
      Util.Array.remove(children, this);
    }

    return this;
  }

  /**
   * 移除
   * @param  {Boolean} destroy true 表示将自己移除的同时销毁自己，false 表示仅移除自己
   */
  remove(destroy) {
    if (destroy) {
      this.destroy();
    } else {
      this._removeFromParent();
    }
  }

  destroy() { // 销毁并将自己从父元素中移除（如果有父元素的话）
    const destroyed = this.get('destroyed');

    if (destroyed) {
      return null;
    }

    this._removeFromParent();

    this._attrs = {};
    this.set('destroyed', true);
  }

  getBBox() {
    return {
      minX: 0,
      maxX: 0,
      minY: 0,
      maxY: 0
    };
  }

  initTransform() {
    const attrs = this._attrs.attrs || {};
    if (!attrs.matrix) {
      attrs.matrix = [ 1, 0, 0, 1, 0, 0 ];
    }
    this._attrs.attrs = attrs;
  }

  getMatrix() {
    return this._attrs.attrs.matrix;
  }

  setMatrix(m) {
    this._attrs.attrs.matrix = [ m[0], m[1], m[2], m[3], m[4], m[5] ];
  }

  /**
   * 平移、旋转、缩放
   * @param  {Array} actions 操作集合
   * @return {Element}         返回自身
   */
  transform(actions) {
    const matrix = this._attrs.attrs.matrix;
    this._attrs.attrs.matrix = MatrixUtil.transform(matrix, actions);
    return this;
  }

  setTransform(actions) {
    this._attrs.attrs.matrix = [ 1, 0, 0, 1, 0, 0 ];
    return this.transform(actions);
  }

  translate(x, y) {
    const matrix = this._attrs.attrs.matrix;
    MatrixUtil.translate(matrix, matrix, [ x, y ]);
  }

  rotate(rad) {
    const matrix = this._attrs.attrs.matrix;
    MatrixUtil.rotate(matrix, matrix, rad);
  }

  scale(sx, sy) {
    const matrix = this._attrs.attrs.matrix;
    MatrixUtil.scale(matrix, matrix, [ sx, sy ]);
  }

  /**
   * 移动的到位置
   * @param  {Number} x 移动到x
   * @param  {Number} y 移动到y
   */
  moveTo(x, y) {
    const cx = this._attrs.x || 0; // 当前的x
    const cy = this._attrs.y || 0; // 当前的y
    this.translate(x - cx, y - cy);
    this.set('x', x);
    this.set('y', y);
  }

  apply(v) {
    const m = this._attrs.attrs.matrix;
    Vector2.transformMat2d(v, v, m);
    return this;
  }

  resetTransform(context) {
    const mo = this._attrs.attrs.matrix;
    // 不改变时
    if (!isUnchanged(mo)) {
      context.transform(mo[0], mo[1], mo[2], mo[3], mo[4], mo[5]);
    }
  }
}

module.exports = Element;
