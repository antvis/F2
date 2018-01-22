const Util = require('../util/common');

class Base {
  getDefaultCfg() {
    return {};
  }

  constructor(cfg) {
    const defaultCfg = this.getDefaultCfg();
    Util.mix(this, defaultCfg, cfg);
    this.init();
  }

  init() {}

  convertPoint(point) {
    return point;
  }

  invertPoint(point) {
    return point;
  }

  reset(start, end) {
    this.start = start;
    this.end = end;
    this.init();
  }
}

module.exports = Base;
