import { each, isArray, isNil } from '../util/common';
import Geom from './base';
import './shape/point';

class Point extends Geom {
  getDefaultCfg() {
    const cfg = super.getDefaultCfg();
    cfg.type = 'point';
    cfg.shapeType = 'point';
    cfg.generatePoints = false;
    return cfg;
  }

  draw(data, shapeFactory) {
    const self = this;
    const container = self.get('container');
    each(data, obj => {
      const shape = obj.shape;
      const cfg = self.getDrawCfg(obj);
      if (isArray(obj.y)) {
        const hasStack = self.hasAdjust('stack');
        each(obj.y, (y, idx) => {
          cfg.y = y;
          if (!hasStack || idx !== 0) {
            self.drawShape(shape, obj, cfg, container, shapeFactory);
          }
        });
      } else if (!isNil(obj.y)) {
        self.drawShape(shape, obj, cfg, container, shapeFactory);
      }
    });
  }
}

Geom.Point = Point;

export default Point;
