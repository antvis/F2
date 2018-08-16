const Geom = require('./base');
const ShapeUtil = require('./shape/util');
const Util = require('../util/common');
require('./shape/line');

class Path extends Geom {
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
    const connectNulls = self.get('connectNulls');
    const splitArray = ShapeUtil.splitArray(data, yScale.field, connectNulls);

    const cfg = this.getDrawCfg(data[0]);
    cfg.origin = data;

    Util.each(splitArray, function(subData, splitedIndex) {
      cfg.splitedIndex = splitedIndex;
      cfg.points = subData;
      self.drawShape(cfg.shape, data[0], cfg, container, shapeFactory);
    });
  }
}

Geom.Path = Path;
module.exports = Path;
