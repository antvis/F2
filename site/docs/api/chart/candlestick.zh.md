---
title: K 线图 - Candlestick
order: 5
---

用于 K 线图, 继承自 [几何标记 Geometry](geometry)

## Usage

```jsx
import { Axis, Candlestick, Canvas, Chart, jsx } from '@antv/f2';

const data = [
  {
    time: '2017-10-24',
    // 格式为：[open, close, lowest, highest]
    value: [20, 34, 10, 38],
  },
  {
    time: '2017-10-25',
    value: [40, 35, 30, 50],
  },
  {
    time: '2017-10-26',
    value: [31, 38, 33, 44],
  },
  {
    time: '2017-10-27',
    value: [38, 15, 5, 42],
  },
];

const { props } = (
  <Canvas context={context}>
    <Chart data={data}>
      <Axis field="time" />
      <Axis field="value" />
      <Candlestick x="time" y="value" />
    </Chart>
  </Canvas>
);
```

## 数据结构说明

y 轴字段格式为：`[open, close, lowest, highest]` 分别代表：`[开盘价, 收盘价, 最低价, 最高价]`

## Props

Candlestick 组件继承自 Geometry，支持以下属性（包含继承的通用属性和 Candlestick 特有属性）：

### 属性概览

| 属性名 | 类型 | 必填 | 默认值 | 描述 |
|--------|------|------|--------|------|
| x | `string` | 是 | - | x 轴的数据映射字段名 |
| y | `string` | 是 | - | y 轴的数据映射字段名 |
| color | `object` | 否 | `{ range: ['#E62C3B', '#0E9976', '#999999'] }` | 涨跌颜色，[详见下方](#color-属性) |
| sizeRatio | `number` | 否 | `0.5` | 矩形大小比例，范围 [0, 1] |
| viewClip | `boolean` | 否 | `false` | 是否只显示图表区域内（两轴之间）的部分 |
| startOnZero | `boolean` | 否 | `false` | y 轴是否需要从 0 开始 |
| animation | `object` | 否 | - | 动画配置，[详见下方](#animation-属性) |
| style | `object` | 否 | - | 图形样式，[详见下方](#style-属性) |

---

### color 属性

Candlestick 的 color 用于设置「涨」、「跌」、「平盘」三种状态的颜色。

**仅支持对象形式**，通过 `range` 属性指定三种颜色：

| 属性 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|--------|------|
| range | `[string, string, string]` | 否 | `['#E62C3B', '#0E9976', '#999999']` | `[上涨颜色, 下跌颜色, 平盘颜色]` |

> **注意**：Candlestick 的 color 仅支持 `range` 属性，不支持 `field`、`callback` 等其他属性。组件会根据价格变动自动选择对应的颜色。

```jsx
// 自定义涨跌颜色
<Candlestick
  x="time"
  y="value"
  color={{ range: ['#ff4d4f', '#52c41a', '#d9d9d9'] }} // 红涨、绿跌、灰平
/>
```

---

### sizeRatio 属性

矩形的大小比例，范围 `[0, 1]`，默认为 `0.5`，表示矩形的宽度占可用空间的 50%。

| 值 | 效果 |
|-----|------|
| `0.5` (默认) | 矩形宽度和空白处各占 50% |
| `0.8` | 矩形更宽，空白更窄 |
| `1.0` | 矩形占满整个空间，无间隙 |

```jsx
<Candlestick x="time" y="value" sizeRatio={0.8} />
```

---

### style 属性

Candlestick 组件支持的常用样式属性：

| 属性名 | 类型 | 默认值 | 描述 |
|--------|------|--------|------|
| fill | `string` | - | 填充颜色（K线实体颜色） |
| fillOpacity | `number` | `1` | 填充透明度，范围 0-1 |
| stroke | `string` | - | 描边颜色（K线影线颜色） |
| strokeWidth | `number` | `2` | 描边宽度（影线宽度） |
| strokeOpacity | `number` | `1` | 描边透明度，范围 0-1 |
| radius | `string` \| `number[]` | `'2px'` | 实体矩形圆角半径 |
| lineCap | `'butt'` \| `'round'` \| `'square'` | `'round'` | 影线端点样式 |
| opacity | `number` | `1` | 整体透明度，范围 0-1 |
| shadowColor | `string` | - | 阴影颜色 |
| shadowBlur | `number` | `0` | 阴影模糊程度 |
| cursor | `string` | - | 鼠标样式 |

**使用示例**:

```jsx
// 自定义涨跌颜色
<Candlestick
  x="time"
  y="value"
  color={{ range: ['#E62C3B', '#0E9976', '#999999'] }}
/>
// color 属性已控制涨跌色，style 可用于其他样式
```

```jsx
// 设置圆角矩形
<Candlestick
  x="time"
  y="value"
  style={{
    radius: '2px'
  }}
/>
```

```jsx
// 调整影线宽度
<Candlestick
  x="time"
  y="value"
  style={{
    strokeWidth: 1,  // 更细的影线
    strokeOpacity: 0.8
  }}
/>
```

```jsx
// 半透明效果
<Candlestick
  x="time"
  y="value"
  style={{
    fillOpacity: 0.7,
    strokeOpacity: 0.8,
    opacity: 0.9
  }}
/>
```

```jsx
// 渐变填充（K线实体）
<Candlestick
  x="time"
  y="value"
  style={{
    fill: 'linear-gradient(180deg, rgba(230, 44, 59, 0.8), rgba(230, 44, 59, 0.4))',
    stroke: '#E62C3B'
  }}
/>
```

```jsx
// 带阴影效果
<Candlestick
  x="time"
  y="value"
  style={{
    shadowColor: 'rgba(0, 0, 0, 0.2)',
    shadowBlur: 6
  }}
/>
```

> **更多样式属性**（如渐变、纹理、裁剪等）请参考：[绘图属性完整文档](/tutorial/shape-attrs)
>
> **注意**: Candlestick 的 `color` 属性专门用于控制涨跌颜色，`style.fill` 会覆盖此设置。建议使用 `color` 属性设置涨跌色，`style` 仅用于其他样式效果（如圆角、阴影、透明度等）。

---

### animation 属性

动画配置按阶段划分，**三个阶段（appear/update/leave）支持相同的属性结构**：

| 阶段 | 属性 | 类型 | 必填 | 默认值 | 描述 |
|------|------|------|------|--------|------|
| **appear** | easing | `string` \| `function` | 否 | `'linear'` | 缓动函数，[可选值见下方](#缓动函数) |
| (元素进场) | duration | `number` | 否 | `300` | 动画时长 (ms) |
| | delay | `number` | 否 | `0` | 延迟时间 (ms) |
| | property | `string[]` | 否 | - | 变化的属性数组 |
| | start | `object` | 否 | - | 起始状态，[结构见下表](#动画状态对象) |
| | end | `object` | 否 | - | 结束状态，[结构见下表](#动画状态对象) |
| **update** | easing | `string` \| `function` | 否 | `'linear'` | 缓动函数 |
| (数据更新) | duration | `number` | 否 | `300` | 动画时长 (ms) |
| | delay | `number` | 否 | `0` | 延迟时间 (ms) |
| | property | `string[]` | 否 | - | 变化的属性数组 |
| | start | `object` | 否 | - | 起始状态 |
| | end | `object` | 否 | - | 结束状态 |
| **leave** | easing | `string` \| `function` | 否 | `'linear'` | 缓动函数 |
| (元素离场) | duration | `number` | 否 | `300` | 动画时长 (ms) |
| | delay | `number` | 否 | `0` | 延迟时间 (ms) |
| | property | `string[]` | 否 | - | 变化的属性数组 |
| | start | `object` | 否 | - | 起始状态 |
| | end | `object` | 否 | - | 结束状态 |

> **注意**: 三个阶段的属性结构完全相同，可根据需要单独配置某个阶段。Candlestick 由影线（line）和实体（rect）两部分组成，动画会同时作用于这两部分。

#### 动画状态对象 (start/end)

| 属性 | 类型 | 描述 |
|------|------|------|
| fillOpacity | `number` | 填充透明度，范围 0-1 |
| opacity | `number` | 整体透明度，范围 0-1 |
| x | `number` | x 坐标 |
| y | `number` | y 坐标 |
| stroke | `string` | 描边颜色 |
| lineWidth | `number` | 线宽 |
| height | `number` | 矩形高度（Candlestick 特有） |

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
// Candlestick 组件默认使用从底部向上生长的效果
<Candlestick x="time" y="value" />
// 内置配置: { appear: { easing: 'linear', duration: 300, property: ['y', 'height'], start: { y: y0, height: 0 } } }
```

**自定义生长动画**:

```jsx
// 使用减速效果，更自然的生长感
<Candlestick
  x="time"
  y="value"
  animation={{
    appear: {
      easing: 'ease-out',
      duration: 600,
      property: ['y', 'height'],
      start: { height: 0 }
    }
  }}
/>
```

**淡入效果**:

```jsx
// K线淡入显示
<Candlestick
  x="time"
  y="value"
  animation={{
    appear: {
      easing: 'ease-out',
      duration: 800,
      property: ['opacity'],
      start: { opacity: 0 },
      end: { opacity: 1 }
    }
  }}
/>
```

**仅影线动画**:

```jsx
// 只对上下影线应用动画
<Candlestick
  x="time"
  y="value"
  animation={{
    appear: {
      easing: 'linear',
      duration: 500,
      property: ['y1', 'y2'], // 影线的 y1, y2 属性
      start: { y1: 0, y2: 0 }
    }
  }}
/>
```

**配置多个动画阶段**:

```jsx
<Candlestick
  x="time"
  y="value"
  animation={{
    appear: {
      easing: 'ease-out',
      duration: 600,
      property: ['y', 'height'],
      start: { height: 0 }
    },
    update: {
      easing: 'linear',
      duration: 300,
      property: ['x', 'y', 'width', 'height']
    },
    leave: {
      easing: 'ease-in',
      duration: 300,
      property: ['opacity', 'height'],
      end: { opacity: 0, height: 0 }
    }
  }}
/>
```

**禁用动画**:

```jsx
<Candlestick
  x="time"
  y="value"
  animation={false}
/>
```

## 方法
