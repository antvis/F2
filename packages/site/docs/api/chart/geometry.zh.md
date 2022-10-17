---
title: 几何标记 - Geometry
order: 1
---

F2 基本组成部分如下图所示：

![](https://gw.alipayobjects.com/zos/rmsportal/tpfdzWDYmxzHkquTihJe.png)

下列几何标记都继承了下面的属性和方法

- [Line](line)：线
- [Interval](interval)：柱状图、直方图、饼图、环形图、漏斗图等
- [Point](point)：点
- [Area](area)：面积

## Props

### x: string

x 轴的数据映射字段名

### y: string

y 轴的数据映射字段名

### color

color 的数据映射字段，可使用如下几种方式

#### 固定值

```jsx
<Geometry color="#1890FF" ... />
```

#### 字段名映射

```jsx
<Geometry color={ field } ... />
```

F2 会根据数据类型自动选择适应的映射方式

#### Array 形式

```jsx
<Geometry color={ [field, ['red', 'green', 'blue']] } ... />
```

F2 会根据数据以此映射 `['red', 'green', 'blue']` 这 3 种颜色

#### Object 形式

```jsx
<Geometry color={{
  field,
  range: ['red', 'green', 'blue'],
  // 也可通过回调的方式设置
  callback: (value) => { return 'gray' }
}} ... />
```

#### 指定映射类型

F2 支持 **线性** 和 **分类** 2 种形式进行数据映射

```jsx
<Geometry color={{
  type: 'linear', // 分类为：category
  field,
  // 在映射时，颜色会从 red 渐变到 green
  range: ['red', 'green'],
}} ... />

<Geometry color={{
  type: 'category'
  field,
  // 不会渐变，只会映射这 3 种颜色
  range: ['red', 'green', 'blue'],
}} ... />
```

### size

size 的数据映射字段， 使用方式同 [color](#color)

```jsx
// 固定值
<Geometry size={ 4 } ... />

// 字段名映射
<Geometry size={ field } ... />

// array 形式
<Geometry size={ [field, [2, 4, 6]] } ... />

// object 形式
<Geometry size={{
  field,
  range: [2, 4, 6],
  // 也可通过回调的方式设置
  callback: (value) => { return 'gray' }
}} ... />

// 指定类型
<Geometry size={{
  type: 'linear', // 分类为：category
  field,
  // 在映射时，大小会从 2 逐渐变化到 10
  range: [2, 10],
}} ... />
```
### viewClip
只显示图表区域内（两轴之间）的，默认 false

### adjust: string

设置数据调整方式, F2 支持如下几种数据调整方式

```jsx
<Geometry adjust={ adjustType } ... />
```

#### stack

层叠，将同一个分类的数据值累加起来。以层叠的柱状图为例，x 轴方向的同一个分类下面的数据，按照顺序，将 y 轴对应的值累加，最终将数据调整的不再重叠。

#### dodge

分组散开，将同一个分类的数据进行分组在一个范围内均匀分布，例如分组柱状图。

#### symmetric

数据对称，使得生成的图形居中对齐，例如河流图、漏斗图。

### startOnZero: boolean

y 轴是否需要从 0 开始，默认为 `false`

### animation

动画配置， F2 支持对动画进行 `appear`, `update`, `leave` 这 3 个阶段的动画配置

```jsx
<Geometry
  animation={{
    appear: {
      easing: 'linear',
      duration: 300,
      delay: 0,
      property: ['fillOpacity'],
      start: {
        fillOpacity: 0,
      },
      end: {
        fillOpacity: 1,
      },
    },
    update: {
      easing: 'linear',
      duration: 450,
      delay: 0,
      property: ['x', 'y'],
    },
    leave: {
      easing: 'linear',
      duration: 450,
      delay: 0,
      property: ['fillOpacity'],
      start: {
        fillOpacity: 1,
      },
      end: {
        fillOpacity: 0,
      },
    },
  }}
/>
```

更多缓动函数可见：[easing 函数](https://github.com/antvis/F2/blob/master/packages/f2/src/canvas/animation/easing.ts)， 也可直接传入缓动 `function`

## 方法

### getXScale()

获取 x 轴的 scale

### getYScale()

获取 y 轴的 scale

### getSnapRecords(point)

根据 canvas 坐标点获取对应图形的数据, point 为 `{ x: number, y: number }` 这种结构
