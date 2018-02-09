const Geom = require('./base');
const Util = require('../util/common');
const SizeMixin = require('./mixin/size');
require('./shape/interval');

class Interval extends Geom {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'interval';
    cfg.shapeType = 'interval';
    cfg.generatePoints = true;
    return cfg;
  }

  constructor(cfg) {
    super(cfg);
    Util.mix(this, SizeMixin);
  }

  createShapePointsCfg(obj) {
    const cfg = super.createShapePointsCfg(obj);
    cfg.size = this.getNormalizedSize(obj);
    return cfg;
  }

  clearInner() {
    super.clearInner();
    this.set('defaultSize', null);
  }
}

Geom.Interval = Interval;

module.exports = Interval;
