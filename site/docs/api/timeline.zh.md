---
title: 时间轴 - Timeline
order: 3
redirect_from:
  - /zh/docs/api
---

Timeline 组件用于创建按时间顺序播放的动画序列，让子组件依次显示。常用于动态排名变化、时间序列数据展示等场景。

## 何时使用

- 需要按时间顺序展示多个数据帧
- 创建动态排名变化的动画效果
- 展示数据随时间演变的趋势
- 需要控制动画播放的顺序和节奏

## TypeScript 类型定义

```typescript
interface TimelineProps {
  /** 起始索引，从第几个子组件开始播放 */
  start?: number;
  /** 组件播放的延迟时间（毫秒） */
  delay?: number;
  /** 是否自动循环播放 */
  loop?: boolean;
  /** 是否自动播放（内部使用） */
  autoPlay?: boolean;
  /** 子组件 */
  children?: any;
}
```

## Usage

```jsx
import { Canvas, Chart, Interval, Axis, Timeline } from '@antv/f2';

// 准备多个时间点的数据
const data = [
  [
    { genre: 'Sports', sold: 5 },
    { genre: 'Strategy', sold: 10 },
    { genre: 'Action', sold: 20 },
  ],
  [
    { genre: 'Sports', sold: 50 },
    { genre: 'Strategy', sold: 5 },
    { genre: 'Action', sold: 2 },
  ],
  [
    { genre: 'Sports', sold: 15 },
    { genre: 'Strategy', sold: 30 },
    { genre: 'Action', sold: 25 },
  ],
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Timeline delay={1000}>
    {data.map((frameData) => (
      <Chart data={frameData}>
        <Axis field="genre" />
        <Axis field="sold" />
        <Interval x="genre" y="sold" color="genre" />
      </Chart>
    ))}
  </Timeline>
</Canvas>
```

## Props

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `delay` | `number` | `0` | 每个组件播放的延迟时间（毫秒） |
| `start` | `number` | `0` | 从第几个子组件开始播放（索引从 0 开始） |
| `loop` | `boolean` | `false` | 是否自动循环播放 |
| `autoPlay` | `boolean` | - | 是否自动播放（通常不需要手动设置） |
| `children` | `any` | - | 子组件，通常为多个 Chart 或 Component |

## 用法示例

### 基础时间轴播放

让多个图表依次播放：

```jsx
const data = [
  { genre: 'Sports', sold: 5 },
  { genre: 'Strategy', sold: 10 },
  { genre: 'Action', sold: 20 },
  { genre: 'Shooter', sold: 40 },
];

const frames = [data, [...data].reverse(), data];

<Canvas context={context}>
  <Timeline delay={500}>
    {frames.map((frameData, index) => (
      <Chart key={index} data={frameData}>
        <Axis field="genre" />
        <Interval x="genre" y="sold" color="genre" />
      </Chart>
    ))}
  </Timeline>
</Canvas>
```

### 动态排名变化

展示随时间变化的排名动画：

```jsx
const timelineData = [
  [
    { name: 'A', value: 10 },
    { name: 'B', value: 20 },
    { name: 'C', value: 30 },
  ],
  [
    { name: 'A', value: 35 },
    { name: 'B', value: 15 },
    { name: 'C', value: 25 },
  ],
  [
    { name: 'A', value: 40 },
    { name: 'B', value: 30 },
    { name: 'C', value: 10 },
  ],
];

<Canvas context={context}>
  <Timeline delay={1000}>
    {timelineData.map((data, index) => {
      const sorted = [...data].sort((a, b) => a.value - b.value);
      return (
        <Chart key={index} data={sorted} coord={{ transposed: true }}>
          <Axis field="name" />
          <Interval x="name" y="value" color="name" />
        </Chart>
      );
    })}
  </Timeline>
</Canvas>
```

### 从指定位置开始播放

使用 `start` 属性从特定帧开始：

```jsx
<Canvas context={context}>
  <Timeline delay={800} start={2}>
    {dataFrames.map((frame, index) => (
      <Chart key={index} data={frame}>
        <Interval x="x" y="y" />
      </Chart>
    ))}
  </Timeline>
</Canvas>
```

### 循环播放

设置 `loop` 为 true 实现循环播放：

```jsx
<Canvas context={context}>
  <Timeline delay={1000} loop={true}>
    {frames.map((frame, index) => (
      <Chart key={index} data={frame}>
        <Line x="date" y="value" />
      </Chart>
    ))}
  </Timeline>
</Canvas>
```

### 折线图时间演变

展示数据随时间的演变：

```jsx
const yearlyData = [
  { year: '2020', value: 100 },
  { year: '2021', value: 150 },
  { year: '2022', value: 200 },
  { year: '2023', value: 180 },
];

// 创建累积数据帧
const frames = yearlyData.map((_, i) => yearlyData.slice(0, i + 1));

<Canvas context={context}>
  <Timeline delay={600}>
    {frames.map((frame, index) => (
      <Chart key={index} data={frame}>
        <Axis field="year" />
        <Axis field="value" />
        <Line x="year" y="value" />
        <Point x="year" y="value" />
      </Chart>
    ))}
  </Timeline>
</Canvas>
```

### 无延迟连续播放

设置 `delay={0}` 实现连续播放：

```jsx
<Canvas context={context}>
  <Timeline delay={0}>
    {frames.map((frame, index) => (
      <Chart key={index} data={frame}>
        <Interval x="category" y="value" animation={{ duration: 300 }} />
      </Chart>
    ))}
  </Timeline>
</Canvas>
```

## 常见问题

### Timeline 不播放

确保 `delay` 属性设置正确，且子组件支持动画：

```jsx
// 错误：delay 设置过大
<Timeline delay={60000}>

// 正确：设置合理的 delay
<Timeline delay={1000}>
```

### 子组件动画不生效

确保子组件配置了正确的 animation 属性：

```jsx
<Timeline delay={500}>
  <Chart data={data}>
    {/* 确保组件有动画配置 */}
    <Interval
      x="genre"
      y="sold"
      animation={{
        appear: {
          duration: 500,
          easing: 'linear',
        },
        update: {
          duration: 500,
        },
      }}
    />
  </Chart>
</Timeline>
```

### 从指定帧开始不生效

检查 `start` 的值是否在有效范围内（0 到子组件数量 - 1）：

```jsx
// 如果有 5 个子组件，start 的有效范围是 0-4
<Timeline delay={1000} start={2}>  {/* 正确 */}
<Timeline delay={1000} start={10}> {/* 错误：超出范围 */}
```

### 循环播放时卡顿

调整 `delay` 值和子组件动画时长，使其匹配：

```jsx
<Timeline delay={500} loop={true}>
  <Chart data={data}>
    {/* 动画时长应与 delay 匹配 */}
    <Interval
      x="x"
      y="y"
      animation={{ duration: 500 }}
    />
  </Chart>
</Timeline>
```

### 多个 Timeline 同时存在

一个 Canvas 中建议只使用一个 Timeline 组件：

```jsx
// 推荐：使用单个 Timeline
<Canvas context={context}>
  <Timeline delay={1000}>
    {frames.map((frame) => (
      <Chart data={frame}>
        <Interval x="x" y="y" />
        <Line x="x" y="y" />
      </Chart>
    ))}
  </Timeline>
</Canvas>
```

## 注意事项

1. **组件来源**：Timeline 组件来自 `@antv/f-engine`，F2 通过 `export * from '@antv/f-engine'` 重新导出
2. **动画配置**：子组件需要配置 animation 属性才能实现平滑过渡
3. **delay 单位**：delay 的单位是毫秒，建议设置在 500-2000 之间
4. **性能考虑**：大量数据帧可能影响性能，建议控制在合理范围内
5. **key 属性**：子组件应设置唯一的 key 属性以优化渲染性能
