---
title: Gauge 仪表盘
type: 组件
order: 5
---

# Gauge 仪表盘

仪表盘组件用于显示进度或完成度的可视化组件，常用于展示关键绩效指标（KPI）。

## 何时使用

- 需要显示单个指标的完成进度
- 展示目标值与实际值的对比
- 显示百分比或比例数据
- 仪表盘样式的数据展示

## 代码演示

### 基础仪表盘

<code src="../../../examples/other/area/demo/gauge.jsx"></code>

### 带颜色区间的仪表盘

<code src="../../../examples/other/area/demo/gauge-color.jsx"></code>

### 自定义文本的仪表盘

<code src="../../../examples/other/area/demo/gauge-text.jsx"></code>

## API

### Gauge

| 属性名     | 类型                     | 默认值             | 描述             |
| ---------- | ------------------------ | ------------------ | ---------------- |
| percent    | number                   | 0                  | 进度值，范围 0-1 |
| startAngle | number                   | Math.PI            | 起始角度（弧度） |
| endAngle   | number                   | Math.PI \* 2       | 结束角度（弧度） |
| center     | { x: number, y: number } | { x: 150, y: 150 } | 仪表盘中心点坐标 |
| r          | number \| string         | 100                | 仪表盘半径       |
| r0         | number \| string         | 0                  | 内圆半径         |
| tickCount  | number                   | 5                  | 刻度数量         |
| tickOffset | number \| string         | -20px              | 刻度偏移量       |
| tickLength | number \| string         | 10px               | 刻度长度         |

## 使用示例

### 基础使用

```jsx
import { jsx, Canvas, Gauge } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Gauge
      center={{ x: 150, y: 150 }}
      startAngle={Math.PI}
      endAngle={Math.PI * 2}
      percent={0.75}
      r="100px"
    />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

### 带颜色区间的仪表盘

```jsx
import { jsx, Canvas, Gauge } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const actualValue = 85;
const targetValue = 100;
const percent = actualValue / targetValue;

// 根据值获取颜色
const getColor = (value) => {
  if (value < 60) return '#ff4d4f'; // 红色
  if (value < 80) return '#faad14'; // 黄色
  return '#52c41a'; // 绿色
};

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <group>
      <Gauge
        center={{ x: 150, y: 150 }}
        startAngle={Math.PI}
        endAngle={Math.PI * 2}
        percent={percent}
        r="100px"
        tickCount={10}
        tickOffset="-20px"
        tickLength="10px"
      />

      {/* 添加文本显示 */}
      <text
        attrs={{
          x: 150,
          y: 130,
          text: `${actualValue}`,
          fontSize: 36,
          textAlign: 'center',
          textBaseline: 'middle',
          fill: getColor(actualValue),
        }}
      />
      <text
        attrs={{
          x: 150,
          y: 160,
          text: '实际值',
          fontSize: 14,
          textAlign: 'center',
          textBaseline: 'middle',
          fill: '#666',
        }}
      />
      <text
        attrs={{
          x: 150,
          y: 180,
          text: `目标值: ${targetValue}`,
          fontSize: 12,
          textAlign: 'center',
          textBaseline: 'middle',
          fill: '#999',
        }}
      />
    </group>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

### 自定义样式

```jsx
import { jsx, Canvas, Gauge } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Gauge
      center={{ x: 200, y: 200 }}
      startAngle={Math.PI * 0.75}
      endAngle={Math.PI * 2.25}
      percent={0.85}
      r="150px"
      tickCount={8}
      tickOffset="-30px"
      tickLength="15px"
    />
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

## 常见问题

### 如何设置颜色区间？

Gauge 组件本身不直接支持颜色区间设置，但你可以通过以下方式实现：

1. 使用自定义渲染覆盖默认颜色
2. 在文本或标签中显示对应的颜色状态
3. 使用多个 Gauge 组件叠加实现

### 如何显示百分比？

可以通过添加文本组件来显示百分比：

```jsx
<text
  attrs={{
    x: 150,
    y: 150,
    text: `${Math.round(percent * 100)}%`,
    fontSize: 24,
    textAlign: 'center',
    textBaseline: 'middle',
    fill: '#333',
  }}
/>
```

### 如何调整仪表盘大小？

通过调整`r`属性来改变仪表盘半径，同时需要相应调整`center`坐标：

```jsx
<Gauge
  center={{ x: 100, y: 100 }}
  r="80px"
  // 其他属性...
/>
```

## 相关组件

- [Progress](/api/chart/progress) - 进度条组件
- [Ring](/api/chart/ring) - 环形图组件
