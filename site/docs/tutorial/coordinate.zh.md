---
title: 坐标系
order: 5
---

坐标系是将两种位置标度结合在一起组成的 2 维定位系统，描述了数据是如何映射到图形所在的平面。

F2 提供了直角坐标系和极坐标系两种类型，所有坐标系均是 2 维的。

## 坐标系类型

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| `rect` | 直角坐标系，由 x、y 两个互相垂直的坐标轴构成 | 柱状图、折线图、散点图等 |
| `polar` | 极坐标系，由角度和半径两个维度构成 | 饼图、玫瑰图、雷达图等 |

### 坐标系对比

坐标系类型的变换会改变几何标记的形状。例如，柱状图在不同坐标系下会变换成各种类型：

| 图表类型 | 直角坐标系 | 极坐标（未转置） | 极坐标（转置） |
|----------|------------|------------------|----------------|
| 层叠柱状图 | ![](https://gw.alipayobjects.com/zos/skylark/e3c2af2e-8c42-4743-9eb2-00be4beecb50/2018/png/4b932828-aad3-4934-99be-0580dd6b88ba.png#width=) | ![](https://gw.alipayobjects.com/zos/skylark/a0e92822-3020-4f2c-b63b-19e9e7204a86/2018/png/cdb767a2-105d-499d-af09-383323b35222.png#width=) | ![](https://gw.alipayobjects.com/zos/skylark/5de8fa15-6ea1-4a13-93c0-e4646ca6601c/2018/png/a43c60de-692f-433a-bab2-93fc6e9bba3b.png#width=) |
| 柱状图 | ![](https://gw.alipayobjects.com/zos/skylark/e392736b-86a1-4452-9265-f7a5e8dc1805/2018/png/47caf538-6703-4db5-ae68-6605837f2803.png#width=) | ![](https://gw.alipayobjects.com/zos/skylark/383cdf9f-a631-4fc4-9f6a-593a22822242/2018/png/dd798932-1555-4988-bc68-353835d051b3.png#width=) | ![](https://gw.alipayobjects.com/zos/skylark/1a056c5c-13da-46d4-9315-2d589588d889/2018/png/4171f504-2f52-4ed6-ba8f-b7b286650692.png#width=) |

## 如何设置坐标系

F2 默认使用直角坐标系。切换坐标系时，在 `Chart` 组件上设置 `coord` 属性：

```jsx
<Chart
  data={data}
  coord={{
    type: 'polar',
  }}
>
  {/* ... */}
</Chart>
```

## 直角坐标系

直角坐标系（笛卡尔坐标系）是默认的坐标系类型，由 x、y 两个互相垂直的坐标轴构成。

### 配置语法

```jsx
<Chart
  coord={{
    type: 'rect',        // 声明直角坐标系（可省略，默认值）
    transposed: false,   // 是否转置坐标轴
  }}
>
  <Interval x="genre" y="sold" />
</Chart>
```

### 转置坐标系

将 x 轴和 y 轴交换，适用于条形图：

```jsx
<Chart
  coord={{
    type: 'rect',
    transposed: true,    // 转置坐标轴
  }}
>
  <Interval x="genre" y="sold" />
</Chart>
```

## 极坐标系

极坐标系由角度和半径两个维度构成，适用于周期性数据的可视化，如时间和方向数据。

### 配置语法

```jsx
<Chart
  coord={{
    type: 'polar',           // 声明极坐标系
    startAngle: -Math.PI,    // 起始弧度（可选）
    endAngle: 0,             // 结束弧度（可选）
    innerRadius: 0.3,        // 内半径，用于绘制环形图（可选）
    radius: 1,               // 外半径（可选）
    transposed: false,       // 是否转置（可选）
  }}
>
  {/* ... */}
</Chart>
```

### CoordConfig 类型定义

```typescript
interface CoordConfig {
  type?: 'rect' | 'polar';  // 坐标系类型
  transposed?: boolean;      // 是否转置
  startAngle?: number;       // 起始弧度（仅极坐标）
  endAngle?: number;         // 结束弧度（仅极坐标）
  innerRadius?: number;      // 内半径（仅极坐标）
  radius?: number;           // 外半径（仅极坐标）
}
```

### 角度说明

F2 极坐标的默认起始角度和结束角度如下图所示：

![](https://zos.alipayobjects.com/skylark/85950a42-9579-44cb-b656-8dd28c9a014a/attach/2378/d648679184c6977c/image.png#width=)

- 默认起始角度：-π（9 点钟方向）
- 默认结束角度：0（3 点钟方向）

## 图表示例

### 饼图

使用极坐标系绘制饼图：

```jsx
const data = [
  { name: '芳华', percent: 0.4, a: '1' },
  { name: '妖猫传', percent: 0.2, a: '1' },
  { name: '机器之血', percent: 0.18, a: '1' },
  { name: '心理罪', percent: 0.15, a: '1' },
  { name: '寻梦环游记', percent: 0.05, a: '1' },
  { name: '其他', percent: 0.02, a: '1' },
];

<Chart data={data} coord={{ type: 'polar' }}>
  <Interval x="a" y="percent" color="name" coord="polar" />
</Chart>
```

### 玫瑰图

使用极坐标系绘制玫瑰图：

```jsx
const data = [
  { name: '一月', value: 30 },
  { name: '二月', value: 40 },
  { name: '三月', value: 35 },
  { name: '四月', value: 50 },
  { name: '五月', value: 45 },
  { name: '六月', value: 60 },
];

<Chart data={data} coord={{ type: 'polar', transposed: true }}>
  <Interval x="name" y="value" color="name" coord="polar" />
</Chart>
```

### 环形图

设置内半径绘制环形图：

```jsx
<Chart
  data={data}
  coord={{
    type: 'polar',
    innerRadius: 0.5,  // 设置内半径为 0.5
  }}
>
  <Interval x="a" y="percent" color="name" coord="polar" />
</Chart>
```

### 半圆饼图

调整起始和结束角度：

```jsx
<Chart
  data={data}
  coord={{
    type: 'polar',
    startAngle: -Math.PI / 2,  // -90 度
    endAngle: Math.PI / 2,     // 90 度
  }}
>
  <Interval x="a" y="percent" color="name" coord="polar" />
</Chart>
```

### 雷达图

使用极坐标系的转置模式：

```jsx
const data = [
  { item: '攻击力', value: 80 },
  { item: '防御力', value: 70 },
  { item: '速度', value: 90 },
  { item: '力量', value: 60 },
  { item: '耐力', value: 75 },
];

<Chart
  data={data}
  scale={{
    value: {
      min: 0,
      max: 100,
    },
  }}
  coord={{
    type: 'polar',
    radius: 0.8,
  }}
>
  <Line x="item" y="value" />
  <Point x="item" y="value" />
  <Axis field="item" />
  <Axis field="value" />
</Chart>
```

### 条形图

使用转置的直角坐标系：

```jsx
<Chart
  data={data}
  coord={{
    type: 'rect',
    transposed: true,  // 转置坐标轴
  }}
>
  <Interval x="genre" y="sold" color="genre" />
</Chart>
```

### 层叠条形图

```jsx
<Chart
  data={data}
  coord={{
    type: 'rect',
    transposed: true,
  }}
  scale={{
    sold: {
      stack: true,  // 启用堆叠
    },
  }}
>
  <Interval x="genre" y="sold" color="type" />
</Chart>
```

## 高级配置

### 动态切换坐标系

```jsx
class SwitchableChart extends Component {
  state = {
    coordType: 'rect',
  };

  handleSwitch = () => {
    this.setState({
      coordType: this.state.coordType === 'rect' ? 'polar' : 'rect',
    });
  };

  render() {
    const { coordType } = this.state;
    return (
      <Chart
        data={data}
        coord={{ type: coordType }}
      >
        <Interval x="genre" y="sold" color="genre" />
      </Chart>
    );
  }
}
```

### 自定义坐标系统

```jsx
<Chart
  coord={{
    type: 'polar',
    startAngle: -Math.PI,     // 从 9 点钟方向开始
    endAngle: 0,              // 到 3 点钟方向结束
    innerRadius: 0.2,         // 20% 内半径
    radius: 0.9,              // 90% 外半径
  }}
>
  {/* ... */}
</Chart>
```

## 常见问题

### 如何绘制半圆饼图？

调整起始和结束角度：

```jsx
coord={{
  type: 'polar',
  startAngle: -Math.PI / 2,  // 顶部开始
  endAngle: Math.PI / 2,     // 顶部结束
}}
```

### 如何绘制环形图？

设置 `innerRadius` 属性：

```jsx
coord={{
  type: 'polar',
  innerRadius: 0.5,  // 50% 内半径
}}
```

### 如何绘制玫瑰图？

使用极坐标系的转置模式：

```jsx
coord={{
  type: 'polar',
  transposed: true,  // 转置
}}
```

### 如何切换 x 和 y 轴？

使用 `transposed` 属性：

```jsx
coord={{
  type: 'rect',
  transposed: true,  // 交换 x 和 y 轴
}}
```

## 相关文档

- [图形语法](/tutorial/grammar.zh.md)
- [度量](/tutorial/scale.zh.md)
- [核心概念](/tutorial/understanding.zh.md)
