---
title: 图形属性
order: 5
---

图形属性对应视觉编码中的视觉通道，是图形语法元素中非常重要和灵活的一部分，每种几何标记都拥有自己的图形属性。F2 中支持的图形属性有下面几种：

1. **position**：位置，二维坐标系内映射至 x 轴、y 轴；

2. **color**：颜色，包含了色调、饱和度和亮度；

3. **size**：大小，不同的几何标记对大小的定义有差异；

4. **shape**：形状，几何标记的形状决定了某个具体图表类型的表现形式，例如点图，可以使用圆点、三角形、图片表示；线图可以有折线、曲线、点线等表现形式；


## 如何使用

首先需要明确一点：**图形属性是属于每一个几何标记 geom（Geometry) 的**，所以我们先要声明几何标记，然后再在该几何标记对象上进行图形属性的映射，代码如下：

```javascript
chart.<geomType>().<attrType>(fields[, callback]);
```

其中：

- geomType，几何标记类型，具体支持的类型请阅读[几何标记](https://www.yuque.com/antv/f2/geometry)章节；

- attrType，图形属性类型，对应视觉通道；

- fields，参与单个视觉通道映射的字段，可以是单个字段也可以是多个字段，多个字段使用 `*`分割

- callback，回调函数，用于定义如何解析视觉通道，如不提供则只用 F2 默认提供的视觉通道解析方式。


除了 `attr(fields[, callback])` 的函数原型外，F2 为了用户使用的便利性，结合各个视觉通道的特点，还提供了更为便捷的使用方式，在本章后面会进行详细的介绍。

语法示例：

```javascript
chart.point().position('a*b').color('c');

chart.interval().position('a*b').color('c', (cValue) => {
  if (cvalue === 'fail') {
    return 'red';
  }
  return 'green';
});
```

F2 对于每个图形属性的参数 `fields` 的解析规则如下：

- 如果是单个单词，如 `color('a')` 会判断该属性是否是输入数据源的字段属性，如果不是则会将其解析为一个常量；

- 如果是多个属性的映射，需要使用 `*` 进行连接，F2 会依次对这些字段进行解析和映射，如 `position('cut*price')`；


<a name="4933d1a9"></a>
## position 位置属性

position 位置属性的映射，用于确定由数据中的哪几个字段来确定数据在平面坐标系的位置。通俗地解释，即确定 x 轴和 y 轴的数据字段。

以下面的语句为例，在 position 属性上，映射了两个属性： 'cut' 和 'price'，分别表示将 'cut' 数据值映射至 x 轴坐标点，'price' 数据值映射至 y 轴坐标点。

```javascript
chart.point().position('cut*price');
```

<a name="color"></a>
## color

从可视化编码的角度对颜色进行分析，可以将颜色分为亮度、饱和度和色调三个视觉通道，其中前两个可以认为是用于编码定量和定序数据的视觉通道，而色调属于编码定性数据的视觉通道。而在 F2 中并不如此详细区分，统一使用 color 方法进行映射配置。

color 支持的映射语法如下：

- `color('field')`，field 为数据中字段名，这时候 F2 会在内部调用默认的回调函数，读取默认提供的颜色进行数据值到颜色值的映射；

- `color('field', colors)`，将数据值映射至指定的颜色值 colors（可以是字符串也可以是数组），此时用于通常映射分类数据；

- `color('field', 'color1-color2-colorN')`，指定颜色的渐变路径，用于映射连续的数据；

- `color('field', callback)`，使用回调函数进行颜色值的自定义；可以使用多个字段使用*号连接

- `color('#ffffff')`， 直接指定颜色常量，不进行数据映射。


### 分类数据的颜色映射

将 `city` 属性的数据值映射至制定的颜色来区分不同的城市。

`.color('city', [ '#40A9FF', '#FF7875', '#FFC069' ])`

![](https://gw.alipayobjects.com/zos/rmsportal/FPXEtZTmKGVleSoVTDSL.png#align=left&display=inline&height=260&originHeight=500&originWidth=720&status=done&width=375)

### 连续数据的颜色映射

对于连续的数据，我们可以为 color 指定颜色渐变的路径，以可视化数据在某一范围的变化趋势。 `.color('sales', '#BAE7FF-#1890FF-#0050B3')`

![](https://gw.alipayobjects.com/zos/rmsportal/heFYrrRgMWDvWsAbsJRq.png#align=left&display=inline&height=260&originHeight=498&originWidth=718&status=done&width=375)

### 使用回调函数

有时候颜色需要根据字段值进行特殊的指定，所以 F2 提供了回调函数来指定图形的颜色。

```javascript
// 根据单个字段计算颜色
chart.point().position('x*y').color('z', z => {
  if (z >= 100) {
    return 'red';
  }
  return 'blue';
});

// 根据多个字段计算颜色
chart.point().position('x*y').color('level*value', (level, value) => {
  if (level < 2) {
    if (value > 10) {
      return 'green';
    }
    return 'blue';
  } else {
    if (value > 20) {
      return '#cdcdcd';
    }
    return 'red';
  }
});
```

## shape

不同的几何标记有不同的 shape（图形形状）。shape 这个视觉通道受其他几个视觉通道影响，比如：interval 几何标记的 shape 可以是填充的矩形 rect 也可是空心的边框矩形，这个就决定了是将 color 映射到填充色上还是映射到边框颜色上。shape 方法的使用方式比较简单，常用于映射分类数据：

- `shape('field')`，将指定的字段映射到内置的 shapes 数组中；

- `shape('field', shapes)`，用户自己提供 shapes 数据，来进行数据映射；

- `shape('fields', callback)`，使用回调函数获取 shape，用于个性化的 shape 定制，可以根据单个或者多个字段确定；

- `shape('circle')`，指定常量，将所有数据值映射到固定的 shape。


另外 F2 提供了自定义 shape 的功能，用户可以自己绘制需要的 shape，详见[自定义 shape](https://www.yuque.com/antv/f2/api-shape)。

### geom 和 shape

使用几何标记实现各种图表类型时，对于每一种几何标记来说，图形在绘制的时候有不同的形状（shape)，在[几何标记](https://www.yuque.com/antv/f2/geometry) 章节已列出了目前 F2 提供的 geom 默认支持的 shape。

`.shape('cat', [ 'circle', 'rect' ])`

### 使用回调函数

shape 也可以通过字段值来计算，可以在 shape 方法中指定单个或者多个字段，通过回调函数返回指定的 shape。

```javascript
chart.point()
  .position('x*y')
  .shape('value', (value) => {
    if (value > 10) {
      return 'circle';
    }
    return 'rect';
  });
```

## size

对于不同的几何标记含义不完全一致：

- 对于 point 点来说，size 对应着点的半径；

- 对于 line 线来说，size 对应着线的粗细；

- 对于 interval 柱状图来说，size 对应着柱子的宽度。


所以从可视化的角度分析，大小（size)是一个复杂的视觉通道。

在 F2 中，支持如下几种方式的映射语法：

- `size('field')`，指定映射到 size 的字段，使用内置的默认大小范围为 [1, 10]；

- `size('field', [ ${min}, ${max} ])`，指定映射到 size 字段外，还提供了 size 的最大值和最小值范围；

- `size('fields', callback)`，使用回调函数映射 size，用于个性化的 size 定制，可以使用多个字段进行映射；

- `size(10)` 直接指定像素大小。


在气泡图中，常常使用 size 图形属性映射，用于编码更多维度的数据。如下例，使用气泡图来可视化每个国家人均国内生产总值同人均寿命之间的相关关系，同时将各个国家人口数据映射至气泡的大小。

`.size('Population', [ 4, 65 ])`

![](https://gw.alipayobjects.com/zos/rmsportal/HcFhyBHVJuoRzXNzPheF.png#align=left&display=inline&height=261&originHeight=502&originWidth=720&status=done&width=375)

### 回调函数的使用

size可以根据数据的字段值通过回调函数计算，可以指定多个字段

```javascript
chart.point().position('x*y').size('z', z => {
  if (z > 10) {
    return 20;
  }
  return z * 0.5;
});

chart.point().position('x*y').size('level*text', (level, text) => {
  if (level === 0) {
    return 50;
  }
  return text.length * 10; // 根据文本长度返回长度
});
```

## Geom 支持的图形属性

前面提到过，每种几何标记支持的视觉通道有所差异，数据和视觉通道的映射关系也不完全相同。 下表列出了各个 geom 几何标记对各个图形属性的支持情况：

| **几何标记** | **position** | **color** | **size** | **shape** |
| --- | --- | --- | --- | --- |
| point | 支持 | 支持 | 支持 | 支持 |
| path、line | 支持 | 支持 | 支持 | 支持 |
| area | 支持 | 支持 | `不支持` | 支持 |
| interval | 支持 | 支持 | 支持 | 支持 |
| polygon | 支持 | 支持 | `不支持` | 支持 |
| schema | 支持 | 支持 | 支持 | 支持 |

