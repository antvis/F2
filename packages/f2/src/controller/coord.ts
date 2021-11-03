import Coord, { Rect, Polar } from '../coord';
import { isString, isFunction } from '@antv/util';

const coordMap = {
  rect: Rect,
  polar: Polar,
};

class coordController {
  private coord: Coord;

  private getOption(cfg) {
    if (isString(cfg)) {
      return {
        type: coordMap[cfg] || Rect,
      };
    }
    if (isFunction(cfg)) {
      return {
        type: cfg,
      };
    }
    return {
      // 默认直角坐标系
      type: Rect,
      ...cfg,
    };
  }

  create(cfg, layout) {
    const option = this.getOption(cfg);
    const { type } = option;
    const coord = new type({
      ...option,
      ...layout,
    });
    this.coord = coord;
    return coord;
  }

  updateLayout(layout) {
    this.coord.update(layout);
  }

  update() {}
}

export default coordController;
