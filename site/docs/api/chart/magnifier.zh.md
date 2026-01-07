---
title: 放大镜 - Magnifier
type: 组件
order: 11
---

Magnifier 组件用于在图表上提供局部放大功能，帮助用户更清晰地查看数据细节。通过圆形放大镜显示聚焦区域的数据点。

## 何时使用

- 数据点过于密集，需要查看局部细节
- 需要放大特定区域进行详细分析
- 需要突出显示某段数据范围

## 基础示例

```jsx
import { Canvas, Chart, Line, Magnifier } from '@antv/f2';

const data = [
  { date: '2024-01-01', value: 10 },
  { date: '2024-01-02', value: 15 },
  { date: '2024-01-03', value: 8 },
  { date: '2024-01-04', value: 25 },
  { date: '2024-01-05', value: 30 },
  { date: '2024-01-06', value: 28 },
  { date: '2024-01-07', value: 35 },
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <Magnifier focusRange={[2, 5]} />
  </Chart>
</Canvas>
```

## TypeScript 类型定义

```typescript
interface MagnifierProps {
  /** 放大镜聚焦的数据范围索引 [startIndex, endIndex]，必填 */
  focusRange: [number, number];
  /** 放大镜半径，支持像素值（如 '50px'）或数字 */
  radius?: number | string;
  /** 放大镜中心位置 [x, y]，支持数字或带 px 的字符串 */
  position?: [number, number] | [string, string] ;
  /** 放大镜 X 轴偏移量 */
  offsetX?: number | string;
  /** 放大镜 Y 轴偏移量 */
  offsetY?: number | string;
  /** 放大镜内数据线条的样式配置 */
  lineStyle?: {
    [key: string]: any;
  };
  /** 放大镜外框（圆形）的样式配置，支持 circle 组件属性如 stroke、lineWidth、fill 等 */
  frameStyle?: {
    [key: string]: any;
  };
  /** 辅助线配置 */
  referenceLines?: Array<{
    /** 辅助线数据记录数组，需包含与图表 x/y 字段匹配的数据。x 字段支持特殊值 'min'（放大镜左侧）、'max'（放大镜右侧） */
    records: any[];
    /** line 组件样式（如 stroke、lineWidth、lineDash、lineCap、lineJoin、opacity 等） */
    style?: {
      [key: string]: any;
    };
  }>;
}
```

## Props

### 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `focusRange` | `[number, number]` | - | 放大镜聚焦的数据范围索引 [startIndex, endIndex]，必填 |
| `radius` | `number \| string` | `'50px'` | 放大镜半径，支持像素值（如 `'50px'`）或数字 |
| `position` | `[number, number]` | 见说明 | 放大镜中心位置。默认为 `[right - radius, top + radius]`（圆的右上角贴近画布边界），支持像素值（数字或带 px 的字符串） |

### 偏移配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `offsetX` | `number \| string` | `0` | 放大镜 X 轴偏移量 |
| `offsetY` | `number \| string` | `0` | 放大镜 Y 轴偏移量 |

### 样式配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `lineStyle` | `object` | - | 放大镜内数据线条的样式配置 |
| `frameStyle` | `object` | - | 放大镜外框（圆形）的样式配置，支持 `stroke`、`lineWidth`、`fill` 等 circle 组件属性 |

### 辅助线配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `referenceLines` | `array` | - | 辅助线配置数组，每条线包含数据点和样式 |

**referenceLines 配置**：

```typescript
interface ReferenceLine {
  /** 辅助线数据记录数组，需包含与图表 x/y 字段匹配的数据。x 字段支持特殊值 'min'（放大镜左侧）、'max'（放大镜右侧） */
  records: any[];
  /** line 组件样式（如 stroke、lineWidth、lineDash、lineCap、lineJoin、opacity 等） */
  style?: {
    [key: string]: any;
  };
}
```

**使用说明**：
- `records` 数组中的每个对象必须包含与图表 x/y 字段对应的属性
- x 字段支持特殊值：`'min'` 表示放大镜左侧起点，`'max'` 表示放大镜右侧终点
- 常用于绘制水平阈值线、警戒线、平均值线等
- 若要绘制水平线，保持 y 值固定，x 从 `'min'` 到 `'max'`

## 示例

### 基础放大镜

指定聚焦范围，显示放大镜：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <Magnifier focusRange={[3, 6]} />
  </Chart>
</Canvas>
```

### 自定义大小和位置

设置放大镜的半径和显示位置：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <Magnifier
      focusRange={[2, 5]}
      radius="80px"
      position={[350, 100]}
    />
  </Chart>
</Canvas>
```

### 使用偏移量调整位置

通过偏移量微调放大镜位置：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <Magnifier
      focusRange={[2, 5]}
      radius="60px"
      offsetX="20px"
      offsetY="-10px"
    />
  </Chart>
</Canvas>
```

### 自定义样式

设置放大镜外框和数据线条的样式：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <Magnifier
      focusRange={[2, 5]}
      frameStyle={{
        stroke: '#1890ff',
        lineWidth: '3px',
      }}
      lineStyle={{
        stroke: '#1890ff',
        lineWidth: '6px',
      }}
    />
  </Chart>
</Canvas>
```

### 添加辅助线

在放大镜中显示阈值线或警戒线。`records` 中 x 字段支持特殊值 `'min'`（起点）和 `'max'`（终点）：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <Magnifier
      focusRange={[1, 6]}
      referenceLines={[
        {
          // 绘制一条水平阈值线（y=100），从放大镜左侧延伸到右侧
          records: [
            { date: 'min', value: 100 },
            { date: 'max', value: 100 },
          ],
          style: {
            stroke: '#ff4d4f',
            lineWidth: '2px',
            lineDash: [4, 4],
          },
        },
      ]}
    />
  </Chart>
</Canvas>
```

添加多条参考线（如平均值线和警戒线）：

```jsx
const avgValue = data.reduce((sum, d) => sum + d.value, 0) / data.length;

<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <Magnifier
      focusRange={[1, 6]}
      referenceLines={[
        {
          // 平均值线
          records: [
            { date: 'min', value: avgValue },
            { date: 'max', value: avgValue },
          ],
          style: {
            stroke: '#1890ff',
            lineWidth: '2px',
            lineDash: [4, 4],
          },
        },
        {
          // 上限警戒线
          records: [
            { date: 'min', value: 120 },
            { date: 'max', value: 120 },
          ],
          style: {
            stroke: '#ff4d4f',
            lineWidth: '2px',
            lineDash: [2, 2],
          },
        },
      ]}
    />
  </Chart>
</Canvas>
```

### 多条数据对比

在放大镜中同时显示多条数据线：

```jsx
const data1 = [{ x: 1, y: 10 }, { x: 2, y: 20 }, { x: 3, y: 15 }];
const data2 = [{ x: 1, y: 8 }, { x: 2, y: 18 }, { x: 3, y: 12 }];

<Canvas context={context}>
  <Chart>
    <Line data={data1} x="x" y="y" color="#1890ff" />
    <Line data={data2} x="x" y="y" color="#52c41a" />
    <Magnifier focusRange={[1, 2]} />
  </Chart>
</Canvas>
```

### 固定位置放大镜

将放大镜固定在图表的特定位置：

```jsx
<Canvas context={context}>
  <Chart data={data}>
    <Line x="date" y="value" />
    <Magnifier
      focusRange={[0, 4]}
      radius="50px"
      position={[200, 150]}
    />
  </Chart>
</Canvas>
```

## 常见问题

### 放大镜不显示

确保设置了 `focusRange` 属性，这是必填项：

```jsx
// 错误：缺少 focusRange
<Magnifier radius="60px" />

// 正确：包含 focusRange
<Magnifier focusRange={[2, 5]} radius="60px" />
```

### 放大镜位置不在预期位置

检查 `position` 和 `offsetX/offsetY` 的值。注意 position 是放大镜**中心点**的位置：

```jsx
// 如果希望放大镜在指定位置
<Magnifier
  focusRange={[2, 5]}
  position={[400, 100]}
/>
```

### 放大镜显示的数据不对

检查 `focusRange` 的索引是否正确。索引从 0 开始，表示数据在数组中的位置：

```jsx
// 假设数据有 10 条
// focusRange={[0, 4]} 显示前 5 条（索引 0-4）
// focusRange={[5, 9]} 显示后 5 条（索引 5-9）
<Magnifier focusRange={[0, 4]} />
```

### 辅助线不显示

确保 `referenceLines` 中的 `records` 包含正确格式的数据，并且数据字段与图表的 x/y 字段匹配：

```jsx
// 正确：使用特殊值 'min' 和 'max' 绘制水平阈值线
<Magnifier
  focusRange={[1, 5]}
  referenceLines={[
    {
      records: [
        { date: 'min', value: 100 },  // 起点：放大镜左侧，y=100
        { date: 'max', value: 100 },  // 终点：放大镜右侧，y=100
      ],
      style: { stroke: '#ff4d4f' },
    },
  ]}
/>
```

### 样式不生效

检查 `frameStyle` 和 `lineStyle` 中的属性名是否正确：

```jsx
<Magnifier
  focusRange={[2, 5]}
  frameStyle={{
    stroke: '#1890ff',      // 正确
    lineWidth: '3px',       // 正确（字符串类型）
    // strokeWidth: 3       // 错误
  }}
  lineStyle={{
    stroke: '#52c41a',
    lineWidth: '6px',
  }}
/>
```

## 注意事项

1. **focusRange 必填**：必须指定聚焦范围，否则放大镜无法显示
2. **索引从 0 开始**：focusRange 的索引是基于数据数组的索引
3. **radius 支持两种格式**：可以是数字（像素）或带单位的字符串（如 `'50px'`）
4. **position 是中心点**：position 坐标是放大镜圆形的中心位置
5. **多坐标系**：如果有多个坐标系，放大镜默认使用第一个坐标系的图形
