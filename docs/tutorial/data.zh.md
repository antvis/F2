---
title: 数据
order: 3
---

数据是绘制一张图表最基本的部分。F2 支持的数据格式如下：

```javascript
const data = [
  { year: 2010, sales: 40 },
  { year: 2011, sales: 30 },
  { year: 2012, sales: 50 },
  { year: 2013, sales: 60 },
  { year: 2014, sales: 70 },
  { year: 2015, sales: 80 },
  { year: 2016, sales: 80 },
  { year: 2017, sales: 90 },
  { year: 2018, sales: 120 }
];
```

## 如何装载数据

当 chart 实例创建完毕之后，通过调用以下接口装载数据：

```javascript
chart.source(data);
```

## 如何更新数据

F2 更新数据的方式有两种：

1. 图表数据更新（前后数据结构不发生变化），需要马上更新图表。


```javascript
chart.changeData(data);
```

2. 如果仅仅是更新数据，而不需要马上更新图表，可以调用 `chart.source(data)`，然后在需要更新图表时调用 `chart.repaint()`。


```javascript
chart.source(newData); // 更新数据源

// do something

chart.repaint();  // 更新图表！
```

3. 更新数据时还可以清除图表上的所有元素，重新定义图形语法，改变图表类型和各种配置。


```javascript
chart.line().position('x*y');

chart.render();

chart.clear(); // 清理所有
chart.source(newData); // 加载新数据
chart.interval().position('x*y').color('z'); // 重新定义图形语法
chart.render();
```

## 特殊图表的数据说明

### 饼图

绘制饼图时，数据集中的每一条记录中**必须包含一个常量字段（并且必须是字符串类型）**，如下所示：

```javascript
const data = [
  { name: '芳华', percent: 0.4, a: '1' },
  { name: '妖猫传', percent: 0.2, a: '1' },
  { name: '机器之血', percent: 0.18, a: '1' },
  { name: '心理罪', percent: 0.15, a: '1' },
  { name: '寻梦环游记', percent: 0.05, a: '1' },
  { name: '其他', percent: 0.02, a: '1' }
];
```

详见饼图[示例](/zh/examples/pie/basic)。

### 区间柱状图

当 x 轴或者 y 轴的数据为数组时，我们默认会将映射为一段区间，进而绘制为区间柱状图。如下数据格式：

```javascript
const data = [
  { x: '分类一', y: [ 76, 100 ] },
  { x: '分类二', y: [ 56, 108 ] },
  { x: '分类三', y: [ 38, 129 ] },
  { x: '分类四', y: [ 58, 155 ] },
  { x: '分类五', y: [ 45, 120 ] },
  { x: '分类六', y: [ 23, 99 ] },
  { x: '分类七', y: [ 18, 56 ] },
  { x: '分类八', y: [ 18, 34 ] },
];
```

详见区间柱状图[示例](/zh/examples/column/basic#ranged)。

### 股票图

股票图的 Y 轴数据由收盘价、开盘价、最高价和最低价组成，所以在绘制时，需要将 Y 轴对应的数据构造成一个数组（不用进行排序），如下所示：

```javascript
const data = [
  { time: '2015-09-02', range: [ 6.2, 5.99, 6.84, 5.98 ], trend:1 },
  { time: '2015-09-07', range: [ 6.19, 6.2, 6.45, 6.09 ], trend: 0 },
  { time: '2015-09-08', range: [ 6.26, 6.64, 6.7, 6.01 ], trend: 0 },
  { time: '2015-09-09', range: [ 6.76, 6.93, 7.03, 6.65 ], trend: 0 },
  { time: '2015-09-10', range: [ 6.7, 6.86, 7.17, 6.65 ], trend: 0 },
  { time: '2015-09-11', range: [ 6.87, 6.81, 7.01, 6.68 ], trend: 1 }
];
```

详见 K 线图[示例](/zh/examples/candlestick/basic)。
