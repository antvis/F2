const Geom = require('./base');
const ShapeUtil = require('./shape/util');
const Util = require('../util/common');
require('./shape/line');

class Path extends Geom {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'path';
    cfg.shapeType = 'line';
    return cfg;
  }

  getDrawCfg(obj) {
    const cfg = super.getDrawCfg(obj);
    cfg.isStack = this.hasAdjust('stack');
    return cfg;
  }

  draw(data, shapeFactory) {
    const self = this;
    const container = self.get('container');
    const yScale = self.getYScale();
    const splitArray = ShapeUtil.splitArray(data, yScale.field);

    const cfg = this.getDrawCfg(data[0]);
    cfg.origin = data; // path,line 等图的origin 是整个序列

    Util.each(splitArray, function(subData, splitedIndex) {
      cfg.splitedIndex = splitedIndex; // 传入分割片段索引 用于生成id
      cfg.points = subData;
      const gShape = shapeFactory.drawShape(cfg.shape, cfg, container);
      if (gShape) {
        Util.each([].concat(gShape), s => {
          s.set('origin', data[0]); // todo
        });
      }
    });
  }
}

Geom.Path = Path;
module.exports = Path;
