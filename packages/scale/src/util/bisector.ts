import { isNil } from '@antv/util';

type GetterFunc<T> = (o: T) => number;

/**
 * 二分右侧查找
 * https://github.com/d3/d3-array/blob/master/src/bisector.js
 */
export default function<T>(getter: GetterFunc<T>) {
  /**
   * x: 目标值
   * lo: 起始位置
   * hi: 结束位置
   */
  return function(a: T[], x: number, _lo?: number, _hi?: number) {
    let lo = isNil(_lo) ? 0 : _lo;
    let hi = isNil(_hi) ? a.length : _hi;
    while (lo < hi) {
      const mid = (lo + hi) >>> 1;
      if (getter(a[mid]) > x) {
        hi = mid;
      } else {
        lo = mid + 1;
      }
    }
    return lo;
  };
}
