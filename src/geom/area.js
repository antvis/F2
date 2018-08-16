/**
 * @fileOverview area geometry
 * @author dxq613 @gmail.com
 * @author sima.zhang1990@gmail.com
 */

const Geom = require('./base');
const ShapeUtil = require('./shape/util');
const Util = require('../util/common');
require('./shape/area');

class Area extends Geom {
  /**
   * get the default configuration
   * @protected
   * @return {Object} return the result
   */
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'area';
    cfg.shapeType = 'area';
    cfg.generatePoints = true;
    cfg.sortable = true;
    return cfg;
  }

  draw(data, shapeFactory) {
    const self = this;
    const container = self.get('container');
    const cfg = this.getDrawCfg(data[0]);
    const yScale = self.getYScale();
    const connectNulls = self.get('connectNulls');
    const splitArray = ShapeUtil.splitArray(data, yScale.field, connectNulls);
    cfg.origin = data;
    Util.each(splitArray, function(subData, splitedIndex) {
      cfg.splitedIndex = splitedIndex;
      const points = subData.map(obj => {
        return obj.points;
      });
      cfg.points = points;
      self.drawShape(cfg.shape, data[0], cfg, container, shapeFactory);
    });
  }
}

Geom.Area = Area;

module.exports = Area;
