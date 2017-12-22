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
}

Geom.Point = Point;

module.exports = Point;
