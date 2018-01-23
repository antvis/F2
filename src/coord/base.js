const Util = require('../util/common');

class Base {
  getDefaultCfg() {
    return {};
  }

  constructor(cfg) {
    const defaultCfg = this.getDefaultCfg();
    Util.mix(this, defaultCfg, cfg);

    let start;
    let end;
    if (this.plot) {
      start = this.plot.bl;
      end = this.plot.tr;
      this.start = start;
      this.end = end;
    } else {
      start = this.start;
      end = this.end;
    }
    this.init(start, end);
  }

  init() {}

  convertPoint(point) {
    return point;
  }

  invertPoint(point) {
    return point;
  }

  reset(plot) {
    this.plot = plot;
    const { bl, tr } = plot;
    this.start = bl;
    this.end = tr;
    this.init(bl, tr);
  }
}

module.exports = Base;
