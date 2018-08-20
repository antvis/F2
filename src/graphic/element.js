const Util = require('../util/common');
const MatrixUtil = require('./util/matrix');
const Vector2 = require('./util/vector2');
const StyleUtil = require('./util/style-parse');

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
    if (attrs) {
      this.initAttrs(attrs);
    }

    this.initTransform();
  }

  get(name) {
    return this._attrs[name];
  }

  set(name, value) {
    this._attrs[name] = value;
  }

  isGroup() {
    return this.get('isGroup');
  }

  isShape() {
    return this.get('isShape');
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
      this._attrs.bbox = null;
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
    if (!this._attrs.isGroup) {
      for (const k in elAttrs) {
        if (SHAPE_ATTRS.indexOf(k) > -1) {
          let v = elAttrs[k];
          if (k === 'fillStyle' || k === 'strokeStyle') {
            v = StyleUtil.parseStyle(v, this, context);
          }
          if (k === 'lineDash' && context.setLineDash && Util.isArray(v)) {
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

  isVisible() {
    return this.get('visible');
  }

  _removeFromParent() {
    const parent = this.get('parent');
    if (parent) {
      const children = parent.get('children');
      Util.Array.remove(children, this);
    }

    return this;
  }

  remove(destroy) {
    if (destroy) {
      this.destroy();
    } else {
      this._removeFromParent();
    }
  }

  destroy() {
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
      maxY: 0,
      width: 0,
      height: 0
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

  moveTo(x, y) {
    const cx = this._attrs.x || 0;
    const cy = this._attrs.y || 0;
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
    if (!isUnchanged(mo)) {
      context.transform(mo[0], mo[1], mo[2], mo[3], mo[4], mo[5]);
    }
  }

  isDestroyed() {
    return this.get('destroyed');
  }
}

module.exports = Element;
