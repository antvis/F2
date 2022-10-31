import { ScaleConfig } from '../types';
import { DAY, getTickInterval, HOUR, MINUTE, MONTH, SECOND, YEAR } from '../util/time';

function getYear(date: number) {
  return new Date(date).getFullYear();
}

function createYear(year: number) {
  return new Date(year, 0, 1).getTime();
}

function getMonth(date: number) {
  return new Date(date).getMonth();
}

function diffMonth(min: number, max: number) {
  const minYear = getYear(min);
  const maxYear = getYear(max);
  const minMonth = getMonth(min);
  const maxMonth = getMonth(max);
  return (maxYear - minYear) * 12 + ((maxMonth - minMonth) % 12);
}

function creatMonth(year: number, month: number) {
  return new Date(year, month, 1).getTime();
}

function diffDay(min: number, max: number) {
  return Math.ceil((max - min) / DAY);
}

function diffHour(min: number, max: number) {
  return Math.ceil((max - min) / HOUR);
}

function diffMinus(min: number, max: number) {
  return Math.ceil((max - min) / (60 * 1000));
}

/**
 * 计算 time 的 ticks，对 month, year 进行 pretty 处理
 * @param cfg 度量的配置项
 * @returns 计算后的 ticks
 */
export default function timePretty(cfg: ScaleConfig): number[] {
  const { min, max, minTickInterval, tickCount } = cfg;
  let { tickInterval } = cfg;
  const ticks: number[] = [];
  // 指定 tickInterval 后 tickCount 不生效，需要重新计算
  if (!tickInterval) {
    tickInterval = (max - min) / tickCount;
    // 如果设置了最小间距，则使用最小间距
    if (minTickInterval && tickInterval < minTickInterval) {
      tickInterval = minTickInterval;
    }
  }
  tickInterval = Math.max(Math.floor((max - min) / (2 ** 12 - 1)), tickInterval);
  const minYear = getYear(min);
  // 如果间距大于 1 年，则将开始日期从整年开始
  if (tickInterval > YEAR) {
    const maxYear = getYear(max);
    const yearInterval = Math.ceil(tickInterval / YEAR);
    for (let i = minYear; i <= maxYear + yearInterval; i = i + yearInterval) {
      ticks.push(createYear(i));
    }
  } else if (tickInterval > MONTH) {
    // 大于月时
    const monthInterval = Math.ceil(tickInterval / MONTH);
    const mmMoth = getMonth(min);
    const dMonths = diffMonth(min, max);
    for (let i = 0; i <= dMonths + monthInterval; i = i + monthInterval) {
      ticks.push(creatMonth(minYear, i + mmMoth));
    }
  } else if (tickInterval > DAY) {
    // 大于天
    const date = new Date(min);
    const year = date.getFullYear();
    const month = date.getMonth();
    const mday = date.getDate();
    const day = Math.ceil(tickInterval / DAY);
    const ddays = diffDay(min, max);
    for (let i = 0; i < ddays + day; i = i + day) {
      ticks.push(new Date(year, month, mday + i).getTime());
    }
  } else if (tickInterval > HOUR) {
    // 大于小时
    const date = new Date(min);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();
    const hour = date.getHours();
    const hours = Math.ceil(tickInterval / HOUR);
    const dHours = diffHour(min, max);
    for (let i = 0; i <= dHours + hours; i = i + hours) {
      ticks.push(new Date(year, month, day, hour + i).getTime());
    }
  } else if (tickInterval > MINUTE) {
    // 大于分钟
    const dMinus = diffMinus(min, max);
    const minutes = Math.ceil(tickInterval / MINUTE);
    for (let i = 0; i <= dMinus + minutes; i = i + minutes) {
      ticks.push(min + i * MINUTE);
    }
  } else {
    // 小于分钟
    let interval = tickInterval;
    if (interval < SECOND) {
      interval = SECOND;
    }
    const minSecond = Math.floor(min / SECOND) * SECOND;
    const dSeconds = Math.ceil((max - min) / SECOND);
    const seconds = Math.ceil(interval / SECOND);
    for (let i = 0; i < dSeconds + seconds; i = i + seconds) {
      ticks.push(minSecond + i * SECOND);
    }
  }

  // 最好是能从算法能解决这个问题，但是如果指定了 tickInterval，计算 ticks，也只能这么算，所以
  // 打印警告提示
  if (ticks.length >= 512) {
    console.warn(`Notice: current ticks length(${ticks.length}) >= 512, may cause performance issues, even out of memory. Because of the configure "tickInterval"(in milliseconds, current is ${tickInterval}) is too small, increase the value to solve the problem!`);
  }

  return ticks;
}
