// cat平均算法，保头保尾
export default cfg => {

  const { values, tickCount } = cfg;
  if (!tickCount) {
    return values;
  }
  if (values.length <= 1) {
    return values;
  }

  // 获取间隔步长, 最小是1
  const step = parseInt(values.length / (tickCount - 1)) || 1;
  const ticks = [];

  // 按间隔数取对应节点
  for (let index = 0; index < values.length; index = index + step) {
    ticks.push(values[index]);
  }

  const last = values[values.length - 1];

  // 如果最后一个tick不等于原数据的最后一个
  if (ticks[ticks.length - 1] !== last) {
    if (ticks.length >= tickCount) {
      // 如果当前的tick个数满足要求
      ticks[ticks.length - 1] = last;
    } else {
      // 不满足tickCount则直接加入最后一个
      ticks.push(last);
    }
  }

  return ticks;
};
