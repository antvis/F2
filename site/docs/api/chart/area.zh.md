---
title: 面积 - Area
order: 5
---

用于绘制区域图（面积图）、层叠区域图、区间区域图等, 继承自 [几何标记 Geometry](geometry)

## Usage

```jsx
import { Canvas, Chart, Area } from '@antv/f2';
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 20 },
  { genre: 'Other', sold: 40 },
];

<Canvas context={context}>
  <Chart data={data}>
    <Area x="genre" y="sold" />
  </Chart>
</Canvas>;
```

## Props

Area 组件继承自 Geometry，支持以下属性（包含继承的通用属性和 Area 特有属性）：

### 属性概览

| 属性名 | 类型 | 必填 | 默认值 | 描述 |
|--------|------|------|--------|------|
| x | `string` | 是 | - | x 轴的数据映射字段名 |
| y | `string` | 是 | - | y 轴的数据映射字段名 |
| color | `string` \| `object` \| `array` | 否 | - | 颜色映射，[详见下方](#color-属性) |
| size | `string` \| `object` \| `array` \| `number` | 否 | - | 大小映射，[详见下方](#size-属性) |
| viewClip | `boolean` | 否 | `false` | 是否只显示图表区域内（两轴之间）的部分 |
| adjust | `string` | 否 | - | 数据调整方式，[可选值见下方](#adjust-属性) |
| startOnZero | `boolean` | 否 | `false` | y 轴是否需要从 0 开始 |
| animation | `object` | 否 | - | 动画配置，[详见下方](#animation-属性) |
| style | `object` | 否 | - | 图形样式，[详见下方](#style-属性) |
| connectNulls | `boolean` | 否 | `false` | 是否连接空值 |

---

### color 属性

color 支持多种配置格式：

| 格式 | 类型 | 说明 | 示例 |
|------|------|------|------|
| 固定值 | `string` | 直接指定颜色值 | `<Area color="#1890FF" />` |
| 字段映射 | `string` | 根据数据字段自动映射 | `<Area color="category" />` |
| 数组形式 | `[string, string[]]` | `[字段, 颜色数组]` | `<Area color={["cat", ["red", "blue"]]} />` |
| 对象形式 | `object` | 详细配置，[属性见下表](#color-对象格式) | `<Area color={{ field: "cat", range: ["red", "blue"] }} />` |
| 类型指定 | `object` | 指定映射类型，[属性见下表](#color-类型格式) | `<Area color={{ type: "linear", field: "val" }} />` |

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
| 固定值 | `number` | 直接指定大小 | `<Area size={4} />` |
| 字段映射 | `string` | 根据数据字段自动映射 | `<Area size="value" />` |
| 数组形式 | `[string, number[]]` | `[字段, 大小数组]` | `<Area size={["val", [2, 4, 6]]} />` |
| 对象形式 | `object` | 详细配置，[属性见下表](#size-对象格式) | `<Area size={{ field: "val", range: [2, 10] }} />` |
| 类型指定 | `object` | 指定映射类型，[属性见下表](#size-类型格式) | `<Area size={{ type: "linear", field: "val" }} />` |

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

### style 属性

Area 组件支持的常用样式属性：

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| fill | `string` | - | 填充颜色，支持渐变和纹理 |
| fillOpacity | `number` | `1` | 填充透明度，范围 0-1 |
| stroke | `string` | - | 描边颜色（边框颜色） |
| strokeWidth | `number` | - | 描边宽度（边框宽度） |
| strokeOpacity | `number` | `1` | 描边透明度，范围 0-1 |
| opacity | `number` | `1` | 整体透明度，范围 0-1 |
| lineCap | `'butt'` \| `'round'` \| `'square'` | `'butt'` | 边框线条端点样式 |
| lineJoin | `'bevel'` \| `'round'` \| `'miter'` | `'miter'` | 边框线条连接样式 |
| shadowColor | `string` | - | 阴影颜色 |
| shadowBlur | `number` | `0` | 阴影模糊程度 |
| cursor | `string` | - | 鼠标样式 |

**使用示例**:

```jsx
// 设置填充颜色
<Area
  x="genre"
  y="sold"
  style={{
    fill: '#1890FF',
    fillOpacity: 0.6
  }}
/>
```

```jsx
// 带边框的面积图
<Area
  x="genre"
  y="sold"
  style={{
    fill: '#1890FF',
    fillOpacity: 0.3,
    stroke: '#0050B3',
    strokeWidth: 2
  }}
/>
```

```jsx
// 渐变填充
<Area
  x="genre"
  y="sold"
  style={{
    fill: 'linear-gradient(180deg, #1890FF, #0050B3)',
    fillOpacity: 0.8
  }}
/>
```

```jsx
// 半透明 + 阴影效果
<Area
  x="genre"
  y="sold"
  style={{
    fill: '#1890FF',
    fillOpacity: 0.4,
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowBlur: 15
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
// Area 组件默认使用从左到右的擦除效果
<Area x="genre" y="sold" />
// 内置配置: { appear: { easing: 'quadraticOut', duration: 450 }, update: { easing: 'linear', duration: 450 } }
```

**自定义进场动画**:

```jsx
// 淡入效果
<Area
  x="genre"
  y="sold"
  animation={{
    appear: {
      easing: 'ease-out',
      duration: 1000,
      property: ['opacity'],
      start: { opacity: 0 },
      end: { opacity: 1 }
    }
  }}
/>
```

**从底部生长效果**:

```jsx
// 区域从底部向上生长
<Area
  x="genre"
  y="sold"
  animation={{
    appear: {
      easing: 'ease-out',
      duration: 800,
      property: ['y'],
      start: { y: 0 }, // 从基线开始
      end: { y: 1 }     // 生长到目标位置
    }
  }}
/>
```

**配置多个动画阶段**:

```jsx
<Area
  x="genre"
  y="sold"
  animation={{
    appear: {
      easing: 'ease-out',
      duration: 800,
      property: ['fillOpacity'],
      start: { fillOpacity: 0 },
      end: { fillOpacity: 0.6 }
    },
    update: {
      easing: 'linear',
      duration: 450,
      property: ['points']
    },
    leave: {
      easing: 'ease-in',
      duration: 500,
      property: ['opacity'],
      end: { opacity: 0 }
    }
  }}
/>
```

**禁用动画**:

```jsx
<Area
  x="genre"
  y="sold"
  animation={false}
/>
```

---

## 方法

几何标记统一方法 详见：[几何标记](geometry#方法)
