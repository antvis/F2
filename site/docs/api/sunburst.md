---
title: 旭日图 - Sunburst
order: 6
---

Sunburst 组件用于展示层级数据的径向图表，通过同心圆的形式展示数据的层级结构。每一层圆环代表数据的一个层级，扇形的大小表示数据的数值，适合展示具有层级关系的数据结构。

## 何时使用

- 需要展示具有层级结构的数据
- 需要通过径向布局展示数据比例
- 文件系统目录结构可视化
- 组织架构层级展示
- 预算分配的层级分解
- 市场份额的层级分析

## TypeScript 类型定义

```typescript
interface ColorAttrObject {
  /** 用于颜色映射的字段名 */
  field: string;
  /** 颜色范围数组 */
  range?: any[];
  /** 自定义颜色映射函数 */
  callback?: (value) => any;
}

interface SunburstProps {
  /** 数据源，必须是具有层级结构的数组 */
  data: Data;
  /** 坐标系配置，旭日图通常使用极坐标系 polar */
  coord?: CoordProps;
  /** 颜色映射配置，可以是颜色数组或包含字段映射的对象 */
  color?: any[] | ColorAttrObject;
  /** 用于确定扇形大小的数值字段名 */
  value?: string;
  /** 是否对数据进行排序，默认为 true，按数值大小降序排列 */
  sort?: boolean | Function;
  /** 点击事件回调函数 */
  onClick?: (event) => void;
}
```

## Usage

```jsx
import { Canvas, Sunburst } from '@antv/f2';

const data = {
  name: 'root',
  children: [
    {
      name: 'A',
      children: [
        { name: 'A-1', value: 10 },
        { name: 'A-2', value: 20 },
      ],
    },
    {
      name: 'B',
      children: [
        { name: 'B-1', value: 15 },
        { name: 'B-2', value: 25 },
      ],
    },
  ],
};

const colors = [
  '#5B8FF9', '#61DDAA', '#65789B', '#F6BD16',
  '#7262fd', '#78D3F8', '#9661BC', '#F6903D',
  '#008685', '#F08BB4'
];

<Canvas context={context} pixelRatio={window.devicePixelRatio}>
  <Sunburst
    data={data.children}
    coord={{ type: 'polar' }}
    color={{ field: 'name', range: colors }}
    value="value"
  />
</Canvas>
```

## Props

### 基础配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `data` | `Array` | - | 数据源，必须是具有层级结构的数组（children 嵌套） |
| `value` | `string` | - | 用于确定扇形大小的数值字段名 |
| `coord` | `CoordProps` | `{ type: 'polar' }` | 坐标系配置，旭日图通常使用极坐标系 |

### 样式配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `color` | `any[] \| ColorAttrObject` | 主题色 | 颜色映射配置，可以是颜色数组或包含字段映射的对象 |

### 高级配置

| 属性 | 类型 | 默认值 | 说明 |
|------|------|--------|------|
| `sort` | `boolean \| Function` | `true` | 是否对数据进行排序，默认按 value 降序排列 |
| `onClick` | `(event) => void` | - | 点击事件回调函数 |

### ColorAttrObject

| 属性 | 类型 | 说明 |
|------|------|------|
| `field` | `string` | 用于颜色映射的字段名 |
| `range` | `any[]` | 颜色范围数组 |
| `callback` | `(value) => any` | 自定义颜色映射函数 |

## 用法示例

### 基础旭日图

最简单的旭日图配置：

```jsx
const data = {
  name: 'root',
  children: [
    {
      name: 'Category A',
      children: [
        { name: 'Item 1', value: 10 },
        { name: 'Item 2', value: 20 },
        { name: 'Item 3', value: 15 },
      ],
    },
    {
      name: 'Category B',
      children: [
        { name: 'Item 4', value: 25 },
        { name: 'Item 5', value: 30 },
      ],
    },
  ],
};

<Canvas context={context}>
  <Sunburst
    data={data.children}
    value="value"
  />
</Canvas>
```

### 自定义颜色

使用自定义颜色数组：

```jsx
const colors = [
  '#5B8FF9', '#61DDAA', '#F6BD16',
  '#7262fd', '#78D3F8', '#9661BC'
];

<Canvas context={context}>
  <Sunburst
    data={data.children}
    value="value"
    color={colors}
  />
</Canvas>
```

### 使用颜色映射对象

通过 ColorAttrObject 配置颜色：

```jsx
<Canvas context={context}>
  <Sunburst
    data={data.children}
    value="value"
    color={{
      field: 'name',
      range: ['#1890ff', '#52c41a', '#faad14', '#f5222d'],
    }}
  />
</Canvas>
```

### 禁用排序

不进行数据排序，保持原始顺序：

```jsx
<Canvas context={context}>
  <Sunburst
    data={data.children}
    value="value"
    sort={false}
  />
</Canvas>
```

### 自定义排序函数

使用自定义函数进行排序：

```jsx
<Canvas context={context}>
  <Sunburst
    data={data.children}
    value="value"
    sort={(a, b) => {
      // 按名称排序
      return a.name.localeCompare(b.name);
    }}
  />
</Canvas>
```

### 点击事件

监听扇形点击事件：

```jsx
<Canvas context={context}>
  <Sunburst
    data={data.children}
    value="value"
    onClick={(event) => {
      console.log('点击了扇形:', event);
    }}
  />
</Canvas>
```

### 多层级数据

展示 3 层或更多层级的数据：

```jsx
const data = {
  name: 'root',
  children: [
    {
      name: 'Level 1-A',
      children: [
        {
          name: 'Level 2-A',
          children: [
            { name: 'Item 1', value: 5 },
            { name: 'Item 2', value: 10 },
          ],
        },
        {
          name: 'Level 2-B',
          children: [
            { name: 'Item 3', value: 8 },
            { name: 'Item 4', value: 12 },
          ],
        },
      ],
    },
  ],
};

<Canvas context={context}>
  <Sunburst
    data={data.children}
    value="value"
    color={{ field: 'name' }}
  />
</Canvas>
```

## 数据格式

旭日图需要具有层级结构的数据，示例如下：

```jsx
const data = {
  name: 'root',
  children: [
    {
      name: '第一层级',
      children: [
        {
          name: '第二层级',
          children: [
            { name: '叶子节点', value: 100 },
          ],
        },
      ],
    },
  ],
};

// 使用时只传入 children 数组
<Sunburst data={data.children} value="value" />
```

**注意事项**：
- 数据必须是嵌套的 children 结构
- 叶子节点需要包含 value 字段
- name 字段用于颜色分组

## 常见问题

### 旭日图不显示

确保数据结构正确，且叶子节点包含 value 字段：

```jsx
// 错误：缺少 value 字段
const data = [
  { name: 'A' },
  { name: 'B' },
];

// 正确：包含 value 字段
const data = [
  { name: 'A', value: 10 },
  { name: 'B', value: 20 },
];
```

### 层级不正确

确保使用嵌套的 children 结构：

```jsx
// 错误：扁平结构
const data = [
  { name: 'A', value: 10 },
  { name: 'B', value: 20, parent: 'A' },
];

// 正确：嵌套 children 结构
const data = [
  {
    name: 'A',
    children: [
      { name: 'B', value: 20 },
    ],
  },
];
```

### 颜色不区分

确保 color.field 指定的字段在数据中存在：

```jsx
// 正确配置颜色映射
<Sunburst
  data={data.children}
  color={{ field: 'name' }}  // name 字段用于分组
  value="value"
/>
```

### 排序不生效

检查 sort 属性设置：

```jsx
// 禁用排序
<Sunburst sort={false} />

// 自定义排序函数
<Sunburst sort={(a, b) => a.name.localeCompare(b.name)} />
```

### 坐标系配置

旭日图必须使用极坐标系：

```jsx
<Sunburst
  data={data.children}
  coord={{ type: 'polar' }}  // 必须设置为 polar
  value="value"
/>
```

## 注意事项

1. **数据结构**：数据必须是嵌套的 children 结构，不能是扁平数组
2. **value 字段**：叶子节点必须包含 value 字段，用于确定扇形大小
3. **极坐标系**：coord.type 必须设置为 'polar'，否则无法正确渲染
4. **颜色映射**：color.field 指定的字段用于根节点分组，所有子节点继承父节点颜色
5. **排序默认行为**：sort 默认为 true，按 value 值降序排列
