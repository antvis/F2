import { Range, Point, Option } from './types';

class Base {

  type: string;
  // x y 调换
  transposed: boolean = false;

  left: number;
  top: number;
  width: number;
  height: number;
  right: number;
  bottom: number;

  // 中心点的坐标
  center: Point;

  // x，y 的值域，在极坐标中对应的就是弧度和半径
  x: Range;
  y: Range;

  constructor(option: Option) {
    this.init(option);
  }

  init(option: Option) {
    const { left, top, right, bottom, transposed = false } = option;
    const width = right - left;
    const height = bottom - top;

    this.center = {
      x: left + (width / 2),
      y: top + (height / 2),
    };
    this.left = left;
    this.top = top;
    this.right = right;
    this.bottom = bottom;
    this.width = width;
    this.height = height;
    this.transposed = transposed;
  }

  update(layout) {
    Object.keys(layout).forEach(key => {
      const value = layout[key] || 0;
      this[key] = value;
    });
    const { left, top, right, bottom } = this;
    const width = right - left;
    const height = bottom - top;
    this.center = {
      x: left + (width / 2),
      y: top + (height / 2),
    };
    this.width = width;
    this.height = height;
  }

  reset(option: Option) {
    this.init(option);
  }

  // 是循环， 比如极坐标是以 2π 循环的
  isCyclic() {
    return false;
  }

  convertPoint(point) {
    return point;
  }
}

export default Base;
