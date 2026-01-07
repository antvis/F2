---
title: 图形语法
order: 2
---

## 简介

F2 基于《The Grammar of Graphics》（Leland Wilkinson 著）一书提出的图形理论。该理论是一套用来描述所有统计图形深层特性的语法规则，回答了"什么是统计图形"这一问题，以自底向上的方式组织最基本的元素形成更高级的元素。

对于 F2 来说，**没有具体的图表类型的概念，所有的图表都是通过组合不同的图形语法元素形成的**。

## 图形语法组成

F2 的图形语法由以下核心元素组成：

```
数据 (Data)
  ↓
度量 (Scale)
  ↓
几何标记 (Geometry) + 图形属性 (Attribute)
  ↓
坐标系 (Coordinate)
  ↓
辅助元素 (Axis, Legend, Tooltip, Guide)
```

## 数据

数据是可视化最基础的部分。F2 要求数据源为 JSON 数组格式：

```jsx
const data = [
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];
```

数据处理详细说明请参考：[数据处理](/tutorial/data.zh.md)

## 几何标记

几何标记是图表中实际看到的图形元素，如点、线、多边形等。每个几何标记对象含有多个图形属性，F2 图形语法的核心就是建立数据中的变量到图形属性的映射。

### 内置几何标记

| 几何标记 | 组件 | 图表类型 |
|----------|------|----------|
| Interval | `<Interval />` | 柱状图、条形图、直方图 |
| Line | `<Line />` | 折线图、曲线图 |
| Point | `<Point />` | 散点图、点图、气泡图 |
| Area | `<Area />` | 面积图、区间图 |
| Candlestick | `<Candlestick />` | 蜡烛图（K线图） |

### 几何标记示例

```jsx
// 柱状图
<Interval x="genre" y="sold" color="genre" />

// 折线图
<Line x="date" y="value" color="type" />

// 散点图
<Point x="weight" y="height" color="gender" size="value" />

// 面积图
<Area x="date" y="value" color="type" />
```

几何标记详细说明请参考：[Geometry](/api/chart/geometry.zh.md)

## 图形属性

图形属性控制几何标记的视觉表现。F2 提供以下四种图形属性：

| 属性 | 说明 | 示例 |
|------|------|------|
| `position` | 位置，将字段映射到 x 或 y 轴 | `x="genre", y="sold"` |
| `color` | 颜色，支持字段或函数 | `color="genre"` 或 `color={datum => datum.value > 100 ? 'red' : 'blue'}` |
| `size` | 大小，控制点的大小、线的粗细等 | `size={10}` 或 `size={datum => datum.value}` |
| `shape` | 形状，控制几何标记的形状 | `shape="circle"` 或 `shape="hollowCircle"` |

### 图形属性示例

```jsx
// 颜色映射 - 字段
<Interval x="genre" y="sold" color="genre" />

// 颜色映射 - 函数
<Point
  x="weight"
  y="height"
  color={datum => datum.weight > 70 ? 'red' : 'blue'}
/>

// 大小映射
<Point x="category" y="value" size={datum => datum.value} />

// 形状映射
<Point x="category" y="value" shape="circle" />
```

图形属性详细说明请参考：[绘图属性](/tutorial/shape-attrs.zh.md)

## 度量

度量（Scale）作为数据空间到图形属性空间的转换桥梁，每一个图形属性都对应着一个或多个度量。

### 度量类型

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| `linear` | 线性度量 | 连续数值型数据 |
| `cat` | 分类度量 | 分类数据 |
| `time` | 时间度量 | 时间日期数据 |
| `log` | 对数度量 | 指数级增长数据 |
| `pow` | 指数度量 | 需要强调差异的数据 |

### 度量配置示例

```jsx
<Chart
  data={data}
  scale={{
    sold: {
      type: 'linear',
      min: 0,
      max: 500,
      tickCount: 5,
    },
    genre: {
      type: 'cat',
    },
    date: {
      type: 'time',
      mask: 'YYYY-MM-DD',
    },
  }}
>
  {/* ... */}
</Chart>
```

度量详细说明请参考：[度量](/tutorial/scale.zh.md)

## 坐标系

坐标系描述了数据是如何映射到图形所在的平面的。一个几何标记在不同坐标系下会有不同的表现。

### 坐标系类型

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| `rect` | 直角坐标系（默认） | 柱状图、折线图、散点图等 |
| `polar` | 极坐标系 | 饼图、玫瑰图、雷达图等 |
| `helix` | 螺旋坐标系 | 特殊可视化场景 |

### 坐标系配置示例

```jsx
// 直角坐标系（默认）
<Chart data={data}>
  <Interval x="genre" y="sold" />
</Chart>

// 极坐标系 - 饼图
<Chart data={data} coord={{ type: 'polar' }}>
  <Interval x="genre" y="sold" color="genre" coord="polar" />
</Chart>

// 极坐标系 - 玫瑰图
<Chart data={data} coord={{ type: 'polar', innerRadius: 0.3 }}>
  <Interval x="genre" y="sold" color="genre" coord="polar" />
</Chart>
```

坐标系详细说明请参考：[坐标系](/tutorial/coordinate.zh.md)

## 辅助元素

辅助元素用于增强图表的可读性和可理解性，包括：

| 组件 | 说明 |
|------|------|
| `Axis` | 坐标轴，显示数据刻度和标签 |
| `Legend` | 图例，标定不同数据类型 |
| `Tooltip` | 提示框，显示详细数据信息 |
| `Guide` | 辅助标记，添加辅助线、文本等 |

### 辅助元素示例

```jsx
<Chart data={data}>
  <Axis field="genre" />
  <Axis field="sold" />
  <Interval x="genre" y="sold" color="genre" />
  <Tooltip />
  <Legend />
</Chart>
```

## 完整示例

下面是一个使用完整图形语法的示例：

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
  <Canvas context={context}>
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

### 图形语法映射

上述示例的图形语法映射关系：

| 层级 | 元素 | 说明 |
|------|------|------|
| 数据 | `data` | JSON 数组格式的销售数据 |
| 度量 | `scale` | sold 字段使用线性度量，最小值为 0 |
| 几何标记 | `<Interval />` | 使用柱状图几何标记 |
| 图形属性 | `x`, `y`, `color` | genre 映射到 x 轴，sold 映射到 y 轴，genre 映射到颜色 |
| 坐标系 | 默认 rect | 使用直角坐标系 |
| 辅助元素 | `<Axis />`, `<Tooltip />`, `<Legend />` | 添加坐标轴、提示框和图例 |

## 总结

在 F2 中，一张图表就是从数据到几何标记对象的图形属性的一个映射。理解图形语法后，你可以：

1. **灵活组合**：通过组合不同的几何标记和图形属性创建各种图表
2. **精确控制**：通过度量、坐标系等元素精确控制图表表现
3. **快速扩展**：基于图形语法快速创建新的可视化类型

## 更多内容

- [核心概念](/tutorial/understanding.zh.md)
- [数据处理](/tutorial/data.zh.md)
- [度量](/tutorial/scale.zh.md)
- [几何标记](/api/chart/geometry.zh.md)
- [绘图属性](/tutorial/shape-attrs.zh.md)
- [坐标系](/tutorial/coordinate.zh.md)
