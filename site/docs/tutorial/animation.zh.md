---
title: 动画属性 - Animation
order: 8
---

F2 动画定义与 [Web Animations API](https://developer.mozilla.org/zh-CN/docs/Web/API/Web_Animations_API) 靠齐，除了组件层面，每个图形标签也都可以添加自定义动画。目前只支持基于 Keyframe 的动画，可定义动画执行阶段，以及变化效果 KeyframeEffect。

## 动画执行阶段

动画执行阶段分为 appear、update 以及 leave：

| 阶段 | 说明 | 触发时机 |
|------|------|----------|
| `appear` | 初始化时的入场动画 | render 阶段 |
| `update` | 数据更新时的更新动画 | props 发生改变 |
| `leave` | 销毁前的离场动画 | destroy 阶段 |

每个阶段都可以配置相应的 animation。

## Animation 属性

### 基础属性

| 属性 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `easing` | `string` | `'linear'` | 缓动函数，动画持续效果 |
| `duration` | `number` | - | 动画持续时间（毫秒） |
| `delay` | `number` | `0` | 开始动画前的延迟（毫秒） |
| `fill` | `string` | `'none'` | 定义图形在动画执行前后的表现，可选值：`'none'`、`'forwards'`、`'backwards'`、`'both'` |
| `iterations` | `number` | `1` | 循环次数，`Infinity` 为无限循环 |
| `iterationStart` | `number` | `0` | 从何处执行动画 |
| `property` | `string[]` | - | 声明需要变换的属性 |
| `start` | `Keyframe` | - | 开始帧状态 |
| `end` | `Keyframe` | - | 结束帧状态 |
| `clip` | `Clip` | - | 裁剪区域动画，见[裁剪](/tutorial/shape-attrs.zh.md#裁剪) |

### easing 缓动函数

缓动函数，默认为 `linear`，并且内置提供以下缓动函数，可参考[效果](https://easings.net/)：

| 恒速 | 加速 | 减速 | 加速-减速 | 减速-加速 |
|------|------|------|-----------|-----------|
| `linear` | `ease-in` / `in` | `ease-out` / `out` | `ease-in-out` / `in-out` | `ease-out-in` / `out-in` |
| `ease` | `in-sine` | `out-sine` | `in-out-sine` | `out-in-sine` |
| `steps` | `in-quad` | `out-quad` | `in-out-quad` | `out-in-quad` |
| `step-start` | `in-cubic` | `out-cubic` | `in-out-cubic` | `out-in-cubic` |
| `step-end` | `in-quart` | `out-quart` | `in-out-quart` | `out-in-quart` |
| - | `in-quint` | `out-quint` | `in-out-quint` | `out-in-quint` |
| - | `in-expo` | `out-expo` | `in-out-expo` | `out-in-expo` |
| - | `in-circ` | `out-circ` | `in-out-circ` | `out-in-circ` |
| - | `in-back` | `out-back` | `in-out-back` | `out-in-back` |
| - | `in-bounce` | `out-bounce` | `in-out-bounce` | `out-in-bounce` |
| - | `in-elastic` | `out-elastic` | `in-out-elastic` | `out-in-elastic` |
| - | `spring` / `spring-in` | `spring-out` | `spring-in-out` | `spring-out-in` |

### Keyframe 支持的属性

目前支持变换的属性：

| 属性 | 类型 | 说明 |
|------|------|------|
| `transform` | `string` | 和 [CSS Transform](https://developer.mozilla.org/zh-CN/docs/Web/CSS/transform) 保持一致 |
| `opacity` | `number` | 透明度 |
| `strokeOpacity` | `number` | 描边透明度 |
| `fill` | `string` | 填充色 |
| `stroke` | `string` | 描边色 |
| `lineWidth` | `number` | 线宽 |
| `r` | `number` | Circle 的半径 |
| `rx` | `number` | Ellipse 的 x 半径 |
| `ry` | `number` | Ellipse 的 y 半径 |
| `width` | `number` | Rect/Image 的宽度 |
| `height` | `number` | Rect/Image 的高度 |
| `x` | `number` | 位置 x 坐标 |
| `y` | `number` | 位置 y 坐标 |
| `x1` | `number` | Line 的起点 x 坐标 |
| `y1` | `number` | Line 的起点 y 坐标 |
| `x2` | `number` | Line 的终点 x 坐标 |
| `y2` | `number` | Line 的终点 y 坐标 |
| `offsetDistance` | `number` | 路径偏移，和 [CSS Offset](https://developer.mozilla.org/en-US/docs/Web/CSS/offset-distance) 保持一致 |
| `lineDash` | `number[]` | 实线和间隔的长度 |
| `lineDashOffset` | `number` | 虚线的偏移量，可实现蚂蚁线效果 |
| `path` | `string` | Path 的定义，可做形变动画 |

## 基础用法

### 入场动画

```jsx
<text
  style={{
    text: '测试',
    x: 100,
    y: 100,
  }}
  animation={{
    appear: {
      easing: 'linear',
      duration: 450,
      property: ['x', 'y'],
      start: {
        x: 0,
        y: 0,
      },
      end: {
        x: 100,
        y: 100,
      },
    },
  }}
/>
```

### 更新动画

```jsx
<rect
  style={{
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    fill: 'blue',
  }}
  animation={{
    appear: {
      easing: 'linear',
      duration: 450,
      property: ['width', 'height'],
      start: {
        width: 0,
        height: 0,
      },
      end: {
        width: 50,
        height: 50,
      },
    },
    update: {
      easing: 'ease-in-out',
      duration: 300,
      property: ['fill'],
      start: {
        fill: 'blue',
      },
      end: {
        fill: 'red',
      },
    },
  }}
/>
```

### 离场动画

```jsx
<circle
  style={{
    cx: 100,
    cy: 100,
    r: 50,
    fill: 'green',
  }}
  animation={{
    leave: {
      easing: 'ease-out',
      duration: 500,
      property: ['opacity', 'r'],
      start: {
        opacity: 1,
        r: 50,
      },
      end: {
        opacity: 0,
        r: 0,
      },
    },
  }}
/>
```

### 多属性动画

```jsx
<rect
  style={{
    x: 50,
    y: 50,
    width: 100,
    height: 100,
    fill: '#1890ff',
  }}
  animation={{
    appear: {
      easing: 'ease-in-out',
      duration: 1000,
      property: ['x', 'y', 'width', 'height', 'opacity'],
      start: {
        x: 100,
        y: 100,
        width: 0,
        height: 0,
        opacity: 0,
      },
      end: {
        x: 50,
        y: 50,
        width: 100,
        height: 100,
        opacity: 1,
      },
    },
  }}
/>
```

### 变换动画

```jsx
<rect
  style={{
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    fill: 'red',
    transformOrigin: 'center',
  }}
  animation={{
    appear: {
      easing: 'linear',
      duration: 2000,
      property: ['transform'],
      start: {
        transform: 'rotate(0deg) scale(1)',
      },
      end: {
        transform: 'rotate(360deg) scale(1.5)',
      },
    },
  }}
/>
```

### 裁剪动画

```jsx
<text
  style={{
    text: '裁剪动画',
    x: 100,
    y: 100,
  }}
  animation={{
    appear: {
      easing: 'linear',
      duration: 1000,
      clip: {
        type: 'rect',
        property: ['width'],
        style: {
          x: 100,
          y: 100,
          height: 20,
        },
        start: {
          width: 0,
        },
        end: {
          width: 100,
        },
      },
    },
  }}
/>
```

### 循环动画

```jsx
<circle
  style={{
    cx: 100,
    cy: 100,
    r: 30,
    fill: 'blue',
  }}
  animation={{
    appear: {
      easing: 'ease-in-out',
      duration: 1000,
      iterations: Infinity, // 无限循环
      property: ['r'],
      start: {
        r: 20,
      },
      end: {
        r: 40,
      },
    },
  }}
/>
```

### 延迟动画

```jsx
<rect
  style={{
    x: 100,
    y: 100,
    width: 50,
    height: 50,
    fill: 'green',
  }}
  animation={{
    appear: {
      easing: 'linear',
      duration: 500,
      delay: 1000, // 延迟 1 秒开始
      property: ['opacity'],
      start: {
        opacity: 0,
      },
      end: {
        opacity: 1,
      },
    },
  }}
/>
```

## 路径动画

让图形沿着某个路径移动，在 CSS 中可通过 [MotionPath](https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_Motion_Path) 实现，F2 可通过图形标签上设置 offset 属性实现，目前支持 `<line/>` 和 `<polyline/>`。

### 基础路径动画

```jsx
<circle
  style={{
    fill: '#808080',
    r: 10,
    offset: {
      type: 'polyline',
      style: {
        points: [
          [0, 3],
          [50, 10],
          [130, 80],
          [250, 40],
        ],
      },
    },
  }}
  animation={{
    appear: {
      easing: 'ease-out',
      duration: 1000,
      property: ['offsetDistance'],
      start: {
        offsetDistance: 0,
      },
      end: {
        offsetDistance: 1,
      },
    },
  }}
/>
```

### Line 组件路径动画

F2 在组件 Line 中内置了该功能，提供 `endView` 接口，可设置沿着线段移动的元素，具体可见 [demo](/examples/creative/case/#line-race)。

## TypeScript 类型定义

```typescript
interface Animation {
  appear?: AnimationConfig
  update?: AnimationConfig | AnimationConfig[]
  leave?: AnimationConfig
}

interface AnimationConfig {
  easing?: string
  duration?: number
  delay?: number
  fill?: 'none' | 'forwards' | 'backwards' | 'both'
  iterations?: number
  iterationStart?: number
  property?: string[]
  start?: Keyframe
  end?: Keyframe
  clip?: ClipAnimation
}

interface Keyframe {
  transform?: string
  opacity?: number
  strokeOpacity?: number
  fill?: string
  stroke?: string
  lineWidth?: number
  r?: number
  rx?: number
  ry?: number
  width?: number
  height?: number
  x?: number
  y?: number
  x1?: number
  y1?: number
  x2?: number
  y2?: number
  offsetDistance?: number
  lineDash?: number[]
  lineDashOffset?: number
  path?: string
}

interface ClipAnimation {
  type: 'circle' | 'rect' | 'polygon'
  property?: string[]
  style: Record<string, any>
  start?: Record<string, any>
  end?: Record<string, any>
}
```

## 常见问题

### 如何让动画无限循环？

设置 `iterations: Infinity`：

```jsx
animation={{
  appear: {
    easing: 'linear',
    duration: 2000,
    iterations: Infinity,
    property: ['opacity'],
    start: { opacity: 0 },
    end: { opacity: 1 },
  },
}}
```

### 如何让动画结束时保持最终状态？

设置 `fill: 'forwards'`：

```jsx
animation={{
  appear: {
    easing: 'linear',
    duration: 1000,
    fill: 'forwards',
    property: ['x'],
    start: { x: 0 },
    end: { x: 100 },
  },
}}
```

### 如何创建弹簧动画效果？

使用 `spring` 系列缓动函数：

```jsx
animation={{
  appear: {
    easing: 'spring',
    duration: 1000,
    property: ['x'],
    start: { x: 0 },
    end: { x: 100 },
  },
}}
```

### 如何同时动画多个属性？

在 `property` 数组中声明多个属性：

```jsx
animation={{
  appear: {
    easing: 'ease-in-out',
    duration: 1000,
    property: ['x', 'y', 'width', 'height', 'opacity'],
    start: {
      x: 100,
      y: 100,
      width: 0,
      height: 0,
      opacity: 0,
    },
    end: {
      x: 50,
      y: 50,
      width: 100,
      height: 100,
      opacity: 1,
    },
  },
}}
```

## 相关文档

- [图形标签](/tutorial/shape.zh.md)
- [绘图属性](/tutorial/shape-attrs.zh.md)
- [图形事件](/tutorial/event.zh.md)
- [图形使用](/tutorial/graphic.zh.md)
