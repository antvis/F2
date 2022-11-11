import { isDate, isString, last } from '@antv/util';
import fecha from 'fecha';
import * as fecha1 from 'fecha';

import bisector from './bisector';
const FORMAT_METHOD = 'format';

export function timeFormat(time, mask) { // 由于 fecha 包的 typescript 定义有问题，所以暂时兼容一下
  const method = fecha1[FORMAT_METHOD] || fecha[FORMAT_METHOD];
  return method(time, mask);
}
/**
 * 转换成时间戳
 * @param value 时间值
 */
export function toTimeStamp(value: any): number {
  if (isString(value)) {
    if (value.indexOf('T') > 0) {
      value = new Date(value).getTime();
    } else {
      // new Date('2010/01/10') 和 new Date('2010-01-10') 的差别在于:
      // 如果仅有年月日时，前者是带有时区的: Fri Jan 10 2020 02:40:13 GMT+0800 (中国标准时间)
      // 后者会格式化成 Sun Jan 10 2010 08:00:00 GMT+0800 (中国标准时间)
      value = new Date(value.replace(/-/gi, '/')).getTime();
    }
  }
  if (isDate(value)) {
    value = value.getTime();
  }
  return value;
}

const SECOND = 1000;
const MINUTE = 60 * SECOND;
const HOUR = 60 * MINUTE;
const DAY = 24 * HOUR;
const MONTH = DAY * 31;
const YEAR = DAY * 365;

export { SECOND, MINUTE, HOUR, DAY, MONTH, YEAR };
type Interval = [string, number]; // [defaultMomentFormat, interval]
const intervals: Interval[] = [
  ['HH:mm:ss', SECOND],
  ['HH:mm:ss', SECOND * 10],
  ['HH:mm:ss', SECOND * 30],
  ['HH:mm', MINUTE],
  ['HH:mm', MINUTE * 10],
  ['HH:mm', MINUTE * 30],
  ['HH', HOUR],
  ['HH', HOUR * 6],
  ['HH', HOUR * 12],
  ['YYYY-MM-DD', DAY],
  ['YYYY-MM-DD', DAY * 4],
  ['YYYY-WW', DAY * 7],
  ['YYYY-MM', MONTH],
  ['YYYY-MM', MONTH * 4],
  ['YYYY-MM', MONTH * 6],
  ['YYYY', DAY * 380], // 借鉴echarts，保证每个周期累加时不会碰到恰巧不够的问题
];

export function getTickInterval(min: number, max: number, tickCount: number): Interval {
  const target = (max - min) / tickCount;
  const idx = bisector((o: Interval) => o[1])(intervals, target) - 1;
  let interval: Interval = intervals[idx];
  if (idx < 0) {
    interval = intervals[0];
  } else if (idx >= intervals.length) {
    interval = last(intervals);
  }
  return interval;
}
