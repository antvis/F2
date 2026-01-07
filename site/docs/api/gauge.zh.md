---
title: 仪表盘 - Gauge
type: 组件
order: 5
---

Gauge 组件用于显示进度或完成度的可视化组件，常用于展示关键绩效指标（KPI）。

## 何时使用

- 需要显示单个指标的完成进度
- 展示目标值与实际值的对比
- 显示百分比或比例数据
- 需要仪表盘样式的数据展示

## TypeScript 类型定义

```typescript
interface Point {
  x: number;
  y: number;
}

interface Tick {
  /** 刻度值（弧度） */
  tickValue: number;
  /** 刻度起点坐标 */
  start: Point;
  /** 刻度终点坐标 */
  end: Point;
}

interface GaugeProps {
  /** 起始角度（弧度），默认 Math.PI */
  startAngle?: number;
  /** 结束角度（弧度），默认 Math.PI * 2 */
  endAngle?: number;
  /** 刻度数量，默认 5 */
  tickCount?: number;
  /** 刻度偏移量，相对于圆心，支持 px 单位 */
  tickOffset?: number | string;
  /** 刻度长度，支持 px 单位 */
  tickLength?: number | string;
  /** 仪表盘半径，支持像素值（如 '100px'）或数字 */
  r?: number | string;
  /** 内圆半径，默认 0 */
  r0?: number | string;
  /** 仪表盘中心点坐标 */
  center?: Point;
  /** 刻度数组（自动生成，也可手动传入） */
  ticks?: Tick[];
  /** 进度值（0-1），必填 */
  percent: number;
}
```

## Usage

```jsx
import { Canvas, Gauge } from '@antv/f2';

const data = { percent: 0.75 };

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Gauge
    center={{ x: 150, y: 150 }}
    startAngle={Math.PI}
    endAngle={Math.PI * 2}
    percent={0.75}
    r="100px"
  />
</Canvas>
```

## Props

### 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `percent` | `number` | - | 进度值，范围 0-1，必填 |
| `startAngle` | `number` | `Math.PI` | 起始角度（弧度） |
| `endAngle` | `number` | `Math.PI * 2` | 结束角度（弧度） |
| `center` | `{ x: number, y: number }` | `{ x: 150, y: 150 }` | 仪表盘中心点坐标 |

### 尺寸配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `r` | `number \| string` | `100` | 仪表盘半径，支持像素值（如 `'100px'`）或数字 |
| `r0` | `number \| string` | `0` | 内圆半径 |

### 刻度配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `tickCount` | `number` | `5` | 刻度数量 |
| `tickOffset` | `number \| string` | `-20px` | 刻度偏移量，相对于圆心 |
| `tickLength` | `number \| string` | `10px` | 刻度长度 |
| `ticks` | `Tick[]` | - | 刻度数组（通常自动生成） |

## 用法示例

### 基础仪表盘

最简单的仪表盘配置：

```jsx
<Canvas context={context}>
  <Gauge percent={0.6} />
</Canvas>
```

### 自定义角度范围

设置仪表盘的起始和结束角度：

```jsx
<Canvas context={context}>
  <Gauge
    startAngle={Math.PI * 0.8}
    endAngle={Math.PI * 2.2}
    percent={0.75}
  />
</Canvas>
```

### 半圆仪表盘

创建半圆形的仪表盘：

```jsx
<Canvas context={context}>
  <Gauge
    center={{ x: 150, y: 200 }}
    startAngle={Math.PI}
    endAngle={Math.PI * 2}
    percent={0.85}
    r="120px"
  />
</Canvas>
```

### 自定义刻度

调整刻度的数量、位置和长度：

```jsx
<Canvas context={context}>
  <Gauge
    percent={0.5}
    tickCount={10}
    tickOffset="-30px"
    tickLength="15px"
    r="100px"
  />
</Canvas>
```

### 不同尺寸的仪表盘

调整仪表盘的大小和位置：

```jsx
<Canvas context={context}>
  <Gauge
    center={{ x: 200, y: 200 }}
    percent={0.7}
    r="150px"
    r0="50px"
  />
</Canvas>
```

### 动态更新进度

通过状态更新仪表盘进度：

```jsx
function GaugeChart() {
  const [percent, setPercent] = useState(0.3);

  return (
    <Canvas context={context}>
      <Gauge percent={percent} />
      <button onClick={() => setPercent(Math.min(1, percent + 0.1))}>
        增加
      </button>
    </Canvas>
  )
}
```

### 环形仪表盘

创建带内圆的环形仪表盘：

```jsx
<Canvas context={context}>
  <Gauge
    percent={0.65}
    r="100px"
    r0="80px"
    tickCount={8}
  />
</Canvas>
```

## 常见问题

### 仪表盘不显示

确保设置了 `percent` 属性，这是必填项：

```jsx
// 错误：缺少 percent
<Gauge startAngle={Math.PI} />

// 正确：包含 percent
<Gauge percent={0.6} startAngle={Math.PI} />
```

### 进度值超出范围

`percent` 的值必须在 0-1 之间，超出范围可能导致显示异常：

```jsx
// 错误：percent 超出范围
<Gauge percent={1.5} />

// 正确：percent 在 0-1 之间
<Gauge percent={0.85} />
```

### 角度计算错误

角度使用弧度制，不是角度制：

```jsx
// 错误：使用角度制
<Gauge startAngle={180} endAngle={360} />

// 正确：使用弧度制
<Gauge startAngle={Math.PI} endAngle={Math.PI * 2} />

// 常用角度转换
// 180° = Math.PI
// 270° = Math.PI * 1.5
// 360° = Math.PI * 2
```

### 刻度位置不合适

通过 `tickOffset` 和 `tickLength` 调整刻度位置：

```jsx
<Gauge
  percent={0.7}
  tickOffset="-40px"  // 刻度距离圆心的偏移
  tickLength="20px"   // 刻度线长度
/>
```

### 仪表盘显示不全

检查 Canvas 容器大小是否足够容纳仪表盘：

```jsx
<Canvas
  context={context}
  width={300}
  height={300}
  pixelRatio={window.devicePixelRatio}
>
  <Gauge
    center={{ x: 150, y: 150 }}
    percent={0.75}
    r="100px"
  />
</Canvas>
```

## 注意事项

1. **percent 必填**：必须指定进度值（0-1 之间），否则仪表盘无法显示
2. **角度使用弧度制**：startAngle 和 endAngle 使用弧度，不是角度
3. **center 需要在 Canvas 范围内**：确保中心点坐标在 Canvas 可见区域内
4. **r 和 r0 的关系**：r 是外圆半径，r0 是内圆半径（用于创建环形效果）
5. **刻度自动生成**：ticks 数组通常自动生成，无需手动传入
