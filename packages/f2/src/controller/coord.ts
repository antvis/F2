import Coord, { Rect, Polar } from '../coord';
import { isString, isFunction } from '@antv/util';

export interface Style {
  left?: number;
  top?: number;
  width?: number;
  height?: number;
  padding?: number[];
}

export interface Layout {
  left: number;
  top: number;
  width: number;
  height: number;
}

const coordMap = {
  rect: Rect,
  polar: Polar,
};

class coordController {
  public layout: Layout;
  public coord: Coord;

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
    const { type } = cfg || {};
    return {
      ...cfg,
      // 默认直角坐标系
      type: isFunction(type) ? type : coordMap[type] || Rect,
    };
  }

  create(cfg) {
    const { layout } = this;
    const option = this.getOption(cfg);
    const { type } = option;
    const coord = new type({
      ...option,
      ...layout,
    });
    this.coord = coord;
    return coord;
  }

  updateLayout(style: Style) {
    const { coord } = this;
    const { left, top, width, height, padding } = style;
    const [paddingTop, paddingRight, paddingBottom, paddingLeft] = padding || [0, 0, 0, 0];

    this.layout = {
      left: left + paddingLeft,
      top: top + paddingTop,
      width: width - paddingLeft - paddingRight,
      height: height - paddingTop - paddingBottom,
    };

    if (coord) {
      coord.update(this.layout);
    }
  }

  useLayout(positionLayout) {
    const { coord } = this;
    const { position, width: boxWidth, height: boxHeight } = positionLayout;
    let { left, top, width, height } = coord;
    switch (position) {
      case 'left':
        left += boxWidth;
        width = Math.max(0, width - boxWidth);
        break;
      case 'right':
        width = Math.max(0, width - boxWidth);
        break;
      case 'top':
        top += boxHeight;
        height = Math.max(0, height - boxHeight);
        break;
      case 'bottom':
        height = Math.max(0, height - boxHeight);
        break;
    }
    coord.update({ left, top, width, height });
  }

  update() {}

  getCoord() {
    return this.coord;
  }
}

export { Coord };
export default coordController;
