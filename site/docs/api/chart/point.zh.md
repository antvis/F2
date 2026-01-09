---
title: 点 - Point
order: 4
---

用于绘制点图、折线图中的点等, 继承自 [几何标记 Geometry](geometry)

## Usage

```jsx
import { Canvas, Chart, Point } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Point x="genre" y="sold" />
  </Chart>
</Canvas>;
```

## Props

Point 组件继承自 Geometry，支持以下属性（包含继承的通用属性和 Point 特有属性）：

### 属性概览

| 属性名 | 类型 | 必填 | 默认值 | 描述 |
|--------|------|------|--------|------|
| x | `string` | 是 | - | x 轴的数据映射字段名 |
| y | `string` | 是 | - | y 轴的数据映射字段名 |
| color | `string` \| `object` \| `array` | 否 | - | 颜色映射，[详见下方](#color-属性) |
| size | `string` \| `object` \| `array` \| `number` | 否 | - | 大小映射，[详见下方](#size-属性) |
| shape | `string` | 否 | `'circle'` | 点形状，[可选值见下方](#shape-属性) |
| viewClip | `boolean` | 否 | `false` | 是否只显示图表区域内（两轴之间）的部分 |
| adjust | `string` | 否 | - | 数据调整方式，[可选值见下方](#adjust-属性) |
| startOnZero | `boolean` | 否 | `false` | y 轴是否需要从 0 开始 |
| animation | `object` | 否 | - | 动画配置，[详见下方](#animation-属性) |
| style | `object` | 否 | - | 图形样式，[详见下方](#style-属性) |

---

### color 属性

color 支持多种配置格式：

| 格式 | 类型 | 说明 | 示例 |
|------|------|------|------|
| 固定值 | `string` | 直接指定颜色值 | `<Point color="#1890FF" />` |
| 字段映射 | `string` | 根据数据字段自动映射 | `<Point color="category" />` |
| 数组形式 | `[string, string[]]` | `[字段, 颜色数组]` | `<Point color={["cat", ["red", "blue"]]} />` |
| 对象形式 | `object` | 详细配置，[属性见下表](#color-对象格式) | `<Point color={{ field: "cat", range: ["red", "blue"] }} />` |
| 类型指定 | `object` | 指定映射类型，[属性见下表](#color-类型格式) | `<Point color={{ type: "linear", field: "val" }} />` |

#### color 对象格式

| 属性 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| field | `string` | 是 | - | 映射的数据字段名 |
| range | `string[]` | 否 | - | 颜色范围数组 |
| callback | `(value: any, record?: any) => string` | 否 | - | 自定义颜色函数。value 为 **field 指定字段在数据中的值**，record 为完整数据对象 |

#### color 类型格式

| 属性 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| type | `'linear' \| 'category'` | 是 | - | 映射类型，[可选值见下表](#color-映射类型) |
| field | `string` | 是 | - | 映射的数据字段名 |
| range | `string[]` | 否 | - | 颜色范围数组 |

#### color 映射类型

| type 值 | 描述 |
|----------|------|
| `linear` | 线性渐变映射，颜色会渐变 |
| `category` | 分类映射，颜色离散分配 |

---

### size 属性

size 支持多种配置格式：

| 格式 | 类型 | 说明 | 示例 |
|------|------|------|------|
| 固定值 | `number` | 直接指定大小 | `<Point size={4} />` |
| 字段映射 | `string` | 根据数据字段自动映射 | `<Point size="value" />` |
| 数组形式 | `[string, number[]]` | `[字段, 大小数组]` | `<Point size={["val", [2, 4, 6]]} />` |
| 对象形式 | `object` | 详细配置，[属性见下表](#size-对象格式) | `<Point size={{ field: "val", range: [2, 10] }} />` |
| 类型指定 | `object` | 指定映射类型，[属性见下表](#size-类型格式) | `<Point size={{ type: "linear", field: "val" }} />` |

#### size 对象格式

| 属性 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| field | `string` | 是 | - | 映射的数据字段名 |
| range | `number[]` | 否 | - | 大小范围数组 |
| callback | `(value: any, record?: any) => number` | 否 | - | 自定义大小函数。value 为 **field 指定字段在数据中的值**，record 为完整数据对象 |

#### size 类型格式

| 属性 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| type | `'linear' \| 'category'` | 是 | - | 映射类型，同 [color 映射类型](#color-映射类型) |
| field | `string` | 是 | - | 映射的数据字段名 |
| range | `number[]` | 否 | - | 大小范围数组 |

---

### shape 属性

点形状可选值：

| 值 | 描述 |
|-----|------|
| `'circle'` | 圆形（默认） |
| `'hollowCircle'` | 空心圆形 |
| `'rect'` | 矩形 |

---

### style 属性

Point 组件支持的常用样式属性：

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| fill | `string` | - | 填充颜色 |
| fillOpacity | `number` | `1` | 填充透明度，范围 0-1 |
| stroke | `string` | - | 描边颜色（用于空心形状） |
| strokeWidth | `number` | - | 描边宽度 |
| strokeOpacity | `number` | `1` | 描边透明度，范围 0-1 |
| lineWidth | `number` | - | 线条宽度（线段形状时使用） |
| opacity | `number` | `1` | 整体透明度，范围 0-1 |
| shadowColor | `string` | - | 阴影颜色 |
| shadowBlur | `number` | `0` | 阴影模糊程度 |
| cursor | `string` | - | 鼠标样式 |

**使用示例**:

```jsx
// 实心圆形点
<Point
  x="genre"
  y="sold"
  style={{
    fill: '#1890FF',
    fillOpacity: 0.8
  }}
/>
```

```jsx
// 空心圆形点（带描边）
<Point
  x="genre"
  y="sold"
  shape="hollowCircle"
  style={{
    stroke: '#1890FF',
    strokeWidth: 2,
    strokeOpacity: 1
  }}
/>
```

```jsx
// 带阴影的点
<Point
  x="genre"
  y="sold"
  style={{
    fill: '#1890FF',
    shadowColor: 'rgba(0, 0, 0, 0.3)',
    shadowBlur: 8
  }}
/>
```

```jsx
// 半透明 + 描边组合
<Point
  x="genre"
  y="sold"
  shape="circle"
  style={{
    fill: '#1890FF',
    fillOpacity: 0.6,
    stroke: '#0050B3',
    strokeWidth: 1
  }}
/>
```

```jsx
// 大点 + 高透明度
<Point
  x="genre"
  y="sold"
  size={10}
  style={{
    fill: '#1890FF',
    fillOpacity: 0.4,
    opacity: 0.8
  }}
/>
```

> **更多样式属性**（如渐变、纹理、裁剪等）请参考：[绘图属性完整文档](/tutorial/shape-attrs)

---

### adjust 属性

数据调整方式可选值：

| 值 | 描述 |
|-----|------|
| `stack` | 层叠，将同一个分类的数据值累加起来 |
| `dodge` | 分组散开，将同一个分类的数据进行分组均匀分布 |
| `symmetric` | 数据对称，使生成的图形居中对齐 |

---

### animation 属性

动画配置按阶段划分，**三个阶段（appear/update/leave）支持相同的属性结构**：

| 阶段 | 属性 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|------|--------|------|
| **appear** | easing | `string` \| `function` | 否 | `'linear'` | 缓动函数，[可选值见下方](#缓动函数) |
| (元素进场) | duration | `number` | 否 | `300` | 动画时长 (ms) |
| | delay | `number` | 否 | `0` | 延迟时间 (ms) |
| | property | `string[]` | 否 | - | 变化的属性数组，如 `['x', 'y']` |
| | start | `object` | 否 | - | 起始状态，[结构见下表](#动画状态对象) |
| | end | `object` | 否 | - | 结束状态，[结构见下表](#动画状态对象) |
| **update** | easing | `string` \| `function` | 否 | `'linear'` | 缓动函数，[可选值见下方](#缓动函数) |
| (数据更新) | duration | `number` | 否 | `300` | 动画时长 (ms) |
| | delay | `number` | 否 | `0` | 延迟时间 (ms) |
| | property | `string[]` | 否 | - | 变化的属性数组，如 `['x', 'y']` |
| | start | `object` | 否 | - | 起始状态，[结构见下表](#动画状态对象) |
| | end | `object` | 否 | - | 结束状态，[结构见下表](#动画状态对象) |
| **leave** | easing | `string` \| `function` | 否 | `'linear'` | 缓动函数，[可选值见下方](#缓动函数) |
| (元素离场) | duration | `number` | 否 | `300` | 动画时长 (ms) |
| | delay | `number` | 否 | `0` | 延迟时间 (ms) |
| | property | `string[]` | 否 | - | 变化的属性数组，如 `['x', 'y']` |
| | start | `object` | 否 | - | 起始状态，[结构见下表](#动画状态对象) |
| | end | `object` | 否 | - | 结束状态，[结构见下表](#动画状态对象) |

> **注意**: 三个阶段的属性结构完全相同，可根据需要单独配置某个阶段。例如只配置 `appear` 阶段可实现进场动画。

#### 动画状态对象 (start/end)

| 属性 | 类型 | 描述 |
|------|------|------|
| fillOpacity | `number` | 填充透明度，范围 0-1 |
| opacity | `number` | 整体透明度，范围 0-1 |
| x | `number` | x 坐标 |
| y | `number` | y 坐标 |
| stroke | `string` | 描边颜色 |
| lineWidth | `number` | 线宽 |

#### 缓动函数 (easing)

| 值 | 描述 |
|-----|------|
| `'linear'` | 线性 |
| `'ease-in'` / `'in'` | 加速 |
| `'ease-out'` / `'out'` | 减速 |
| `'ease-in-out'` / `'in-out'` | 先加速后减速 |
| `'ease-out-in'` / `'out-in'` | 先减速后加速 |

更多缓动函数可见：[easing 函数源码](https://github.com/antvis/F2/blob/master/packages/f2/src/canvas/animation/easing.ts)

#### 动画配置示例

**默认动画配置**（组件内置）:

```jsx
// Point 组件默认使用淡入效果
<Point x="genre" y="sold" />
// 内置配置: { appear: { easing: 'linear', duration: 450 }, update: { easing: 'linear', duration: 450, property: ['cx', 'cy', 'r', 'fill'] } }
```

**从零缩放进场效果**:

```jsx
// 点从小到大出现
<Point
  x="genre"
  y="sold"
  animation={{
    appear: {
      easing: 'ease-out',
      duration: 600,
      property: ['r'],
      start: { r: 0 },
      end: { r: 5 }
    }
  }}
/>
```

**淡入 + 位移效果**:

```jsx
// 点从透明到不透明，同时从下方滑入
<Point
  x="genre"
  y="sold"
  animation={{
    appear: {
      easing: 'ease-out',
      duration: 800,
      property: ['opacity', 'cy'],
      start: { opacity: 0, cy: 0 },
      end: { opacity: 1, cy: null } // cy: null 表示使用目标值
    }
  }}
/>
```

**弹性缩放效果**:

```jsx
// 使用 spring 效果的弹性动画
<Point
  x="genre"
  y="sold"
  shape="circle"
  animation={{
    appear: {
      easing: 'ease-out-elastic',
      duration: 1000,
      property: ['r'],
      start: { r: 0 },
      end: { r: 8 }
    }
  }}
/>
```

**配置多个动画阶段**:

```jsx
<Point
  x="genre"
  y="sold"
  animation={{
    appear: {
      easing: 'ease-out',
      duration: 600,
      property: ['r'],
      start: { r: 0 },
      end: { r: 5 }
    },
    update: {
      easing: 'ease-in-out',
      duration: 400,
      property: ['cx', 'cy']
    },
    leave: {
      easing: 'ease-in',
      duration: 300,
      property: ['opacity', 'r'],
      end: { opacity: 0, r: 0 }
    }
  }}
/>
```

**禁用动画**:

```jsx
<Point
  x="genre"
  y="sold"
  animation={false}
/>
```

---

## 方法

几何标记统一方法 详见：[几何标记](geometry#方法)
