---
title: Scale
order: 2
---

度量 Scale，是数据空间到图形空间的转换桥梁，负责原始数据到 [0, 1] 区间数值的相互转换工作。针对不同的数据类型对应不同类型的度量。

根据数据的类型，F2 支持以下几种度量类型：

- **identity**，常量类型的数值，也就是说数据的某个字段是不变的常量；

- **linear**，连续的数字 [1, 2, 3, 4, 5]；

- **cat**，分类, ['男','女']；

- **timeCat**，时间类型；


在 F2 的使用中，我们主要通过列定义操作来接触度量：

```javascript
const data = [
  { a: 'a', b: 20 },
  { a: 'b', b: 12 },
  { a: 'c', b: 8 },
];
const defs = {
  a: {
    type: 'cat' // 声明 a 字段的类型
  },
  b: {
    min: 0, // 手动指定最小值
    max: 100 // 手动指定最大值
  }
};

chart.source(data, defs);
```

## 通用属性

```javascript
chart.scale('fieldName', {
  // 各个属性配置
});
```

下面列出的是通用的属性：

| **属性名** | **类型** | **说明** |
| --- | --- | --- |
| `type` | String | 指定不同的度量类型，支持的 type 为 `identity`、`linear`、`cat`、`timeCat`。 |
| `formatter` | Function | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、提示信息 tooltip 上的显示。 |
| `range` | Array | 输出数据的范围，数值类型的默认值为 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。 |
| `alias` | String | 该数据字段的显示别名，一般用于将字段的英文名称转换成中文名。 |
| `tickCount` | Number | 坐标轴上刻度点的个数，不同的度量类型对应不同的默认值。 |
| `ticks` | Array | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。 |


代码示例:

```javascript
chart.scale('aqi',  {
  min: 0,
  ticks: [ 0, 50, 100, 150, 200, 300, 500 ],
  alias: 'AQI(空气质量指数)',
});
```

## 各个 Scale 类型对应的属性

### linear
| **属性名** | **类型** | **说明** |
| --- | --- | --- |
| `alias` | String | 别名。 |
| `nice` | Boolean | 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100]。 |
| `min` | Number | 定义数值范围的最小值。 |
| `max` | Number | 定义数值范围的最大值。 |
| `range` | Array | 输出数据的范围，数值类型的默认值为 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。 |
| `formatter` | Function | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。 |
| `ticks` | Array | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。 |
| `tickCount` | Number | 定义坐标轴刻度线的条数，默认为 5。 |
| `tickInterval` | Number | 用于指定坐标轴各个标度点的间距，是原始数据之间的间距差值，**tickCount 和 tickInterval 不可以同时声明。** |


### cat
| **属性名** | **类型** | **说明** |
| --- | --- | --- |
| `alias` | String | 别名。 |
| `range` | Array | 输出数据的范围，数值类型的默认值为 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。 |
| `formatter` | Function | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。 |
| `ticks` | Array | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。 |
| `tickCount` | Number | 定义坐标轴刻度线的条数，默认为 5。 |
| `values` | Array | 具体的分类的值，一般用于指定具体的顺序和枚举的对应关系。 |
| `isRounding` | Boolean | 默认值为 `false`, 在计算 ticks 的时候是否允许取整以满足刻度之间的均匀分布，取整后可能会和用户设置的 tickCount 不符合。 |


`values` 属性常用于 2 个场景：

1. 需要制定分类的顺序时，例如：c 字段有'最大','最小'和'适中'3种类型，我们想指定这些数值在坐标轴或者图例上的显示顺序时：


```javascript
const defs = {
  c: {
    type: 'cat',
    values: [ '最小','适中','最大' ]
  }
};
```

2. 数据字段中的数据是数值类型，但是需要转换成分类类型，**这个时候需要注意原始数据必须是索引值**。


![](https://gw.alipayobjects.com/zos/finxbff/compress-tinypng/8ecd02c0-b9ee-4533-b6c8-417b4627c4f3.png)

```javascript
const data = [
  { month: 0, tem: 7, city: 'Tokyo' },
  { month: 1, tem: 6.9, city: 'Tokyo' },
  { month: 2, tem: 9.5, city: 'Tokyo' },
  { month: 3, tem: 14.5, city: 'Tokyo' },
  { month: 4, tem: 18.2, city: 'Tokyo' },
  { month: 5, tem: 21.5, city: 'Tokyo' },
  { month: 6, tem: 25.2, city: 'Tokyo' }
];
const defs = {
  month: {
    type: 'cat',
    values: [ '一月', '二月', '三月', '四月', '五月', '六月', '七月' ] // 这时候 month 的原始值是索引值
  }
};

const chart = new F2.Chart({
  id: 'c1',
  width: 400,
  height: 250,
  pixelRatio: window.devicePixelRatio
});
chart.source(data, defs);
chart.legend({
  align: 'center',
  itemWidth: null
});
chart.interval().position('month*tem');
chart.render();
```

### timeCat

时间分类类型，**默认会对数据做排序**。

| **属性名** | **类型** | **说明** |
| --- | --- | --- |
| `nice` | Boolean | 是否将 ticks 进行优化，变更数据的最小值、最大值，使得每个 tick 都是用户易于理解的数据。 |
| `mask` | String | 数据的格式化格式 默认：'YYYY-MM-DD'。 |
| `tickCount` | Number | 坐标点的个数，默认是 5。但不一定是准确值。 |
| `values` | Array | 具体的分类的值，一般用于指定具体的顺序和枚举的对应关系。 |
| `alias` | String | 别名。 |
| `range` | Array | 输出数据的范围，数值类型的默认值为 [0, 1]，格式为 [min, max]，min 和 max 均为 0 至 1 范围的数据。 |
| `formatter` | Function | 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴 axis、图例 legend、tooltip 上的显示。 |
| `ticks` | Array | 用于指定坐标轴上刻度点的文本信息，当用户设置了 ticks 就会按照 ticks 的个数和文本来显示。 |
| `isRounding` | Boolean | 默认值为 `false`, 在计算 ticks 的时候是否允许取整以满足刻度之间的均匀分布，取整后可能会和用户设置的 tickCount 不符合。 |


**注意：`mask` 和 `formatter` 这两个属性不可共用，如果同时设置了，会根据 `formatter` 进行格式化，`mask` 属性将不生效。**

**性能小提示：**

当图表的数据源已经过排序，可以通过在列定义中设置 `sortable: false` 来提升性能，默认情况下，会对 timeCat 类型的度量进行数据排序操作。

```javascript
chart.scale('fieldName', {
  type: 'timeCat',
  sortable: false
})
```


