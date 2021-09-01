import Layout from '../base/layout';
import { Range, Point, Option } from './types';

function transposedRect({ xMin, xMax, yMin, yMax }) {
  return { xMin: yMin, xMax: yMax, yMin: xMin, yMax: xMax };
}

class Base extends Layout {

  type: string;
  // 用来特殊标识是否是极坐标
  isPolar: boolean;
  // x y 调换
  transposed = false;

  // 中心点的坐标
  center: Point;

  // x，y 的值域，在极坐标中对应的就是弧度和半径
  x: Range = [0, 1];
  y: Range = [0, 1];

  constructor(option: Option) {
    super(option);
    this.update(option);
  }

  update(option: Option) {
    super.update(option);

    const { left, top, width, height } = this;
    this.center = {
      x: left + (width / 2),
      y: top + (height / 2),
    };
  }

  // 是循环， 比如极坐标是以 2π 循环的
  isCyclic() {
    return false;
  }

  // 把归一后的值映射到对应的定义域
  convertPoint(point) {
    return point;
  }

  convertRect(rect) {
    const { x: xRange, y: yRange, transposed } = this;
    const [xStart, xEnd] = xRange;
    const [yStart, yEnd] = yRange;

    const { xMin, xMax, yMin, yMax } = transposed ? transposedRect(rect) : rect;

    return {
      xMin: xStart + (xEnd - xStart) * xMin,
      xMax: xStart + (xEnd - xStart) * xMax,
      yMin: yStart + (yEnd - yStart) * yMin,
      yMax: yStart + (yEnd - yStart) * yMax,
    }
  }

  // 把canvas坐标的点位映射回归一后的值
  invertPoint(point) {
    return point;
  }
}

export default Base;
