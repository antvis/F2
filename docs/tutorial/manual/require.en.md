---
title: 按需引用
order: 7
---

F2 应用在移动端，所以对文件的大小非常重视，而默认情况下 F2 包含了完整的[几何标记类型](https://www.yuque.com/antv/f2/geometry)、[度量类型](https://www.yuque.com/antv/f2/scale)、[坐标系类型](https://www.yuque.com/antv/f2/coordinate)以及图表组件，但是用户有时候可能只需要其中几种，所以 F2 提供了按需引用的策略，由用户自定义引用需要的功能。

## 如何按需引用

通过以下步骤进行按需引用，降低无用代码的引入：

1. 安装 f2 npm 包

2. 引入核心包 Core（**必须引入）**

3. 引入需要的模块


### 安装 f2 npm 包

```bash
$ npm install @antv/f2
```

### 引入核心包 Core

**必须引入**

```javascript
const Core = require('@antv/f2/lib/core');
```

该包只包含核心的图形语法处理逻辑，具体包含如下：

- Chart：图表入口类

- Goem：几何标记基类，**仅包含核心数据处理流程，不包含任何具体的几何标记（线、面、柱等）实现**

- Attr：图形属性，position、color、shape、size

- Scale：度量，**仅包含基础的 Linear、Cat 以及 Identity 这三种类型**

- Coord：坐标系，**仅包含直角坐标系**

- Axis：坐标轴，**仅包含直角坐标系的坐标轴**

- G：绘制引擎

- Util: 通用工具类


### 引入需要的模块

可动态加载的模块包含如下:

#### geom 类型

几何标记模块，用户绘制具体的图形，用法：

```javascript
require('@antv/f2/lib/geom/'); // 加载全部图形

require('@antv/f2/lib/geom/line'); // 只加载折线图
require('@antv/f2/lib/geom/area'); // 只加载面积图
require('@antv/f2/lib/geom/interval'); // 只加载柱状图
require('@antv/f2/lib/geom/path'); // 只加载路径图
require('@antv/f2/lib/geom/point'); // 只加载点图
require('@antv/f2/lib/geom/polygon'); // 只加载色块图
require('@antv/f2/lib/geom/schema'); // 只加载箱型图、股票图
```

#### 坐标系类型

```javascript
require('@antv/f2/lib/coord/polar'); // 极坐标

require('@antv/f2/lib/coord/cartesian'); // 直角坐标系（已经在 core 核心包中）
```

#### Axis 坐标轴类型

```javascript
require('@antv/f2/lib/component/axis/circle'); // 弧长坐标轴（用于极坐标）

require('@antv/f2/lib/component/axis/line'); // 直线坐标轴（已经在 core 核心包中）
```

#### adjust 数据调整类型

```javascript
require('@antv/f2/lib/geom/adjust/'); // 加载全部的 adjust 类型

require('@antv/f2/lib/geom/adjust/dodge'); // 只加载分组类型
require('@antv/f2/lib/geom/adjust/stack'); // 只加载层叠类型
```

#### 动画

**动画模块也作为 Chart 的插件，所以在加载该模块之后，还需要将模块注册至 Chart 上。**

> 以下两种动画按情况选择一种即可。


- 仅包含入场的群组


```javascript
const GroupAnimation = require('@antv/f2/lib/animation/group');
Chart.plugins.register(GroupAnimation); // 这里进行全局注册，也可以给 chart 的实例注册
```

- 精细的动画模块（包含入场、更新以及销毁动画）


```javascript
const Animation = require('@antv/f2/lib/animation/detail');
Chart.plugins.register(Animation); // 这里进行全局注册，也可以给 chart 的实例注册
```

#### Guide

（插件）辅助元素模块，在使用该模块时，用户可以动态选择需要使用的辅助元素类型，然后再将对应的插件注册至 Chart 中。

```javascript
// 第一步：加载需要的 guide 组件
require('@antv/f2/lib/component/guide'); // 加载全部的 guide 组件

// 或者只加载需要的 guide 组件
require('@antv/f2/lib/component/guide/arc'); // 只加载 Guide.Arc 组件
require('@antv/f2/lib/component/guide/html'); // 只加载 Guide.Html 组件
require('@antv/f2/lib/component/guide/text'); // 只加载 Guide.Text 组件
require('@antv/f2/lib/component/guide/rect'); // 只加载 Guide.Rect 组件
require('@antv/f2/lib/component/guide/line'); // 只加载 Guide.Line 组件
require('@antv/f2/lib/component/guide/tag'); // 只加载 Guide.Tag 组件
require('@antv/f2/lib/component/guide/region-filter'); // 只加载 Guide.RegionFilter 组件
require('@antv/f2/lib/component/guide/point'); // 只加载 Guide.Point 组件

// 第二步：加载插件 Guide
const Guide = require('@antv/f2/lib/plugin/guide');

// 第三步：注册插件 Guide
F2.Chart.plugins.register(Guide); // 这里进行全局注册，也可以给 chart 的实例注册
```

#### Tooltip

（插件）提示信息模块。

```javascript
// 第一步：加载插件 Tooltip
const Tooltip = require('@antv/f2/lib/plugin/tooltip');
// 第二步：注册插件 Tooltip
F2.Chart.plugins.register(Tooltip); // 这里进行全局注册，也可以给 chart 的实例注册
```

#### Legend

（插件）图例。

```javascript
// 第一步：加载插件 Legend
const Legend = require('@antv/f2/lib/plugin/legend');
// 第二步：注册插件 Legend
F2.Chart.plugins.register(Legend); // 这里进行全局注册，也可以给 chart 的实例注册
```

#### Interaction

交互行为引入。

```javascript
require('@antv/f2/lib/interaction/'); // 引入所有的交互行为

require('@antv/f2/lib/interaction/pie-select'); // 只引入 pie-select 饼图选中交互

require('@antv/f2/lib/interaction/interval-select');  // 只引入 interval-select 柱状图选中交互

require('@antv/f2/lib/interaction/pan'); // 只引入 pan 图表平移交互

require('@antv/f2/lib/interaction/pinch'); // 引入 pinch 图表缩放交互
```

#### Scroll bar

（插件）用于辅助 pan 和 pin 两种交互行为，以显示当前图表的数据范围。

```javascript
// 第一步：加载插件 ScrollBar
const ScrollBar = require('@antv/f2/lib/plugin/scroll-bar');
// 第二步：注册插件 ScrollBar
F2.Chart.plugins.register(ScrollBar); // 这里进行全局注册，也可以给 chart 的实例注册
```

## 示例

假如一个业务场景下仅需要绘制饼图（不带动画）：

```javascript
const F2 = require('@antv/f2/lib/core'); // 必须引入
require('@antv/f2/lib/geom/interval'); // 引入 interval 几何标记
require('@antv/f2/lib/coord/polar'); // 引入 极坐标
require('@antv/f2/lib/geom/adjust/stack'); // 引入数据层叠调整类型
```

## 可视化工具

为了方便用户，我们提供了 UI 化的按需打包工具，帮助用户自由选择所需图表和组件进行打包下载，使用方法如下：

```bash
# 进入 f2 项目根目录，运行如下命令
$ npm run bundler
```

在出现的界面中进行需要模块的勾选，最后打包下载即可。

![](https://gw.alipayobjects.com/zos/rmsportal/RmUwBPLSWIbecmKEgoSw.png)
