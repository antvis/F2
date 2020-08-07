
const DDEFAULT_COUNT = 5;

export default cfg => {
  const { min, max, tickCount } = cfg || {};
  const count = tickCount || DDEFAULT_COUNT;
  // 1.计算平均刻度间隔
  const avgInterval = (max - min) / (count - 1);

  // 2.转化成1~10的刻度间隔值
  const factor = getFactor(avgInterval);
  // 3.获取满足tickCount的情况下，最优刻度值
  const interval = getBestInterval({ tickCount: count, avgInterval, max, min, factor });
  const minTickPosition = Math.ceil(Math.abs(min / interval));
  const minTick = min > 0 ? minTickPosition * interval : -minTickPosition * interval;

  let tickLength = 0;

  const ticks = [];
  while (minTick + tickLength * interval < max) {
    ticks.push(minTick + tickLength * interval);
    tickLength++;
  }
  ticks.push(minTick + tickLength * interval);
  return ticks;
};

const DECIMAL_LENGTH = 12;
function getFactor(number) {
  if (number === Infinity || number === -Infinity) {
    throw new Error('Not support Infinity!');
  }

  // 取正数
  number = Math.abs(number);
  let factor = 1;

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
function getBestInterval({ tickCount, avgInterval, max, min, factor }) {
  const SNAP_COUNT_ARRAY = [ 1, 1.2, 1.5, 1.6, 2, 2.2, 2.4, 2.5, 3, 4, 5, 6, 7.5, 8, 10 ];
  const calInterval = avgInterval / factor;
  const calMax = max / factor;
  const calMin = min / factor;

  // 相似数
  let similarityInterval;
  let similarityIndex;

  for (let index = 0; index < SNAP_COUNT_ARRAY.length; index++) {
    const item = SNAP_COUNT_ARRAY[index];
    const nextItem = SNAP_COUNT_ARRAY[index + 1];
    if (index === 0 && item <= calInterval) {
      similarityInterval = item;
      similarityIndex = 0;
    }

    // last
    if (index === SNAP_COUNT_ARRAY.length - 1 && item <= calInterval) {
      similarityInterval = item;
      similarityIndex = index;
    }

    if (index <= SNAP_COUNT_ARRAY.length - 2) {
      if (calInterval >= item && calInterval < nextItem) {
        // 取更加逼近的刻度
        if (Math.abs(calInterval - item) > Math.abs(calInterval - nextItem)) {
          similarityInterval = nextItem;
          similarityIndex = index + 1;
        } else {
          similarityInterval = item;
          similarityIndex = index;
        }
      }
    }
  }

  if (intervalIsVerify({ interval: similarityInterval, tickCount, max: calMax, min: calMin })) {
    return similarityInterval * factor;
  }

  // 最后一个接直接返回
  if (similarityIndex === SNAP_COUNT_ARRAY.length - 1) {
    return similarityInterval * factor;
  }

  similarityIndex++;
  while (similarityIndex < SNAP_COUNT_ARRAY.length) {
    if (intervalIsVerify({ interval: SNAP_COUNT_ARRAY[similarityIndex], tickCount, max: calMax, min: calMin })) {
      similarityInterval = SNAP_COUNT_ARRAY[similarityIndex];
      break;
    }
    similarityIndex++;
  }
  return similarityInterval * factor;
}

// 刻度是否满足展示需求
function intervalIsVerify({ interval, tickCount, max, min }) {
  const maxRange = max - min;

  // 上下要预留间距
  const maxTickPosition = Math.abs(max) % interval > 0 ? 1 : 0;
  const minTickPosition = Math.abs(min) % interval > 0 ? 1 : 0;
  const space = (maxTickPosition + minTickPosition) * interval;

  if (interval * tickCount - maxRange - space >= 0) {
    return true;
  }

  return false;
}
