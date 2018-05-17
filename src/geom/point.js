const Util = require('../util/common');
const Geom = require('./base');
require('./shape/point');

class Point extends Geom {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'point';
    cfg.shapeType = 'point';
    cfg.generatePoints = true;
    return cfg;
  }

  draw(data, shapeFactory) {
    const self = this;
    const container = self.get('container');
    Util.each(data, obj => {
      const shape = obj.shape;
      const cfg = self.getDrawCfg(obj);
      if (Util.isArray(obj.y)) {
        const hasStack = self.hasAdjust('stack'); // 判断是否存在 stack 层叠
        Util.each(obj.y, (y, idx) => {
          cfg.y = y;
          if (!hasStack || idx !== 0) {
            self.drawShape(shape, obj, cfg, container, shapeFactory);
          }
        });
      } else if (!Util.isNil(obj.y)) {
        self.drawShape(shape, obj, cfg, container, shapeFactory);
      }
    });
  }
}

Geom.Point = Point;

module.exports = Point;
