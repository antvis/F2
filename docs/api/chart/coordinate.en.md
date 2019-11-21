---
title: Coordinate
order: 3
---

设置坐标系，F2 支持两种坐标系：笛卡尔坐标系和极坐标系，默认使用笛卡尔坐标系。

## 配置坐标系

### 直角坐标系

```javascript
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

```javascript
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

## 获取坐标系对象

`chart.get('coord')` 返回坐标系对象。不同坐标系下该对象包含的属性不同，具体说明如下：

1. 直角坐标系

| **属性名** | **类型** | **解释** |
| --- | --- | --- |
| `start` | Object | 坐标系的起始点，F2 图表的坐标系原点位于左下角。 |
| `end` | Object | 坐标系右上角的画布坐标。 |
| `transposed` | Boolean | 是否发生转置，true 表示发生了转置。 |
| `isRect` | Boolean | 是否是直角坐标系，直角坐标系下为 true。 |

2. 极坐标系

| **属性名** | **类型** | **解释** |
| --- | --- | --- |
| `startAngle` | Number | 极坐标的起始角度，弧度制。 |
| `endAngle` | Number | 极坐标的结束角度，弧度制。 |
| `innerRadius` | Number | 绘制环图时，设置内部空心半径，相对值，0 至 1 范围。 |
| `radius` | Number | 设置圆的半径，相对值，0 至 1 范围。 |
| `isPolar` | Boolean | 判断是否是极坐标，极坐标下为 true。 |
| `transposed` | Boolean | 是否发生转置，true 表示发生了转置。 |
| `center` | Object | 极坐标的圆心所在的画布坐标。 |
| `circleRadius` | Number | 极坐标的半径值。 |

## 示例
### 环图
![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/971c4287-36a1-4932-bbd2-5859575f4d1c.png)


```javascript
const data = [
  { name: '芳华', proportion: 0.4, a: '1' },
  { name: '妖猫传', proportion: 0.2, a: '1' },
  { name: '机器之血', proportion: 0.18, a: '1' },
  { name: '心理罪', proportion: 0.15, a: '1' },
  { name: '寻梦环游记', proportion: 0.05, a: '1' },
  { name: '其他', proportion: 0.02, a: '1' },
];
const chart = new F2.Chart({
  id: 'ring',
  width: 300,
  height: 300 * 0.64,
  pixelRatio: window.devicePixelRatio,
});
chart.source(data);
chart.legend({
  position: 'right'
});
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

![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/abd8add5-3f74-43ca-8bd4-12aaaa8a6b9f.png)

```javascript
const data = [
  { name: '芳华', proportion: 0.4, a: '1' },
  { name: '妖猫传', proportion: 0.2, a: '1' },
  { name: '机器之血', proportion: 0.18, a: '1' },
  { name: '心理罪', proportion: 0.15, a: '1' },
  { name: '寻梦环游记', proportion: 0.05, a: '1' },
  { name: '其他', proportion: 0.02, a: '1' },
];
const chart = new F2.Chart({
  id: 'pie',
  width: 300,
  height: 300 * 0.64,
  pixelRatio: window.devicePixelRatio,
});
chart.source(data);
chart.legend({
  position: 'bottom',
  align: 'center'
});
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


