/**
 * @fileOverview Base class of chart and geometry
 * @author dxq613@gmail.com
 */

const Util = require('./util/common');

class Base {

  getDefaultCfg() {
    return {};
  }

  constructor(cfg) {
    const attrs = {};
    const defaultCfg = this.getDefaultCfg();
    this._attrs = attrs;
    Util.mix(attrs, defaultCfg, cfg);
  }

  get(name) {
    return this._attrs[name];
  }

  set(name, value) {
    this._attrs[name] = value;
  }

  destroy() {
    this._attrs = {};
    this.destroyed = true;
  }

}

module.exports = Base;
