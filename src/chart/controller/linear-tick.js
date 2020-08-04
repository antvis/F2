
import { fixedBase } from '@antv/util';
import { isNil } from '../../util/common';
import AutoUtil from './scale-util';
const { snapFactorTo, snapMultiple } = AutoUtil;

// 默认经验刻度
const SNAP_COUNT_ARRAY = [ 1, 1.2, 1.5, 1.6, 2, 2.2, 2.4, 2.5, 3, 4, 5, 6, 7.5, 8, 10 ];
const DEFAULT_TICK_COUNT = 5;
const EPS = 1e-12;

// linear连续数值轴刻度nice算法
export default info => {

  let { min, max, interval, tickCount = DEFAULT_TICK_COUNT } = info;
  // 用户传入的经验刻度
  const snapArray = info.snapArray || SNAP_COUNT_ARRAY;

  if (Math.abs(max - min) < EPS) {
    if (min === 0) {
      max = 1;
    } else {
      if (min > 0) {
        min = 0;
      } else {
        max = 0;
      }
    }
    if (max - min < 5 && !interval && max - min >= 1) {
      interval = 1;
    }
  }

  if (isNil(interval)) {
    // 计算间距
    const temp = (max - min) / (tickCount - 1);
    interval = snapFactorTo(temp, snapArray, 'ceil');
  }

  // 如果有自定义间隔
  if (info.interval) {
    // 校正 max 和 min
    max = snapMultiple(max, interval, 'ceil'); // 向上逼近
    min = snapMultiple(min, interval, 'floor'); // 向下逼近

    tickCount = Math.round((max - min) / interval);
    min = fixedBase(min, interval); // 当min为负数的时候，fixedBase后，min可能会大于minLimit，导致最终产出的tick是大于minLimit的，所以必须进行修正
    max = fixedBase(max, interval);
  } else {
    const avg = (max + min) / 2;
    const avgTick = snapMultiple(avg, interval, 'ceil');
    const sideCount = Math.floor((tickCount - 2) / 2);
    let maxTick = fixedBase(avgTick + sideCount * interval, interval);
    let minTick;
    if (tickCount % 2 === 0) {
      minTick = fixedBase(avgTick - sideCount * interval, interval);
    } else {
      minTick = fixedBase(avgTick - (sideCount + 1) * interval, interval);
    }

    let prevMaxTick = null;
    // 顶部tick矫正
    // 如果减去intervl, fixBase后，新的minTick没有大于之前的值，就退出，防止死循环
    while (maxTick < max && (prevMaxTick === null || maxTick > prevMaxTick)) { // 保证计算出来的刻度最大值 maxTick 不小于数据最大值 max
      prevMaxTick = maxTick;
      maxTick = fixedBase(maxTick + interval, interval);
    }

    let prevMinTick = null;
    // 底部tick矫正
    // 如果减去intervl, fixBase后，新的minTick没有小于之前的值，就退出，防止死循环
    while (minTick > min && (prevMinTick === null || minTick < prevMinTick)) { // 保证计算出来的刻度最小值 minTick 不大于数据最小值 min
      prevMinTick = minTick;
      minTick = fixedBase(minTick - interval, interval); // 防止超常浮点数计算问题
    }
    max = maxTick;
    min = minTick;
  }

  const ticks = [];

  ticks.push(min);
  for (let i = 1; i < tickCount; i++) {
    const tickValue = fixedBase(interval * i + min, interval);
    if (tickValue < max) {
      ticks.push(tickValue);
    }
  }
  if (ticks[ticks.length - 1] < max) {
    ticks.push(max);
  }

  return ticks;
};
