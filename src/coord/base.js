/**
 * @fileOverview basic class of coordination
 * @author dxq613@gmail.com
 */

const Util = require('../util');

class Base {

  getDefaultCfg() {
    return {};
  }

  constructor(cfg) {
    const defaultCfg = this.getDefaultCfg();
    Util.mix(this, defaultCfg, cfg);
    this.init();
  }

  get(name) {
    return this[name];
  }

  set(name, value) {
    this[name] = value;
    return this;
  }

  init() {

  }

  convertPoint(point) {
    return point;
  }

  invertPoint(point) {
    return point;
  }
}

module.exports = Base;
