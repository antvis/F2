export default {
  general: {
    title: '这是一个图表，',
    withTitle: '这是一个关于“{title}”的图表。'
  },
  coord: {
    cartesian: 'X轴是{xLabel}Y轴是{yLabel}'
    // polar: '弧度是{xLabel}半径是{yLabel}'
  },
  scale: {
    linear: '数值型，数据最小值为{min}，最大值为{max}；',
    cat: '分类型, 分类类型有：{values}；',
    timeCat: '时间型，时间范围从{start}到{end}；'
  },
  geometry: {
    prefix: '共有{count}种分类组成，',
    oneData: '第{index}类是{name}，数据是{values};',
    partData: '第{index}类是{name}，共有{count}项数据，前{part}项是{values};',
    allData: '第{index}类是{name}，有{count}项数据，分别是{values};'
  },
  legend: {
    prefix: '图例分类有：'
  }
};
