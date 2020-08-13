const DDEFAULT_COUNT = 5; // 默认刻度值

export default cfg => {
  const { min, max, tickCount, tickInterval } = cfg || {};

  let count = tickCount && tickCount >= 2 ? tickCount : DDEFAULT_COUNT;

  // 计算interval， 优先取tickInterval
  const interval = tickInterval || getBestInterval({ tickCount: count, max, min });
  // 通过interval计算最小tick
  const minTick = fixedBase(Math.floor(min / interval) * interval, interval);

  // 如果指定了tickInterval, count 需要根据指定的tickInterval来算计
  if (tickInterval) {
    const intervalCount = Math.abs(Math.ceil((max - minTick) / tickInterval)) + 1;
    // tickCount 作为最小 count 处理
    count = Math.max(count, intervalCount);
  }

  const ticks = [];
  let tickLength = 0;
  while (tickLength < count) {
    ticks.push(fixedBase(minTick + tickLength * interval, interval));
    tickLength++;
  }
  return ticks;
};

const DECIMAL_LENGTH = 12;
function getFactor(number) {
  // 取正数
  number = Math.abs(number);
  let factor = 1;

  if (number === 0) {
    return factor;
  }

  // 小于1,逐渐放大
  if (number < 1) {
    let count = 0;
    while (number < 1) {
      factor = factor / 10;
      number = number * 10;
      count++;
    }
    // 浮点数计算出现问题
    if (factor.toString().length > DECIMAL_LENGTH) {
      factor = parseFloat(factor.toFixed(count));
    }
    return factor;
  }

  // 大于10逐渐缩小
  while (number > 10) {
    factor = factor * 10;
    number = number / 10;
  }

  return factor;
}

// 获取最佳匹配刻度
function getBestInterval({ tickCount, min, max }) {
  const SNAP_COUNT_ARRAY = [ 1, 1.2, 1.5, 1.6, 2, 2.2, 2.4, 2.5, 3, 4, 5, 6, 7.5, 8, 10 ];
  // 如果最大最小相等，则直接按1处理
  if (min === max) {
    return 1 * getFactor(max);
  }
  // 1.计算平均刻度间隔
  const avgInterval = (max - min) / (tickCount - 1);
  // 2.数据标准归一化 映射到[1-10]区间
  const factor = getFactor(avgInterval);
  const calInterval = avgInterval / factor;
  const calMax = max / factor;
  const calMin = min / factor;
  // 根据平均值推算最逼近刻度值
  let similarityInterval = 1;
  let similarityIndex = 0;

  for (let index = 0; index < SNAP_COUNT_ARRAY.length; index++) {
    const item = SNAP_COUNT_ARRAY[index];
    if (calInterval <= item) {
      similarityInterval = item;
      similarityIndex = index;
      break;
    }
  }

  // 刻度值校验，如果不满足，循环下去
  while (similarityIndex < SNAP_COUNT_ARRAY.length) {
    if (intervalIsVerify({ interval: SNAP_COUNT_ARRAY[similarityIndex], tickCount, max: calMax, min: calMin })) {
      similarityInterval = SNAP_COUNT_ARRAY[similarityIndex];
      break;
    }
    similarityIndex++;
  }

  return fixedBase(similarityInterval * factor, factor);
}

// 刻度是否满足展示需求
function intervalIsVerify({ interval, tickCount, max, min }) {
  const minTick = Math.floor(min / interval) * interval;
  if (minTick + (tickCount - 1) * interval >= max) {
    return true;
  }
  return false;
}


// @antv/util fixedbase不支持科学计数法的判断，需要提mr
function fixedBase(v, base) {
  const str = base.toString();
  const index = str.indexOf('.');
  const indexOfExp = str.indexOf('e-');

  // 判断是否带小数点，1.000001 1.23e-9
  if (index < 0 && indexOfExp < 0) {
    // base为整数
    return Math.round(v);
  }
  let length = indexOfExp >= 0 ? parseInt(str.substr(indexOfExp + 2), 10) : str.substr(index + 1).length;
  if (length > 20) {
    length = 20;
  }
  return parseFloat(v.toFixed(length));
}
