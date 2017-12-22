const Util = require('../util/common');
const Base = require('../base');
const MatrixUtil = require('./util/matrix');

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

class Element extends Base {
  getDefaultCfg() {
    return {
      /**
       * 唯一标示
       * @type {Number}
       */
      className: null,
      /**
       * Z轴的层叠关系，Z值越大离用户越近
       * @type {Number}
       */
      zIndex: 0,
      /**
       * Canvas对象
       * @type: {Object}
       */
      canvas: null,
      /**
       * 父元素指针
       * @type {Object}
       */
      parent: null,
      /**
       * 画布的上下文
       * @type {Object}
       */
      context: null,
      /**
       * 是否显示
       * @type {Boolean}
       */
      visible: true,
      /**
       * 是否被销毁
       * @type: {Boolean}
       */
      destroyed: false,
      /**
       * 图形属性
       * @type {Object}
       */
      attrs: {}
    };
  }

  getDefaultAttrs() {
    return {};
  }

  _setAttr(name, value) {
    const attrs = this.get('attrs');
    const alias = ALIAS_ATTRS_MAP[name];
    if (alias) {
      attrs[alias] = value;
    }
    attrs[name] = value;
  }

  _getAttr(name) {
    return this.get('attrs')[name];
  }

  constructor(cfg) {
    super(cfg);
    const attrs = cfg && cfg.attrs || {};
    this.initAttrs(attrs);
    this.initTransform(); // 初始化变换
  }

  initAttrs(attrs) {
    this.attr(Util.deepMix({}, this.getDefaultAttrs(), attrs));
  }

  attr(name, value) {
    const self = this;
    if (arguments.length === 0) {
      return self.get('attrs');
    }

    if (Util.isObject(name)) {
      for (const k in name) {
        self._setAttr(k, name[k]); // TODO clip 的问题处理
      }
      return self;
    }
    if (arguments.length === 2) {
      self._setAttr(name, value);
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
    // const clip = this.attrs.clip;
    context.save();
    // if (clip) {
    //   clip.resetTransform(context);
    //   clip.createPath(context);
    //   context.clip();
    // }
    this.resetContext(context);
    this.resetTransform(context);
  }

  restoreContext(context) {
    context.restore();
  }

  resetContext(context) {
    const elAttrs = this.get('attrs');
    if (!this.get('isGroup')) {
      for (const k in elAttrs) {
        if (SHAPE_ATTRS.indexOf(k) > -1) { // 非canvas属性不附加
          const v = elAttrs[k];
          if (k === 'lineDash' && context.setLineDash) {
            context.setLineDash(v);
          } else {
            context[k] = v;
          }
        }
      }
    }
  }

  hasFill() {
    return this.get('canFill') && this.get('attrs').fillStyle;
  }

  hasStroke() {
    return this.get('canStroke') && this.get('attrs').strokeStyle;
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

  remove(destroy) {
    if (Util.isNil(destroy)) {
      destroy = true;
    }
    const parent = this.get('parent');
    if (parent) {
      const children = parent.get('children');
      Util.Array.remove(children, this);
    }
    destroy && this.destroy();
    return this;
  }

  destroy() {
    const destroyed = this.get('destroyed');

    if (destroyed) {
      return;
    }
    this._attrs = {};
    this.set('destroyed', true);
  }

  // TODO: 矩阵变换
  initTransform() {
    this._attrs.matrix = [ 1, 0, 0, 1, 0, 0 ];
  }

  getMatrix() {
    return this._attrs.matrix;
  }

  setMatrix(m) {
    this._attrs.matrix = [ m[0], m[1], m[2], m[3], m[4], m[5] ];
    this.clearTotalMatrix();
  }

  cloneMatrix(m) {
    return [ m[0], m[1], m[2], m[3], m[4], m[5] ];
  }

  transform(actions) {
    const self = this;
    for (let i = 0; i < actions.length; i++) {
      const action = actions[i];
      switch (action[0]) {
        case 't':
          self.translate(action[1], action[2]);
          break;
        case 's':
          self.scale(action[1], action[2]);
          break;
        case 'r':
          self.rotate(action[1]);
          break;
        default:
          break;
      }
    }

    return self;
  }

  setTransform(actions) {
    this._attrs.matrix = [ 1, 0, 0, 1, 0, 0 ];
    return this.transform(actions);
  }

  translate(x, y) {
    const matrix = this._attrs.matrix;
    matrix[4] += matrix[0] * x + matrix[2] * y;
    matrix[5] += matrix[1] * x + matrix[3] * y;
    this.clearTotalMatrix();
  }

  rotate(rad) {
    const matrix = this._attrs.matrix;
    const c = Math.cos(rad);
    const s = Math.sin(rad);
    const m11 = matrix[0] * c + matrix[2] * s;
    const m12 = matrix[1] * c + matrix[3] * s;
    const m21 = matrix[0] * -s + matrix[2] * c;
    const m22 = matrix[1] * -s + matrix[3] * c;
    matrix[0] = m11;
    matrix[1] = m12;
    matrix[2] = m21;
    matrix[3] = m22;
    this.clearTotalMatrix();
  }

  scale(sx, sy) {
    const matrix = this._attrs.matrix;
    matrix[0] *= sx;
    matrix[1] *= sx;
    matrix[2] *= sy;
    matrix[3] *= sy;

    this.clearTotalMatrix();
  }

  /**
   * 应用到当前元素上的总的矩阵
   * @return {Matrix} 矩阵
   */
  getTotalMatrix() {
    let m = this._attrs.totalMatrix;
    if (!m) {
      m = [ 1, 0, 0, 1, 0, 0 ];
      const parent = this._attrs.parent;
      if (parent) {
        const pm = parent.getTotalMatrix();
        m = MatrixUtil.multiple(m, pm);
      }

      m = MatrixUtil.multiple(m, this._attrs.matrix);
      this._attrs.totalMatrix = m;
    }
    return m;
  }

  // 清除当前的矩阵
  clearTotalMatrix() {
    // this.__cfg.totalMatrix = null;
  }

  // TODO
  invert(px, py) {
    const m = this.getTotalMatrix();
    const x = px;
    const y = py;
    px = x * m[0] + y * m[2] + m[4];
    py = x * m[1] + y * m[3] + m[5];
    return [ px, py ];
  }

  resetTransform(context) {
    const mo = this._attrs.matrix;
    // 不改变时
    if (!isUnchanged(mo)) {
      context.transform(mo[0], mo[1], mo[2], mo[3], mo[4], mo[5]);
    }
  }
}

module.exports = Element;
