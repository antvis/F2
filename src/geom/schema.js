import Geom from './base';
import { mix } from '../util/common';
import SizeMixin from './mixin/size';
import './shape/schema';

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
    mix(this, SizeMixin);
  }

  init() {
    super.init();
    // 绑定事件
    this.initEvent();
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
export default Schema;
