const Path = require('./path');
const Geom = require('./base');

require('./shape/line');

class Line extends Path {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'line';
    cfg.sortable = true;
    return cfg;
  }
}

Geom.Line = Line;
module.exports = Line;
