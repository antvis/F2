import Layout from '../base/layout';
import { Range, Point, Option } from './types';
import { isArray } from '@antv/util';

function transposedRect({ xMin, xMax, yMin, yMax }) {
  return { xMin: yMin, xMax: yMax, yMin: xMin, yMax: xMax };
}

function convertRect({ x, y, size, y0 }: RectPoint) {
  let xMin: number;
  let xMax: number;
  if (isArray(x)) {
    xMin = x[0];
    xMax = x[1];
  } else {
    xMin = x - size / 2;
    xMax = x + size / 2;
  }

  let yMin: number;
  let yMax: number;
  if (isArray(y)) {
    yMin = y[0];
    yMax = y[1];
  } else {
    yMin = Math.min(y0, y);
    yMax = Math.max(y0, y);
  }

  return {
    xMin,
    xMax,
    yMin,
    yMax,
  };
}

// 绘制矩形的关键点
interface RectPoint {
  x: number | [number, number];
  y: number | [number, number];
  y0?: number;
  size?: number;
}

interface Rect {
  xMin: number;
  xMax: number;
  yMin: number;
  yMax: number;
}

/**
 * 直角坐标系
 * convert相关的方法，涉及将标准坐标系映射到实际坐标系内
 * transform相关的方法，是仅将某一种关键点转换成另一种关键点 (比如将x/y/size/y0转换成yMin/yMax/..)
 */
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
      x: left + width / 2,
      y: top + height / 2,
    };
    return this;
  }

  // 是循环， 比如极坐标是以 2π 循环的
  isCyclic() {
    return false;
  }

  _zoomVal(val, func) {
    return isArray(val) ? val.map((v) => func(v)) : func(val);
  }

  /**
   * 把归一后的值映射到对应的定义域
   * @param point
   */
  convert(point) {
    const { transposed, x, y } = this;
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';

    const pointX = point[xDim];
    const pointY = point[yDim];
    // 超出边界不绘制
    if (pointX < 0 || pointX > 1 || pointY < 0 || pointY > 1) {
      return {
        x: NaN,
        y: NaN,
      };
    }
    return {
      x: this._zoomVal(point[xDim], (v) => x[0] + (x[1] - x[0]) * v),
      y: this._zoomVal(point[yDim], (v) => y[0] + (y[1] - y[0]) * v),
    };
  }

  /**
   * convert 的反处理，把定义域的值，反处理到归一的值
   */
  invert(point) {
    const { transposed, x, y } = this;
    const xDim = transposed ? 'y' : 'x';
    const yDim = transposed ? 'x' : 'y';
    return {
      [xDim]: this._zoomVal(point.x, (v) => (v - x[0]) / (x[1] - x[0])),
      [yDim]: this._zoomVal(point.y, (v) => (v - y[0]) / (y[1] - y[0])),
    };
  }

  /**
   * 把归一化的值映射到 canvas 的坐标点
   * @param point
   * @returns
   */
  convertPoint(point) {
    return this.convert(point);
  }

  /**
   * 把canvas坐标的点位映射回归一的值
   */
  invertPoint(point) {
    return this.invert(point);
  }

  // 将标准坐标系下的矩形绘制关键点映射成实际绘制的坐标点
  convertRect(rectPoint: RectPoint): Rect {
    const { x: xRange, y: yRange, transposed } = this;
    const [xStart, xEnd] = xRange;
    const [yStart, yEnd] = yRange;

    const rect = convertRect(rectPoint);
    const { xMin, xMax, yMin, yMax } = transposed ? transposedRect(rect) : rect;

    const x0 = xStart + (xEnd - xStart) * xMin;
    const x1 = xStart + (xEnd - xStart) * xMax;
    const y0 = yStart + (yEnd - yStart) * yMin;
    const y1 = yStart + (yEnd - yStart) * yMax;

    return {
      xMin: Math.min(x0, x1),
      xMax: Math.max(x0, x1),
      yMin: Math.min(y0, y1),
      yMax: Math.max(y0, y1),
    };
  }

  // 将已经映射好的矩形绘制关键点转换成实际绘制的坐标点
  transformToRect(rectPoint: RectPoint): Rect {
    const { x, y, y0, size } = rectPoint;
    const coordOrigin = this.convertPoint({ x: 0, y: y0 });
    const { transposed } = this;
    const _rectPoint = {
      size,
      x: transposed ? y : x,
      y: transposed ? x : y,
      y0: transposed ? coordOrigin.x : coordOrigin.y,
    };
    const rect = convertRect(_rectPoint);
    const { xMin, xMax, yMin, yMax } = transposed ? transposedRect(rect) : rect;

    return { xMin, xMax, yMin, yMax };
  }
}

export default Base;
