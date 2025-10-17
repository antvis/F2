---
title: 旭日图 - Sunburst
order: 6
---

旭日图是一种用于展示层级数据的径向图表，通过同心圆的形式展示数据的层级结构。每一层圆环代表数据的一个层级，扇形的大小表示数据的数值，适合展示具有层级关系的数据结构。

## Usage

```jsx
import { jsx, Canvas, Sunburst } from '@antv/f2';

const data = {
  name: 'flare',
  children: [
    {
      name: 'analytics',
      children: [
        {
          name: 'cluster',
          children: [
            { name: 'AgglomerativeCluster', value: 3938 },
            { name: 'CommunityStructure', value: 3812 },
            { name: 'HierarchicalCluster', value: 6714 },
            { name: 'MergeEdge', value: 743 },
          ],
        },
      ],
    },
  ],
};

const colors = [
  'rgb(110, 64, 170)',
  'rgb(191, 60, 175)',
  'rgb(254, 75, 131)',
  'rgb(255, 120, 71)',
  'rgb(226, 183, 47)',
  'rgb(175, 240, 91)',
  'rgb(82, 246, 103)',
  'rgb(29, 223, 163)',
  'rgb(35, 171, 216)',
  'rgb(76, 110, 219)',
];

const { props } = (
  <Canvas context={context} pixelRatio={1}>
    <Sunburst
      data={data.children}
      coord={{
        type: 'polar',
      }}
      color={{
        field: 'name',
        range: colors,
      }}
      value="value"
    />
  </Canvas>
);
```

## Props

| 属性名  | 类型                       | 描述                                                  |
| ------- | -------------------------- | ----------------------------------------------------- |
| data    | `Array`                    | 数据源，必须是具有层级结构的数组                      |
| coord   | `CoordProps`               | 坐标系配置，旭日图通常使用极坐标系 `polar`            |
| color   | `ColorAttrObject \| any[]` | 颜色映射配置，可以是颜色数组或包含字段映射的对象      |
| value   | `string`                   | 用于确定扇形大小的数值字段名                          |
| sort    | `boolean \| Function`      | 是否对数据进行排序，默认为 `true`，按数值大小降序排列 |
| onClick | `Function`                 | 点击事件回调函数                                      |

### ColorAttrObject

| 属性名   | 类型             | 描述                 |
| -------- | ---------------- | -------------------- |
| field    | `string`         | 用于颜色映射的字段名 |
| range    | `any[]`          | 颜色范围数组         |
| callback | `(value) => any` | 自定义颜色映射函数   |

## 数据结构

旭日图需要具有层级结构的数据，示例如下：

```js
const data = {
  name: 'flare',
  children: [
    {
      name: 'analytics',
      children: [
        {
          name: 'cluster',
          children: [
            { name: 'AgglomerativeCluster', value: 3938 },
            { name: 'CommunityStructure', value: 3812 },
            { name: 'HierarchicalCluster', value: 6714 },
            { name: 'MergeEdge', value: 743 },
          ],
        },
        // 更多数据...
      ],
    },
    // 更多数据...
  ],
};
```
