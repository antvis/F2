---
title: 矩形树图 - Treemap
order: 7
---

矩形树图是一种用于展示层级数据的可视化图表，通过矩形的大小和颜色来表示数据的数值和分类。它将数据按照层级结构进行分割，每个矩形代表一个数据项，矩形的面积与数据的数值成正比。

## Usage

## 示例

```jsx
import { jsx, Canvas, Treemap } from '@antv/f2';

const data = [
  {
    name: '贵州茅台',
    value: 0.16,
    rate: 0.1,
  },
  {
    name: '贵州茅台1',
    value: 0.1,
    rate: -0.1,
  },
  {
    name: '五粮液',
    value: 0.13,
    rate: -0.1,
  },
  {
    name: '五粮液',
    value: 0.12,
    rate: -0.01,
  },
  {
    name: '招商银行',
    value: 0.15,
    rate: 0,
  },
  {
    name: '招商银行',
    value: 0.08,
    rate: 0,
  },
  {
    name: '中国平安',
    value: 0.07,
    rate: 0.1,
  },
  {
    name: '中国平安',
    value: 0.06,
    rate: 0.1,
  },
  {
    name: '同花顺',
    value: 0.1,
    rate: 0,
  },
  {
    name: '同花顺',
    value: 0.03,
    rate: 0,
  },
];

const { props } = (
  <Canvas context={context} pixelRatio={window.devicePixelRatio}>
    <Treemap
      data={data}
      color={{
        field: 'name',
      }}
      value="value"
      space={4}
      label={true}
      onClick={(record) => {
        console.log('点击了:', record.origin);
      }}
      selection={{
        triggerOn: 'click',
        selectedStyle: {
          fillOpacity: 1,
        },
        unSelectedStyle: {
          fillOpacity: 0.4,
        },
      }}
    />
  </Canvas>
);
```

## Props

| 属性名    | 类型                           | 描述                             |
| --------- | ------------------------------ | -------------------------------- |
| data      | `Array`                        | 数据源，必须是具有层级结构的数组 |
| value     | `string`                       | 用于确定矩形大小的数值字段名     |
| coord     | `CoordProps`                   | 坐标系配置                       |
| color     | `ColorAttrObject`              | 颜色映射配置                     |
| space     | `number`                       | 矩形之间的间距，默认为 0         |
| theme     | `Record<string, any>`          | 主题配置                         |
| nodes     | `RecordNode[]`                 | 节点数据                         |
| selection | `any`                          | 选择配置                         |
| label     | `boolean \| TextStyleProps`    | 是否显示标签，默认为 `false`     |
| onClick   | `(record: RecordNode) => void` | 点击事件回调函数                 |

### ColorAttrObject

| 属性名   | 类型                          | 描述                 |
| -------- | ----------------------------- | -------------------- |
| field    | `string`                      | 用于颜色映射的字段名 |
| range    | `string[] \| number[]`        | 颜色范围数组         |
| callback | `(value) => string \| number` | 自定义颜色映射函数   |

### Selection 配置

| 属性名          | 类型                     | 描述                            |
| --------------- | ------------------------ | ------------------------------- |
| triggerOn       | `string`                 | 触发选择的事件类型，如 'click'  |
| type            | `'single' \| 'multiple'` | 选择类型，默认为 'single'       |
| cancelable      | `boolean`                | 是否允许取消选择，默认为 `true` |
| defaultSelected | `any[]`                  | 默认选中的数据项                |
| selectedStyle   | `object \| Function`     | 选中项的样式                    |
| unSelectedStyle | `object \| Function`     | 未选中项的样式                  |

## 数据结构

矩形树图需要具有层级结构的数据，示例如下：

```js
const data = [
  {
    name: '贵州茅台',
    value: 0.16,
    rate: 0.1,
  },
  {
    name: '五粮液',
    value: 0.13,
    rate: -0.1,
  },
  {
    name: '招商银行',
    value: 0.15,
    rate: 0,
  },
  // 更多数据...
];
```

## 使用场景

矩形树图适用于以下场景：

1. 文件系统目录结构展示
2. 组织架构的可视化
3. 分类数据的层级展示
4. 预算分配和资源分布分析
5. 股票市值分布展示
6. 网站流量分析
