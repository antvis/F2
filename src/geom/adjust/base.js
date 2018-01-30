/**
 * @fileOverview 数据调整的基类
 * @author dxq613@gmail.com
 */

const Util = require('../../util');

class Base {

  getDefaultCfg() {
    return {};
  }

  constructor(cfg) {
    const defaultCfg = this.getDefaultCfg();
    Util.mix(this, defaultCfg, cfg);
  }

  processAdjust(/* dataArray */) {

  }
}

module.exports = Base;
