// 认为是nice的刻度
const SNAP_COUNT_ARRAY = [ 1, 1.2, 1.5, 2, 2.2, 2.4, 2.5, 3, 4, 5, 6, 7.5, 8, 10 ];
const DEFAULT_COUNT = 5; // 默认刻度值

export default cfg => {
  const { tickCount, tickInterval } = cfg || {};
  let { min, max } = cfg || {};
  min = isNaN(min) ? 0 : min;
  max = isNaN(max) ? 0 : max;

  let count = tickCount && tickCount >= 2 ? tickCount : DEFAULT_COUNT;

  // 计算interval， 优先取tickInterval
  const interval = tickInterval || getBestInterval({ tickCount: count, max, min });

  // 通过interval计算最小tick
  const minTick = Math.floor(min / interval) * interval;

  // 如果指定了tickInterval, count 需要根据指定的tickInterval来算计
  if (tickInterval) {
    const intervalCount = Math.abs(Math.ceil((max - minTick) / tickInterval)) + 1;
    // tickCount 作为最小 count 处理
    count = Math.max(count, intervalCount);
  }

  const ticks = [];
  let tickLength = 0;
  const fixedLength = getFixedLength(interval);
  if (min < 0 && max > 0 && count === 2) {
    return [
      toFixed(minTick, fixedLength),
      toFixed(Math.ceil(max / interval) * interval, fixedLength)
    ];
  }

  while (tickLength < count) {
    ticks.push(toFixed(minTick + tickLength * interval, fixedLength));
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
  let similarityIndex = 0;
  for (let index = 0; index < SNAP_COUNT_ARRAY.length; index++) {
    const item = SNAP_COUNT_ARRAY[index];
    if (calInterval <= item) {
      similarityIndex = index;
      break;
    }
  }

  // 特殊情况找不到满足条件的，直接取最逼近刻度
  const similarityInterval = min < 0 && max > 0 && tickCount === 2 ? SNAP_COUNT_ARRAY[similarityIndex] : getInterval(similarityIndex, tickCount, calMin, calMax);

  // 小数点位数还原到数据的位数, 因为similarityIndex有可能是小数，所以需要保留similarityIndex自己的小数位数
  const fixedLength = getFixedLength(similarityInterval) + getFixedLength(factor);
  return toFixed(similarityInterval * factor, fixedLength);
}

function getInterval(startIndex, tickCount, min, max) {
  let verify = false;
  let interval = SNAP_COUNT_ARRAY[startIndex];
  // 刻度值校验，如果不满足，循环下去
  for (let i = startIndex; i < SNAP_COUNT_ARRAY.length; i++) {
    if (intervalIsVerify({ interval: SNAP_COUNT_ARRAY[i], tickCount, max, min })) {
      // 有符合条件的interval
      interval = SNAP_COUNT_ARRAY[i];
      verify = true;
      break;
    }
  }
  // 如果不满足, 依次缩小10倍，再计算
  if (!verify) {
    return 10 * getInterval(0, tickCount, min / 10, max / 10);
  }
  return interval;
}

// 刻度是否满足展示需求
function intervalIsVerify({ interval, tickCount, max, min }) {
  const minTick = Math.floor(min / interval) * interval;
  if (minTick + (tickCount - 1) * interval >= max) {
    return true;
  }
  return false;
}


// 计算小数点应该保留的位数
function getFixedLength(num) {
  const str = num.toString();
  const index = str.indexOf('.');
  const indexOfExp = str.indexOf('e-');

  let length = indexOfExp >= 0 ? parseInt(str.substr(indexOfExp + 2), 10) : str.substr(index + 1).length;
  if (length > 20) {
    // 最多保留20位小数
    length = 20;
  }
  return length;
}

// @antv/util fixedbase不支持科学计数法的判断，需要提mr
function toFixed(v, length) {
  return parseFloat(v.toFixed(length));
}
