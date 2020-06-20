import { PartialDeep } from 'type-fest';

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
   * 深拷贝，最多支持 3 个对象。
   */
  deepMix<T extends Record<any, any>>(
    target: T,
    source1: PartialDeep<T>,
    source2?: PartialDeep<T>,
    source3?: PartialDeep<T>,
  ): T;

  /**
   * 浅拷贝，最多支持 3 个对象。
   */
  mix<T extends Record<any, any>>(
    target: T,
    source1: Partial<T>,
    source2?: Partial<T>,
    source3?: Partial<T>,
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
   * 获取当前设备的像素比。
   */
  getPixelRatio(): number;

  /**
   * 将当前鼠标的坐标转换为画布的相对坐标。
   *
   * @todo 明确参数 canvas 和返回结果的类型
   */
  getRelativePosition(point: Record<'x' | 'y', number>, canvas: any): any;
};
