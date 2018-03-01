# 度量

## 度量的定义

度量 Scale，是数据空间到图形空间的转换桥梁，负责原始数据到 [0, 1] 区间数值的相互转换工作（从原始数据到 [0, 1] 区间的转换我们称之为归一化操作）。

不同的数据类型对应不同的度量，如：

1. 连续数据类型，如 `0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10` 一组数据，在其原始数值范围 [0, 10] 内通过度量转换至 [0, 1] 范围的数据，变成 `0, 0.1, 0.2, ..., 0.9, 1`，同时通过 invert 反转，又可度量后的数值恢复至原始值；
2. 分类数据类型，如 `['男', '女']` 这一组数据，通过度量转换后变成 [0, 1]，同样时通过 invert 反转可恢复至原始值。

## 度量的功能

在图形语法中度量用于完成以下功能：

1. 将数据转换到 [0, 1] 范围内，方便将原始数据映射到位置、颜色、大小等图形空间上；

2. 将归一化后的数据反转回原始值。例如 `分类a` 转换成 0.2，那么对应 `0.2` 需要反转回 `分类a`；

3. 划分数据，用于在坐标轴、图例显示数值的范围、分类等信息。

Scale 的功能非常简单，但是在 F2 的数据处理流程中起着非常重要的承接作用，通过阅读 [G2 数据处理流程](https://antv.alipay.com/zh-cn/g2/3.x/tutorial/data-flow.html)章节，可以帮助您更好得理解度量。

## 度量的类型

度量的类型是由原始数据的值类型所决定的，所以在介绍度量的类型之前，需要了解下 F2 对数据的分类方式。

我们按照数值是否连续对数据进行分类：

1. 分类（非连续）数据，又分为有序分类和无序分类

2. 连续数据（时间也是一种连续数据类型）

Example: 

```js
const data = [
  { month: '一月', temperature: 7, city: 'Tokyo' },
  { month: '二月', temperature: 6.9, city: 'New York' },
  { month: '三月', temperature: 9.5, city: 'Tokyo' },
  { month: '四月', temperature: 14.5, city: 'Tokyo' },
  { month: '五月', temperature: 18.2, city: 'Berlin' }
];

// 指定度量(或称列定义）
chart.scale({
  month: {
    alias: '月份' // 为属性定义别名
  }, 
  temperature: {
    alias: '温度' // 为属性定义别名
  }
});
```

在上述数据中，`month` 代表月份，`temperature` 代表温度，`city` 代表城市，其中 `month` 和 `city` 都是分类类型数据，但是不同的是 `month` 作为月份是有序的分类类型，而 `city` 是无序的分类类型，而 `temperature` 是连续的数值类型。

根据上述的数据分类方式，F2 提供了不同的度量类型：

| 数据类型 | 度量类型 |
| ------- | ------- |
| 连续 | Linear |
| 分类（非连续） | Cat、TimeCat |

另外我们还提供了 `Identity` 类型的度量用于数据源中 **常量** 数据的操作。

对于 F2 生成的所有度量对象，均拥有以下属性，这些属性均可以由用户进行配置。

```js
{
  type: {String}, // 度量的类型
  range: {Array}, // 数值范围区间，即度量转换的范围，默认为 [0, 1]
  alias: {String}, // 为数据属性定义别名，用于图例、坐标轴、tooltip 的个性化显示
  ticks: {Array}, // 存储坐标轴上的刻度点文本信息
  tickCount: {Number}, // 坐标轴上刻度点的个数，不同的度量类型对应不同的默认值
  formatter: {Function} // 回调函数，用于格式化坐标轴刻度点的文本显示，会影响数据在坐标轴、图例、tooltip 上的显示
}
```

F2 默认生成度量的机制如下：

* 查看用户是否制定了对应字段的数据类型，查看[列定义](https://antv.alipay.com/zh-cn/g2/3.x/tutorial/how-to-scale.html)
* 如果没有，判断字段的第一条数据的字段类型
  + 如果数据中不存在对应的字段，则为 `Identity`
  + 如果是数字则为 `Linear`
  + 如果是字符串则为 `Cat`
  + `TimeCat` 类型需要用户使用列定义手动指定

下面就让我们来详细了解下各个度量的类型：

### Linear

连续的数据值，如这一组数据：[1, 2, 3, 4, 5]，除了通用的属性外，还包含以下自有属性：

```js
{
  nice: {Boolean}, // 默认为 true，用于优化数值范围，使绘制的坐标轴刻度线均匀分布。例如原始数据的范围为 [3, 97]，如果 nice 为 true，那么就会将数值范围调整为 [0, 100]
  min: {Number}, // 定义数值范围的最小值
  max: {Number}, // 定义数值范围的最大值
  tickCount: {Number}, // 定义坐标轴刻度线的条
  tickInterval: {Number}, // 用于指定坐标轴各个刻度点的间距，为原始数据值的差值，注意 tickCount 和 tickInterval 不可以同时声明
}
```

通过下面学生成绩的示例来说明：

```js
const data = [
  { name: '张三', score: 53 },
  { name: '王五', score: 92 }
];

chart.source(data);
chart.point().position('name*score').color('name');
chart.render();
```

<img src="https://gw.alipayobjects.com/zos/rmsportal/ldVMrTNHMHJbPaukJhFe.png" style="width:400px">

**说明：**
* 默认生成的 score 分数的度量的范围是 50 - 95，这是 `nice: true` 的效果（让人看起来更清晰）。

我们知道学生分数的范围是 0 - 100，所以 50 - 90 并不满足我们的需求，我们可以限定 `min`，`max` 的范围：

```js
const data = [
  { name: '张三', score: 53 },
  { name: '王五', score: 92 }
];

chart.source(data, {
  score: {
    min: 0,
    max: 100
  }
});

chart.point().position('name*score').color('name');
chart.render();
``` 

<img src="https://gw.alipayobjects.com/zos/rmsportal/mQVOhgkaViFkGojDREHR.png" style="width:400px">

### Cat

分类类型数据的度量。除了拥有通用的度量属性外，用户还可以设置 `values` 属性：

```js
{
  values: {Array} // 指定当前字段的分类值
}
```

F2 在生成 `Cat` 类型的度量时，`values` 属性的值一般都会从原始数据源中直接获取，但对于下面两种场景，需要用户手动指定 `values` 值：

1. 需要指定分类的顺序时，例如：type 字段原始值为 ['最大', '最小', '适中']，我们想指定这些分类在坐标轴或者图例上的顺序为 ['最小', '适中', '最大']。这时候 `Cat` 度量的配置如下：

```js
const data  = [
  { a: 'a1', b: 'b1', type: '最小' },
  { a: 'a2', b: 'b2', type: '最大' },
  { a: 'a3', b: 'b3', type: '适中' }
];
chart.scale('type', {
  type: 'cat',
  values: [ '最小', '适中', '最大' ]
});
```

如果不声明度量的 `values` 字段，那么默认的顺序是：'最小'，'最大'，'适中'。

2. 如果数据中的分类类型使用枚举的方式表示，那么也需要指定 `values`。

Example:

```js
const data  = [
  { a: 'a1', b: 'b1', type: 0 },
  { a: 'a2', b: 'b2', type: 2 },
  { a: 'a3', b: 'b3', type: 1 }
]
chart.scale('type', {
  type: 'cat',
  values: [ '最小', '适中', '最大' ]
});
```

**此处必须指定 `Cat` 类型，`values` 的值必须按照索引跟枚举类型一一对应。**

### TimeCat

`TimeCat` 度量对应时间数据，该类型默认会对数值进行排序。

`TimeCat` 是 `Cat` 度量的子类，除了支持所有通用的属性和 `Cat` 度量的属性外也有自己的属性: 

```js
{
  mask: {String}, // 指定时间的显示格式，默认：'YYYY-MM-DD'
}
```

