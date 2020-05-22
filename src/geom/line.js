import Path from './path';
import Geom from './base';
import './shape/line';

class Line extends Path {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'line';
    cfg.sortable = true;
    return cfg;
  }
}

Geom.Line = Line;
export default Line;
