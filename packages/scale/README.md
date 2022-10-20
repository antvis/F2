# `@antv/scale`

> 0.3 版本不兼容之前 0.1.X，大体上兼容 0.2.x 版本，一些差异在最下面列出

## Description

scale 有很多中文名，标度、度量、比例尺等等。它是数据空间到图形空间的转换桥梁，负责将数据从数据空间（定义域）转换为图形属性空间区域（值域），下文都称为度量。

例如：

![](https://www.oxxostudio.tw/img/articles/201411/20141112_1_04.png)

或者

![](https://www.oxxostudio.tw/img/articles/201411/20141112_1_05.png)

## Usage

```ts
import { getScale } from '@antv/scale';

const Linear = getScale('linear');

// 详情可参考单测用例
const scale = new Linear({
  min: 0,
  max: 100,
  range: [0, 1],
});

scale.scale(30); // 0.3
scale.invert(0.3); // 30
scale.getText(30); // '30'
```

## API

Scale 度量模块提供了下面 3 大类的度量

- 分类度量：
  - cat： 分类度量
  - timeCat: 时间分类度量
- 连续度量：
  - linear: 线性度量
  - time：连续的时间度量
  - log: log 度量
  - pow: pow 度量
  - quantize：分段度量，用户可以指定不均匀的分段
  - quantile: 等分度量，根据数据的分布自动计算分段
- 常量度量
  - identity: 常量度量
    这些度量的使用通过 getScale 方法来获取

```js
import { getScale } from '@antv/scale';

const Linear = getScale('linear');
const TimeCat = getScale('timeCat');
```

度量的属性大部分一致，可以将属性分为：

- 通用属性： 所有度量都适用的属性
- 度量的专有属性：个别度量专有的属性，对其他度量无意义

### 通用属性

| 名称       | 类型               | 说明                                   |
| ---------- | ------------------ | -------------------------------------- |
| type       | string             | 度量 类型                              |
| values     | any[]              | 定义域                                 |
| min        | any                | 定义域的最小值，在分类型 度量 中为序号 |
| max        | any                | 定义域的最大值                         |
| range      | [number, number]   | 值域的最小、最大值                     |
| tickCount  | number             | 期望的 tick 数量，非最终结果           |
| formatter  | func(value, index) | 格式化函数，用于 tooltip、tick 等展示  |
| tickMethod | string/func(scale) | 计算 ticks 的方法                      |

#### tickMethod

这个属性用户设置计算 ticks 的方法，可以传入字符串或者回调函数，支持的字符串类型有：

- `wilkinson-extended` ：计算数字 ticks 的方法，linear 类型度量内置的计算方法
- `r-pretty`: 计算数字 ticks 的方法， ticks 的 nice 效果很好，但是 tickCount 的精度太差
- `time`: 时间 ticks 的计算方法，计算出一个 tickInterval，坐标刻度之间的间隔固定
- `time-pretty`: 时间 ticks 的计算方法，会对年、月进行优化，time 类型度量内置的计算方法
- `log`: 计算数字的 ticks 方法，按照 log 的函数来计算，生成 [0, 10, 100, 1000] 类似的 ticks
- `pow`: 计算数字的 ticks 方法，按照 pow 的函数来计算，生成 [0, 4, 9, 16] 类似的 ticks
- `quantile`: 计算数字的 ticks 方法，根据统计学上的 几分位 概念计算 ticks，表现的是数据的分布

### 通用的 Methods

> 所有的 Scale 仅开放下面的方法，不提供任何其他方法

| 名称      | 类型                  | 说明                               |
| --------- | --------------------- | ---------------------------------- |
| scale     | (value: any): number  | 将定义域的输入值转换为值域的输出值 |
| invert    | (scaled: number): any | 将值域的输入值转换为定义域的输出值 |
| translate | (value: any): number  | 分类型 度量 中，将定义域转化为序号 |
| clone     | (): void              | 复制 度量 实例                     |
| getTicks  | (): Tick[]            | 获取所有 ticks 集合                |
| getText   | (value: any): string  | 获取输入值的展示结果               |
| change    | (cfg)                 | 修改度量                           |

### 专有属性

这里除了列举各个度量专有的属性，和一些属性适合的取值，例如 tickMethod 方法不同的度量适合的计算方式不一样，任意设置可能达不到想要的效果

#### pow

| 名称 | 类型 | 说明 |
| exponent | number | 指数 |

#### log

| 名称 | 类型 | 说明 |
| base | number | 对数底数 |

#### quantize

这是一种分段度量，scale 按照用户设置的 ticks 进行计算 scale，如果未设置 ticks ，则使用 `r-pretty` 计算默认的 ticks

#### quantile

这是一种按照数据密度自动分段的度量，按照设置的 values 计算 ticks，进行 scale 时按照 ticks 计算，而非均匀计算，使用 `tickMethod: quantile` 计算 ticks

## 与 2.x 的兼容性问题

### 新增的特性

- tickMethod：2.x 计算 ticks 的算法都是固定在各个度量内部，3.x 中提供了用户改变计算 ticks 算法的接口
- min, max：3.x 中 cat、timeCat 类型的 min, max 可以指定
- 新增两种 scale: quantize， quantile

### 不再支持的属性（暂时不支持）

- tickInterval， minTickInterval：在 linear、log、pow 度量中不再支持
- transform：3.x 中移除这个函数，大多数度量中使用不到
