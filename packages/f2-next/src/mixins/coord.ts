import Coord, { Rect } from '../coord';
import { isFunction } from '@antv/util';

class CoordAvailable {
  createCoord(cfg, layout): Coord {
    if (isFunction(cfg)) {
      cfg = {
        type: cfg,
      };
    }
    const { left, top, width, height } = layout;
    const coordCfg = {
      // 默认直角坐标系
      type: Rect,
      ...cfg,
      left,
      top,
      width,
      height,
    }
    const { type, ...option } = coordCfg;
    const coord = new type(option);
    return coord;
  }

  updateCoord(cfg, layout) {
    return this.createCoord(cfg, layout);
  }
}

export default CoordAvailable;
