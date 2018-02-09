const Path = require('./path');
const Geom = require('./base');

require('./shape/line');

class Line extends Path {
  /**
   * 获取默认的配置属性
   * @protected
   * @return {Object} 默认属性
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'line';
    cfg.sortable = true;
    return cfg;
  }
}

Geom.Line = Line;
module.exports = Line;
