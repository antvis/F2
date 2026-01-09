---
title: 几何标记 - Geometry
order: 1
---

## 文档说明

本文档作为几何标记组件的**概览和导航**：

- **属性详细说明**：请查看各组件文档（已包含完整的通用属性说明）
- **统一方法说明**：见下方[统一方法](#统一方法)章节
- **设计理念**：见下方[设计理念](#设计理念)章节

> **设计说明**：为了方便查阅，每个几何标记组件的文档都包含了完整的属性说明（包括继承的通用属性和组件特有属性），无需跨页跳转。

---

## 概述

几何标记是 F2 图表中用于数据可视化的图形组件，负责将数据映射为具体的图形元素（线、点、区间等）。所有几何标记组件（Line、Interval、Point、Area、Candlestick）都继承自 Geometry 基类。

### 架构图

F2 基本组成部分如下图所示：

![](https://gw.alipayobjects.com/zos/rmsportal/tpfdzWDYmxzHkquTihJe.png)

### 继承关系

以下几何标记组件都继承自 Geometry，共享相同的属性和方法：

| 组件 | 说明 | 文档 |
|------|------|------|
| **Line** | 折线图、曲线图、阶梯线图 | [查看详细文档](line) |
| **Interval** | 柱状图、直方图、饼图、环形图、漏斗图 | [查看详细文档](interval) |
| **Point** | 散点图、气泡图 | [查看详细文档](point) |
| **Area** | 面积图、层叠面积图 | [查看详细文档](area) |
| **Candlestick** | K线图、股票图 | [查看详细文档](candlestick) |

### 统一属性

所有几何标记组件都支持以下基础属性：

- **x** - x 轴的数据映射字段名
- **y** - y 轴的数据映射字段名
- **color** - 颜色映射（支持 5 种配置方式）
- **size** - 大小映射（支持 5 种配置方式）
- **animation** - 动画配置（appear/update/leave 三阶段）
- **style** - 图形样式
- **viewClip** - 是否只显示图表区域内
- **adjust** - 数据调整方式（stack/dodge/symmetric）

> **完整的属性文档请查看各组件的详细页面**，通过上方表格中的链接访问。

---

## 统一方法

所有几何标记组件都共享以下方法：

### getXScale()

获取 x 轴的 scale（比例尺）对象。

**返回值**: Scale 对象

```jsx
// 在组件实例中调用
const xScale = lineComponent.getXScale();
```

### getYScale()

获取 y 轴的 scale（比例尺）对象。

**返回值**: Scale 对象

```jsx
// 在组件实例中调用
const yScale = lineComponent.getYScale();
```

### getSnapRecords(point)

根据 canvas 坐标点获取对应图形的数据记录。

**参数**:
- `point` - `{ x: number, y: number }` 格式的坐标点对象

**返回值**: 匹配的数据记录数组

```jsx
// 获取鼠标位置对应的数据
const records = lineComponent.getSnapRecords({ x: 100, y: 200 });
console.log(records); // [{ genre: 'Sports', sold: 5 }, ...]
```

**使用场景**:
- 实现图表交互（如 Tooltip 提示框）
- 获取鼠标悬停位置的数据
- 实现自定义的点击选中功能

---

## 设计理念

### 几何标记的作用

几何标记是数据到图形的映射层，负责：

1. **数据映射** - 将数据字段映射到视觉属性（位置、颜色、大小等）
2. **图形绘制** - 根据映射结果绘制具体的图形元素
3. **动画处理** - 管理图形的进场、更新、离场动画
4. **交互支持** - 提供数据查询、坐标转换等交互能力

### 为什么有继承关系

通过继承 Geometry 基类：

1. **统一 API** - 所有图表类型使用相同的属性命名和配置方式
2. **代码复用** - 公共逻辑（如数据映射、动画）只需实现一次
3. **一致性** - 用户学习一个组件后，能快速上手其他组件

---

## 快速导航

### 按图表类型

- **折线图**: [Line 组件文档](line)
- **柱状图**: [Interval 组件文档](interval)
- **散点图**: [Point 组件文档](point)
- **面积图**: [Area 组件文档](area)
- **K线图**: [Candlestick 组件文档](candlestick)

### 按配置主题

- **颜色映射**: 各组件文档中的 [color 属性](line#color-属性)
- **动画配置**: 各组件文档中的 [animation 属性](line#animation-属性)
- **数据调整**: 各组件文档中的 [adjust 属性](line#adjust-属性)
