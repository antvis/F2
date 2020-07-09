import { PartialDeep } from 'type-fest';
import { Point } from './Point';
import { Plot } from './Plot';

/**
 * 常用工具库。
 *
 * @see https://f2.antv.vision/zh/docs/api/util
 */
export const Util: {
  /**
   * 将字符串的第一个字母转换成大写。
   */
  upperFirst(value: string): string;

  /**
   * 将字符串的第一个字母转换成小写。
   */
  lowerFirst(value: string): string;

  /**
   * 判断是否是字符串。
   */
  isString(value: any): value is string;

  /**
   * 判断是否是数字。
   */
  isNumber(value: any): value is number;

  /**
   * 判断是否是布尔类型。
   */
  isBoolean(value: any): value is boolean;

  /**
   * 判断是否为函数。
   */
  isFunction(value: any): value is (...args: any[]) => any;

  /**
   * 判断是否为数组。
   */
  isArray(value: any): value is any[];

  /**
   * 判断是否为日期类型。
   */
  isDate(value: any): value is Date;

  /**
   * 判断值是否为空（undefined 或者 null）。
   */
  isNil(value: any): value is undefined | null;

  /**
   * 判断是否为对象类型。
   */
  isObject(value: any): value is object;
  /**
   * 判断2个对象是否相等
   */
  isEqual(value: any, other: any): boolean;

  /**
   * 深拷贝。
   */
  deepMix<T extends Record<any, any>>(
    target: PartialDeep<T>,
    ...sources: Array<PartialDeep<T>>
  ): T;

  /**
   * 浅拷贝。
   */
  mix<T extends Record<any, any>>(
    target: PartialDeep<T>,
    ...sources: Array<PartialDeep<T>>
  ): T;

  /**
   * 查找元素在数组中的索引。
   */
  indexOf<T>(arr: T[], element: T): number;

  /**
   * 遍历数组。
   */
  each<T>(arr: T[], func: (value: T, index: number) => void | false): void;

  /**
   * 遍历对象。
   */
  each<T extends Record<any, any>>(
    obj: T,
    func: <K extends keyof T>(value: T[K], key: K) => void | false,
  ): void;

  /**
   * 数组查找
   * @param arr
   */
  find<T>(arr: T[], fn: (value: T, index: number) => boolean): T;

  /**
   * 获取当前设备的像素比。
   */
  getPixelRatio(): number;

  /**
   * 将当前鼠标的坐标转换为画布的相对坐标。
   *
   * @todo 明确参数 canvas 和返回结果的类型
   */
  getRelativePosition(point: Point, canvas: any): any;
  /**
   * 计算padding
   * @param padding 
   */
  parsePadding(padding: number | number[]): number[];
};

export const Helper: {
  getClip: (coord: any) => any;
  /**
   * 判断点是否在plot之内
   */
  isPointInPlot: (point: Point, plot: Plot) => boolean;
}
