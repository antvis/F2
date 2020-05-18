import Geom from './base';
import { splitArray } from './shape/util';
import { each } from '../util/common';
import './shape/line';

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
    const splitArrayObj = splitArray(data, yScale.field, connectNulls);

    const cfg = this.getDrawCfg(data[0]);
    cfg.origin = data;

    each(splitArrayObj, function(subData, splitedIndex) {
      cfg.splitedIndex = splitedIndex;
      cfg.points = subData;
      self.drawShape(cfg.shape, data[0], cfg, container, shapeFactory);
    });
  }
}

Geom.Path = Path;
export default Path;
