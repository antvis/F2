import F2 from '@antv/f2';

const data = [{
  assetType: '债券资产',
  percent: 73.76,
  const: 'const'
}, {
  assetType: '其他资产',
  percent: 22.11,
  const: 'const'
}, {
  assetType: '股票资产',
  percent: 2.20,
  const: 'const'
}, {
  assetType: '现金资产',
  percent: 1.93,
  const: 'const'
}];

const colorMap = {
  债券资产: '#1890FF',
  其他资产: '#2FC25B',
  股票资产: '#FACC14',
  现金资产: '#F04864'
};
// 设置图例项的内容
const legendItems = [];
data.forEach(function(obj) {
  const item = {
    name: obj.assetType,
    value: '    ' + obj.percent + '%',
    marker: {
      symbol: 'square',
      fill: colorMap[obj.assetType],
      radius: 4
    }
  };
  legendItems.push(item);
});

const chart = new F2.Chart({
  id: 'container',
  pixelRatio: window.devicePixelRatio
});
chart.source(data, {
  percent: {
    formatter: function formatter(val) {
      return val + '%';
    }
  }
});
chart.coord('polar', {
  transposed: true,
  radius: 0.85
});
chart.legend({
  position: 'right',
  custom: true,
  items: legendItems,
  nameStyle: {
    fill: '#808080'
  }, // 图例项 key 值文本样式
  valueStyle: {
    fill: '#333',
    fontWeight: 'bold' // 图例项 value 值文本样式
  }
});
chart.axis(false);
chart.interval()
  .position('const*percent')
  .color('assetType', function(val) {
    return colorMap[val];
  })
  .adjust('stack')
  .style({
    lineWidth: 1,
    stroke: '#fff'
  });
chart.render();
