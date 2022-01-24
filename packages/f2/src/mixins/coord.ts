import Coord, { Rect, Polar } from '../coord';
import { isString, isFunction } from '@antv/util';

const coordMap = {
  rect: Rect,
  polar: Polar,
};

class CoordMixin {
  createCoord(cfg, layout): Coord {
    if (isString(cfg)) {
      cfg = {
        type: coordMap[cfg] || Rect,
      };
    } else if (isFunction(cfg)) {
      cfg = {
        type: cfg,
      };
    }
    const coordCfg = {
      // 默认直角坐标系
      type: Rect,
      ...layout,
      ...cfg,
    };
    const { type, ...option } = coordCfg;
    const coord = new type(option);
    return coord;
  }

  updateCoord(cfg, layout) {
    return this.createCoord(cfg, layout);
  }
}

export default CoordMixin;
