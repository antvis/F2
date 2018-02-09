const Geom = require('./base');
const Util = require('../util/common');
const SizeMixin = require('./mixin/size');
require('./shape/schema');

class Schema extends Geom {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'schema';
    cfg.shapeType = 'schema';
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

Geom.Schema = Schema;

module.exports = Schema;
