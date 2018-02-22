# 按需引用

策略同： [自定义引用图表](https://antv.alipay.com/zh-cn/f2/3.x/tutorial/package.html)

## 核心包

```js
const Core = require('@antv/f2/lib/core');
```

该核心包不包含任何图表，只有核心代码，具体包含如下

1. Chart 类；
2. Scale：仅包含基础的 Linear、Cat 以及 Identity；
3. Coord: 仅包含直角坐标系；
4. Axis: 仅包含直角坐标系的坐标轴
5. Attr: 所有的图形属性

## 可动态加载的模块
### geom 类型
几何标记模块，用户绘制具体的图形，用法：

```js
require('@antv/f2/lib/geom/'); // 加载全部图形
require('@antv/f2/lib/geom/line'); // 折线图
require('@antv/f2/lib/geom/area'); // 面积图
require('@antv/f2/lib/geom/interval'); // 柱状图
require('@antv/f2/lib/geom/path'); // 路径图
require('@antv/f2/lib/geom/point'); // 点图
require('@antv/f2/lib/geom/polygon'); // 色块图
require('@antv/f2/lib/geom/schema'); // 箱型图、股票图
```

### 坐标系类型
```js
require('@antv/f2/lib/coord/polar'); // 极坐标
require('@antv/f2/lib/coord/cartesian'); // 直角坐标系（已经在 core 中）
```

### Axis 坐标轴类型
```js
require('@antv/f2/lib/component/axis/circle'); // 弧长坐标轴（用于极坐标）
require('@antv/f2/lib/component/axis/line'); // 直线坐标轴（已经在 core 中）
```

### adjust 数据调整类型
```js
require('@antv/f2/lib/geom/adjust/'); // 加载全部的 adjust 类型
require('@antv/f2/lib/geom/adjust/dodge'); // 分组类型
require('@antv/f2/lib/geom/adjust/stack'); // 层叠类型
```

### scale 度量类型

```js
require('@antv/f2/lib/scale/time-cat'); // 加载 timeCat 类型的度量 \
```

### 动画模块

动画模块也作为 Chart 的插件，所以在加载该模块之后还需要将模块注册至 Chart 上。

1. 仅包含入场的动画

```js
const GroupAnimation = require('@antv/f2/lib/animation/group-animation');
Chart.plugins.register(GroupAnimation); // 这里进行全局注册，也可以给 chart 的实例注册
```

2. 精细的动画模块（包含入场、更新以及销毁动画）

```js
const Animation = require('@antv/f2/lib/animation/animation');
Chart.plugins.register(Animation); // 这里进行全局注册，也可以给 chart 的实例注册
```

## 图表组件
### Guide

```js
// 第一步：加载需要的 guide 组件
require('@antv/f2/lib/component/guide'); // 加载全部的 guide 组件
require('@antv/f2/lib/component/guide/arc'); // 加载 Guide.Arc 组件
require('@antv/f2/lib/component/guide/html'); // 加载 Guide.Html 组件
require('@antv/f2/lib/component/guide/text'); // 加载 Guide.Text 组件
require('@antv/f2/lib/component/guide/rect'); // 加载 Guide.Rect 组件
require('@antv/f2/lib/component/guide/line'); // 加载 Guide.Line 组件
// 第二步：加载插件 Guide
const Guide = require('@antv/f2/lib/plugin/guide');
// 第三步：注册插件 Guide
Chart.plugins.register(Guide); // 这里进行全局注册，也可以给 chart 的实例注册
```

### Tooltip

```js
// 第一步：加载插件 Tooltip
const Tooltip = require('@antv/f2/lib/plugin/tooltip');
// 第二步：注册插件 Tooltip
Chart.plugins.register(Tooltip); // 这里进行全局注册，也可以给 chart 的实例注册
```

### Legend

```js
// 第一步：加载插件 Legend
const Legend = require('@antv/f2/lib/plugin/legend');
// 第二步：注册插件 Legend
Chart.plugins.register(Legend); // 这里进行全局注册，也可以给 chart 的实例注册
```

## 常用版本以及大小

| 版本 | 描述 | 大小（压缩之后） |
| -------- | -------- | -------- |
| `require('@antv/f2/lib/core')`     | 不包含任何图形，只有核心代码 | 81.3 k     |
| `require('@antv/f2/lib/index-common')` | 包含常用的图表类型: 面积图、柱状图、折线图、点图、饼图、雷达图等；坐标系包含：直角坐标系、极坐标系支持；timeCat 类型度量；图表组件（tooltip、legend 以及 guide）| 134 k |
| `require('@antv/f2/lib/index-simple')` | 仅包含简单的折线图、柱状图、饼图 | 92 k |
| `require('@antv/f2')` | 完整版 | 138 k |
