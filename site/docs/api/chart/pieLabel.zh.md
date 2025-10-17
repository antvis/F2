---
title: 饼图标签 - PieLabel
type: 组件
order: 9
---

饼图标签组件用于在饼图上显示数据标签，支持两种布局方式：默认布局和蜘蛛网布局，提供灵活的标签定位和样式自定义功能。

## 何时使用

- 需要在饼图上显示详细的数据标签
- 数据标签需要避免重叠，提供清晰的视觉引导

## 使用方式

```jsx
import { jsx, Canvas, Chart, Pie, PieLabel } from '@antv/f2';

const context = document.getElementById('container').getContext('2d');
const data = [
  { name: '餐饮', value: 20 },
  { name: '交通', value: 15 },
  { name: '购物', value: 25 },
  { name: '娱乐', value: 30 },
  { name: '其他', value: 10 },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Chart data={data}>
      <Pie x="name" y="value" radius={0.8} innerRadius={0.5} />
      <PieLabel
        label1={(data) => ({ text: data.name })}
        label2={(data) => ({
          text: data.value + '%',
          fontWeight: 500,
        })}
      />
    </Chart>
  </Canvas>
);

const chart = new Canvas(props);
chart.render();
```

## 属性

### type: 'default' | 'spider'

标签布局类型，默认为 `'default'`

- **default**: 默认布局，使用曲线连接线，标签分布在左右两侧
- **spider**: 蜘蛛网布局，使用直线连接线，标签呈放射状分布，推荐该布局

### anchorOffset: string | number

锚点的偏移量，即标签线与饼图扇形的连接点距离，默认为 `'10px'`

### inflectionOffset: string | number

拐点的偏移量，即标签线的拐点距离，默认为 `'30px'`

### sidePadding: string | number

文本距离画布四边的距离，默认为 `'15px'`

### label1: function

第一行标签配置，接收数据项作为参数，返回标签配置对象

```jsx
label1={(data) => ({
  text: data.name,
  fill: '#808080',
  fontSize: 12,
  textAlign: 'start'
})}
```

### label2: function

第二行标签配置，接收数据项作为参数，返回标签配置对象

```jsx
label2={(data) => ({
  text: '￥' + data.value.toLocaleString(),
  fill: '#000000',
  fontSize: 14,
  fontWeight: 500,
  textAlign: 'start'
})}
```

### records: any[]

指定要显示的数据记录，用于自定义显示特定数据项的标签

```jsx
records={[
  { name: '餐饮', value: 20 },
  { name: '交通', value: 15 }
]}
```

### triggerOn: 'click' | 'press'

触发的事件类型，默认为 `'click'`

### onClick: function

标签点击事件回调函数，接收事件对象作为参数

```jsx
onClick={(data) => {
  console.log('点击了标签:', data);
}}
```

### adjustRatio: number

调整高度的阈值比例，默认为 `1`

## 标签配置属性

标签配置对象支持以下属性：

| 属性名       | 类型                          | 描述             |
| ------------ | ----------------------------- | ---------------- |
| text         | string                        | 标签文本内容     |
| fill         | string                        | 文本颜色         |
| fontSize     | number                        | 字体大小         |
| fontWeight   | number \| string              | 字体粗细         |
| textAlign    | 'start' \| 'center' \| 'end'  | 文本对齐方式     |
| textBaseline | 'top' \| 'middle' \| 'bottom' | 文本基线对齐方式 |

## 布局类型示例

### 默认布局

```jsx
<PieLabel
  type="default"
  label1={(data) => ({ text: data.name })}
  label2={(data) => ({ text: data.value + '%' })}
/>
```

### 蜘蛛网布局

蜘蛛网布局适用于数据较多或需要更紧凑布局的场景：

```jsx
<PieLabel
  type="spider"
  anchorOffset="15px"
  inflectionOffset="40px"
  label1={(data) => ({
    text: data.name,
    fill: '#666',
  })}
  label2={(data) => ({
    text: '￥' + data.value.toLocaleString(),
    fill: '#000',
    fontWeight: 500,
  })}
/>
```

## 使用场景示例

### 基础使用

```jsx
<Chart data={data}>
  <Pie x="name" y="value" />
  <PieLabel label1={(data) => ({ text: data.name })} label2={(data) => ({ text: data.value })} />
</Chart>
```

### 自定义样式

```jsx
<Chart data={data}>
  <Pie x="name" y="value" />
  <PieLabel
    type="spider"
    anchorOffset="20px"
    inflectionOffset="50px"
    sidePadding="20px"
    label1={(data) => ({
      text: data.name,
      fill: '#1890ff',
      fontSize: 14,
      fontWeight: 500,
    })}
    label2={(data) => ({
      text: data.value + ' (' + ((data.value / total) * 100).toFixed(1) + '%)',
      fill: '#666',
      fontSize: 12,
    })}
  />
</Chart>
```

### 交互式标签

```jsx
const [selected, setSelected] = useState(null);

<Chart data={data}>
  <Pie x="name" y="value" />
  <PieLabel
    label1={(data) => ({
      text: data.name,
      fill: selected === data.name ? '#1890ff' : '#666',
    })}
    label2={(data) => ({
      text: data.value,
      fill: selected === data.name ? '#1890ff' : '#000',
      fontWeight: selected === data.name ? 600 : 400,
    })}
    onClick={(data) => setSelected(data.name)}
  />
</Chart>;
```

### 自定义显示记录

```jsx
<Chart data={allData}>
  <Pie x="name" y="value" />
  <PieLabel
    type="spider"
    records={allData.filter((d) => d.value > 10)} // 只显示值大于10的标签
    label1={(data) => ({ text: data.name })}
    label2={(data) => ({ text: data.value + '%' })}
  />
</Chart>
```

## 常见问题

### 1. 标签显示不全或重叠

- 调整 `sidePadding` 属性增加边距
- 使用 `type="spider"` 蜘蛛网布局获得更好的空间利用
- 减少显示的标签数量，使用 `records` 属性筛选重要数据

### 2. 标签位置不理想

- 调整 `anchorOffset` 和 `inflectionOffset` 改变连接线长度
- 检查数据是否有异常值导致标签位置计算错误
- 确保饼图有足够的空间显示标签

### 3. 点击事件不响应

- 确认 `triggerOn` 属性设置正确（'click' 或 'press'）
- 检查是否有其他元素遮挡了标签
- 验证 `onClick` 回调函数是否正确绑定
