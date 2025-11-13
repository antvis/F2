---
title: 饼图标签 - PieLabel
type: 组件
order: 9
---

饼图标签组件用于在极坐标下（常见的饼图/环图场景）为扇区显示标签，支持两种布局：默认布局与蜘蛛网布局。文档示例统一采用 Interval + PieLabel 的写法（Interval 用于绘制扇区并映射颜色），以便与测试用例一致。

## 何时使用

- 需要在饼图/环图上显示数据标签（两行文本常见：名称 + 值）
- 需要自动避免标签重叠并提供清晰的视觉引导
- 需要响应标签的点击事件

## 使用方式（与测试用例保持一致的示例）

下面示例使用 Interval 绘制扇区（x 字段为固定常量，y 为数值），并通过 color 映射到分类字段 memo，再配合 PieLabel 显示两行标签。

```jsx
import { jsx, Canvas, Chart, Interval, PieLabel } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');
const data = [
  { amount: 20, memo: 'Study', const: 'const' },
  { amount: 10, memo: 'Eat', const: 'const' },
  { amount: 20, memo: 'Sports', const: 'const' },
  { amount: 10, memo: 'Other', const: 'const' },
];

const { props } = (
  <Canvas context={context} animate={false} pixelRatio={1}>
    <Chart
      data={data}
      coord={{
        type: 'polar',
        transposed: true,
        innerRadius: 0.3,
        radius: 0.5,
      }}
    >
      <Interval x="const" y="amount" adjust="stack" color="memo" />
      <PieLabel
        label1={(d) => ({ text: d.memo })}
        label2={(d) => ({ fill: '#000000', text: '$' + d.amount.toFixed(2) })}
      />
    </Chart>
  </Canvas>
);

const canvas = new Canvas(props);
canvas.render();
```

如果需要响应点击事件：

```jsx
<PieLabel
  label1={(d) => ({ text: d.memo })}
  label2={(d) => ({ fill: '#000000', text: '$' + d.amount.toFixed(2) })}
  onClick={(evt) => {
    // evt.origin 为原始数据项，例如 { amount: 10, memo: 'Eat', const: 'const' }
    console.log('点击标签，原始数据：', evt.origin);
  }}
/>
```

## 配色参考（Interval 写法）

可直接在 Interval 上设置 color 映射，也可在使用 Pie 组件时使用相同的 color 配置思路：

```jsx
<Interval
  x="const"
  y="amount"
  adjust="stack"
  color={{
    field: 'memo',
    range: ['#1890FF', '#13C2C2', '#2FC25B', '#FACC14', '#F04864', '#8543E0'],
  }}
/>
```

## 属性

- type: 'default' | 'spider'  
  标签布局类型，默认为 'default'。default 使用曲线连接线并在左右分布；spider 为蜘蛛网式放射布局。

- anchorOffset: string | number  
  标签线锚点偏移，默认 '10px'。

- inflectionOffset: string | number  
  标签线拐点偏移，默认 '30px'。

- sidePadding: string | number  
  文本距离画布边缘的最小距离，默认 '15px'。

- label1: function  
  第一行标签配置，接收数据项，返回文本及样式配置。例如：label1={(d) => ({ text: d.memo })}

- label2: function  
  第二行标签配置，接收数据项，返回文本及样式配置。例如：label2={(d) => ({ text: '$' + d.amount.toFixed(2) })}

- records: any[]  
  指定只显示的记录数组，可用于筛选需要显示标签的数据项。

- triggerOn: 'click' | 'press'  
  触发事件类型，默认 'click'。

- onClick: function  
  标签点击回调，回调参数包含 origin 字段（原始数据项）。

- adjustRatio: number  
  调整布局高度的阈值比例，默认 1。

## 标签配置属性

标签配置对象支持以下字段：

| 属性名       | 类型                          | 描述             |
| ------------ | ----------------------------- | ---------------- |
| text         | string                        | 标签文本内容     |
| fill         | string                        | 文本颜色         |
| fontSize     | number                        | 字体大小         |
| fontWeight   | number \| string              | 字体粗细         |
| textAlign    | 'start' \| 'center' \| 'end'  | 文本对齐方式     |
| textBaseline | 'top' \| 'middle' \| 'bottom' | 文本基线对齐方式 |

## 示例场景（对应测试用例）

1. 默认显示（基本用例）

   - 使用极坐标 coord 配置，Interval 绘制扇区，PieLabel 显示两行标签（名称 + 金额格式化）。

2. 事件回调对象（onClick）

   - 在 PieLabel 中绑定 onClick，回调参数包含 origin（原始数据），可用于业务交互。

3. 多条目布局问题（象限重排）
   - 当某一侧（左右）显示标签超过最大数量时，PieLabel 会按优先级将部分象限的标签重新放置到对侧以避免重叠。以下测试场景在文档中简述：
     - 左侧超过最大显示个数时，第四象限可能显示在第一象限或第三象限显示在第二象限（基于可用空间与优先级调整）。
     - 右侧超过最大显示个数时，第一象限可能显示在第四象限或第二象限显示在第三象限。

（上述行为请以截图单元测试或实际渲染效果为准，文档中提供的示例与测试用例保持一致以便复现）

## 常见问题

- 标签显示不全或重叠：  
  调整 sidePadding、anchorOffset、inflectionOffset，或使用 type="spider"；也可通过 records 筛选显示的标签。

- 标签位置不理想：  
  检查 coord（极坐标）及 radius/innerRadius 是否给足空间，调整偏移量或布局类型。

- 点击事件不响应：  
  检查 triggerOn 是否设置正确，确认没有遮挡元素，并确保回调绑定正确（回调接收事件对象，原始数据在 event.origin 中）。
