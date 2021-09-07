import Coord, { Rect } from '../coord';
import { isFunction } from '@antv/util';

class CoordAvailable {
  createCoord(cfg, layout): Coord {
    if (isFunction(cfg)) {
      cfg = {
        type: cfg,
      };
    }
    // coord config 里面的 left top right bottom 都是相对值
    const { left = 0, top = 0, right = 0, bottom = 0, ...other } = cfg || {};
    const { left: layoutLeft, top: layoutTop, width, height } = layout;
    const coordCfg = {
      // 默认直角坐标系
      type: Rect,
      ...cfg,
      left: layoutLeft + left,
      top: layoutTop + top,
      width: width - left - right,
      height: height - top - bottom,
    }
    const { type, ...option } = coordCfg;
    const coord = new type(option);
    return coord;
  }
}

export default CoordAvailable;
