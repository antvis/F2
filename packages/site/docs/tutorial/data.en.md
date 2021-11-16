---
title: 数据
order: 3
---

数据是绘制一张图表最基本的部分。F2 基本的数据格式如下：

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
  { year: 2018, sales: 120 },
];
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
  { name: '其他', percent: 0.02, a: '1' },
];
```

详见饼图[示例](/zh/examples/pie/basic)。

### 区间柱状图

当 x 轴或者 y 轴的数据为数组时，我们默认会将映射为一段区间，进而绘制为区间柱状图。如下数据格式：

```javascript
const data = [
  { x: '分类一', y: [76, 100] },
  { x: '分类二', y: [56, 108] },
  { x: '分类三', y: [38, 129] },
  { x: '分类四', y: [58, 155] },
  { x: '分类五', y: [45, 120] },
  { x: '分类六', y: [23, 99] },
  { x: '分类七', y: [18, 56] },
  { x: '分类八', y: [18, 34] },
];
```

详见区间柱状图[示例](/zh/examples/column/basic#ranged)。
