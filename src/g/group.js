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
