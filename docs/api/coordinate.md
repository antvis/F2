# Coordinate

设置坐标系，F2 支持两种坐标系：笛卡尔坐标系和极坐标系，默认使用笛卡尔坐标系。

## API

### 直角坐标系

```js
// 选择笛卡尔坐标系
chart.coord('rect');
// 坐标系翻转，绘制条形图时需要
chart.coord({
  transposed: true
});
chart.coord('rect', {
  transposed: true
});
```

### 极坐标系

```js
// 选择极坐标系
chart.coord('polar');
// 更多配置
chart.coord('polar', {
  transposed: true, // 坐标系翻转
  startAngle: {Number}, // 起始弧度
  endAngle: {Number}, // 结束弧度
  innerRadius: {Number}, // 内环半径，数值为 0 - 1 范围
  radius: {Number} // 半径，数值为 0 - 1 范围
});

```

## 示例

### 环图

<img src="https://gw.alipayobjects.com/zos/rmsportal/vcskeyyxWlRUwbUZVnng.png" style="width: 50%;">

```js
const data = [
  { name: '芳华', proportion: 0.4, a: '1' },
  { name: '妖猫传', proportion: 0.2, a: '1' },
  { name: '机器之血', proportion: 0.18, a: '1' },
  { name: '心理罪', proportion: 0.15, a: '1' },
  { name: '寻梦环游记', proportion: 0.05, a: '1' },
  { name: '其他', proportion: 0.02, a: '1' },
];
const chart = new F2.Chart({
  id: 'c1',
  width: 300,
  height: 300 * 0.64,
  pixelRatio: window.devicePixelRatio,
});
chart.source(data);
chart.legend(false);
chart.coord('polar', {
  transposed: true,
  innerRadius: 0.7,
});
chart.axis(false);
chart
  .interval()
  .position('a*proportion')
  .color('name', [
    '#1890FF',
    '#13C2C2',
    '#2FC25B',
    '#FACC14',
    '#F04864',
    '#8543E0',
  ])
  .adjust('stack');

chart.render();
```

### 半圆

<img src="https://gw.alipayobjects.com/zos/rmsportal/eYRCSTQZQknqfcIIMsKT.png" style="width: 50%;">

```js
const data = [
  { name: '芳华', proportion: 0.4, a: '1' },
  { name: '妖猫传', proportion: 0.2, a: '1' },
  { name: '机器之血', proportion: 0.18, a: '1' },
  { name: '心理罪', proportion: 0.15, a: '1' },
  { name: '寻梦环游记', proportion: 0.05, a: '1' },
  { name: '其他', proportion: 0.02, a: '1' },
];
const chart = new F2.Chart({
  id: 'c1',
  width: 300,
  height: 300 * 0.64,
  pixelRatio: window.devicePixelRatio,
});
chart.source(data);
chart.legend(false);
chart.coord('polar', {
  transposed: true,
  startAngle: -Math.PI,
  endAngle: 0,
});
chart.axis(false);
chart
  .interval()
  .position('a*proportion')
  .color('name', [
    '#1890FF',
    '#13C2C2',
    '#2FC25B',
    '#FACC14',
    '#F04864',
    '#8543E0',
  ])
  .adjust('stack');

chart.render();
```

