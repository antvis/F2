---
title: 核心概念
order: 1
---

为了更好地使用 F2 进行数据可视化，我们需要了解 F2 图表的组成以及相关术语。

## 图表结构

F2 图表采用声明式的组件化架构，一个完整的图表由多个组件组合而成：

```
Canvas (画布容器)
  └── Chart (图表核心)
        ├── Axis (坐标轴)
        ├── Geometry (几何标记)
        ├── Tooltip (提示框)
        ├── Legend (图例)
        └── Guide (辅助标记)
```

### 图表示例

![](https://gw.alipayobjects.com/zos/rmsportal/tpfdzWDYmxzHkquTihJe.png#width=600)
![](https://gw.alipayobjects.com/zos/rmsportal/lUqXwLjgRWhugemcNsqc.png#width=600)

## 核心术语

| 术语 | 英文 | 描述 |
|------|------|------|
| **坐标轴** | Axis | 图表通常包含两个坐标轴。在直角坐标系下为 x 轴和 y 轴，在极坐标下由角度和半径构成。每个坐标轴由轴线（line）、刻度线（tickLine）、刻度文本（label）和网格线（grid）组成。 |
| **图例** | Legend | 图表辅助元素，用于标定不同数据类型及数据范围，辅助阅读图表并帮助用户筛选数据。 |
| **几何标记** | Geometry | 点、线、面等几何图形。几何标记的类型决定了图表类型，是数据可视化后的实际表现。 |
| **图形属性** | Attribute | 对应视觉编码中的视觉通道，包括位置（position）、颜色（color）、大小（size）、形状（shape）四种。 |
| **坐标系** | Coordinate | 将两种位置标度结合组成的 2 维定位系统，描述数据如何映射到图形所在平面。 |
| **提示信息** | Tooltip | 鼠标悬停时以提示框形式显示数据信息，帮助用户获取具体数据。 |
| **辅助标记** | Guide | 用于在图表上绘制辅助线、辅助框或文本，如预警线、最高值线等。 |

## 声明式语法

F2 采用声明式 JSX 语法，让代码更直观和简洁：

```jsx
<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    {/* 坐标轴 */}
    <Axis field="genre" />
    <Axis field="sold" />

    {/* 几何标记 - 柱状图 */}
    <Interval x="genre" y="sold" color="genre" />

    {/* 提示框 */}
    <Tooltip />

    {/* 图例 */}
    <Legend />
  </Chart>
</Canvas>
```

### 声明式的优势

- **直观**: 组件结构清晰，一目了然
- **简洁**: 避免复杂的 API 调用链
- **可组合**: 组件可以灵活组合嵌套
- **框架友好**: 与 React、Vue 无缝集成

## 组件详解

### Canvas - 画布容器

Canvas 是图表的根容器，提供渲染环境：

```jsx
<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  {/* 子组件 */}
</Canvas>
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `context` | `CanvasRenderingContext2D` | - | **必填**，Canvas 2D 上下文 |
| `pixelRatio` | `number` | `window.devicePixelRatio` | 设备像素比 |
| `width` | `number` | - | 画布宽度 |
| `height` | `number` | - | 画布高度 |
| `animate` | `boolean` | `true` | 是否开启动画 |

### Chart - 图表核心

Chart 负责数据处理和坐标转换：

```jsx
<Chart data={data}>
  {/* 几何标记和组件 */}
</Chart>
```

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `data` | `Data[]` | - | **必填**，数据源 |
| `scale` | `ScaleConfig` | - | 度量配置 |
| `coord` | `CoordConfig` | - | 坐标系配置 |

### Geometry - 几何标记

几何标记决定了图表的类型，F2 提供多种内置几何标记：

| 几何标记 | 组件 | 图表类型 |
|----------|------|----------|
| Interval | `<Interval />` | 柱状图、条形图 |
| Line | `<Line />` | 折线图、曲线图 |
| Point | `<Point />` | 散点图、点图 |
| Area | `<Area />` | 面积图 |
| Candlestick | `<Candlestick />` | 蜡烛图（K线图） |

```jsx
// 柱状图
<Interval x="genre" y="sold" color="genre" />

// 折线图
<Line x="date" y="value" color="type" />

// 散点图
<Point x="weight" y="height" color="gender" />
```

### 图形属性

图形属性控制几何标记的视觉表现：

| 属性 | 说明 | 示例 |
|------|------|------|
| `position` | 位置，将字段映射到 x 或 y 轴 | `x="genre", y="sold"` |
| `color` | 颜色，支持字段或函数 | `color="genre"` 或 `color={datum => datum.value > 100 ? 'red' : 'blue'}` |
| `size` | 大小，控制点的大小、线的粗细等 | `size={10}` 或 `size={datum => datum.value}` |
| `shape` | 形状，控制几何标记的形状 | `shape="circle"` 或 `shape="hollowCircle"` |

### 坐标系

坐标系描述数据如何映射到平面：

| 类型 | 说明 | 配置 |
|------|------|------|
| rect | 直角坐标系（默认） | `<coord type="rect" />` |
| polar | 极坐标系 | `<coord type="polar" />` |
| helix | 螺旋坐标系 | `<coord type="helix" />` |

```jsx
// 使用极坐标系（饼图、玫瑰图等）
<Chart data={data} coord={{ type: 'polar' }}>
  <Interval x="genre" y="sold" color="genre" coord="polar" />
</Chart>
```

### 度量

度量（Scale）用于将数据转换为图形属性：

```jsx
<Chart
  data={data}
  scale={{
    sold: {
      min: 0,
      max: 500,
      tickCount: 5,
    },
    genre: {
      type: 'cat',
    },
  }}
>
  {/* ... */}
</Chart>
```

详细配置请参考：[度量](/tutorial/scale.zh.md)

## 数据格式

F2 要求数据源为 JSON 数组，数组的每个元素是一个标准 JSON 对象：

```jsx
const data = [
  { genre: 'Sports', sold: 275, year: 2023 },
  { genre: 'Strategy', sold: 115, year: 2023 },
  { genre: 'Action', sold: 120, year: 2023 },
  { genre: 'Shooter', sold: 350, year: 2023 },
  { genre: 'Other', sold: 150, year: 2023 },
];
```

数据处理相关内容请参考：[数据处理](/tutorial/data.zh.md)

## 完整示例

```jsx
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart
      data={data}
      scale={{
        sold: {
          min: 0,
          tickInterval: 50,
        },
      }}
    >
      <Axis field="genre" />
      <Axis field="sold" />
      <Interval x="genre" y="sold" color="genre" />
      <Tooltip />
      <Legend />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
```

## 下一步

- 学习 [图表语法](/tutorial/grammar.zh.md)
- 了解 [数据处理](/tutorial/data.zh.md)
- 查看 [组件 API](/api/chart/chart.zh.md)
- 学习 [图形属性](/tutorial/shape-attrs.zh.md)
