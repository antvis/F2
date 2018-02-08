/**
 * @fileOverview 数据调整的基类
 * @author dxq613@gmail.com
 */

const Util = require('../../util/common');

class Base {

  _initDefaultCfg() {}

  constructor(cfg) {
    this._initDefaultCfg();
    Util.mix(this, cfg);
  }

  processAdjust(/* dataArray */) {

  }
}

module.exports = Base;
