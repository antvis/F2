# Geom 

几何标记对象，决定创建图表的类型，具体的概念介绍请参见 [Geom](../chart-concept/geometry.md)。

语法实例：

```js
chart.<geomType>()
  .position()
  .size()
  .color()
  .shape()
  .adjust()
  .style();
```

下面是一条简单的绘制柱状图的语法，声明完使用的 geom 类型之后，就可以进行图形上的各种图形属性映射，下面我们会进行详述。

```js
chart.interval().position('x*y').color('x');
```

注意：上述 `chart.interval()` 返回的不是 chart 对象，而是一个 geom 几何标记对象 Geom。

以下是目前 Geom 的基本类型：

type | 说明
--- | ---
`point` | 点，用于点图的构建。
`path` | 路径，无序的点连接而成的一条线。
`line` | 线，点按照 x 轴连接成一条线，构成线图。
`area` | 填充线图跟坐标系之间构成区域图，也可以指定上下范围。
`interval` | 使用矩形或者弧形，用面积来表示大小关系的图形，一般构成柱状图、饼图等图表。
`polygon` | 多边形，可以用于构建热力图、地图等图表类型。
`schema` | k线图，箱型图。

Geom 支持的接口可以分为三大类：

1. 数据映射相关的属性函数: `position`, `color`, `shape`, `size`；
2. 显示辅助信息的函数:  `style`；
3. 额外的控制函数: `adjust`。

## 方法

### position

将数据值映射到图形的位置上的方法。

```js
line().position('x*y');
line().position([ 'x', 'y' ]);
```

#### position('fieldA*fieldB')

使用 `*` 连接，position 属性会对多个字段进行数据的映射，如：cut*price，x*y 等，用于二维坐标系图表的绘制。

以 chart.point().position('x*y') 为例，point 代表图形，即最后需要生成点图，而 position 代表位置，position('x*y') 代表数据在图形中的位置由 x 和 y 这两个维度的变量决定，x * y 的数据处理结果可以理解为：

![image](https://gw.alipayobjects.com/zos/rmsportal/EcuDeyeTOsztVOuxmZPe.png)

(x1, y1) 这样的数值对，最后就会被转换为画布上对应的坐标点。

另外，也可以以数组格式传入：`chart.geom().position([ 'fieldA', 'fieldB' ])`

### color

将数据值映射到图形的颜色上的方法。

```js
line().color('red'); // 常量颜色
line().color('type'); // 对 type 字段进行映射，使用内置的颜色
line().color('type', [ 'red', 'blue' ]) // 指定颜色
line().color('type', (type) => { // 通过回调函数
  if (type === 'a') {
    return 'red';
  }
  return 'blue';
});
line().color('type*value', (type, value) => { //多个参数，通过回调函数
  if (type === 'a' && value > 100) {
    return 'red';
  }
  return 'blue';
});
```

#### color(value)

##### 参数

- `value`: string

  只支持接收一个参数，value 可以是：

  - 映射至颜色属性的数据源字段名，如果数据源中不存在这个字段名的话，则按照常量进行解析，这个时候会使用 F2 默认提供的颜色。
  - 也可以直接指定某一个具体的颜色值 color，如 '#fff', 'white' 等。

##### 代码示例

```js
chart.point().position('x*y').color('x'); // 对 x 字段进行映射，使用内置的颜色
chart.point().position('x*y').color('red'); // 所有点用红色渲染
```

#### color(field, colors)

##### 参数

- `field`: string

  field 为映射至颜色属性的数据源字段名，也支持指定多个参数。

- `colors`: string | array | function

  colors 的参数有以下情况：

  + 如果为空，即未指定颜色的数组，那么使用内置的全局的颜色；
  + 如果需要指定颜色，则需要以数组格式传入，那么分类的颜色按照数组中的颜色确定。对于颜色的分配顺序，会默认按照原始数据源中字段的顺序进行分配；
  + 还支持渐变颜色设置：'color1-color2'，用于指定一个渐变色，数据根据分类或者连续类型，在渐变的颜色区间内取颜色。

  ```js
  chart.point().position('x*y').color('z'); // 使用默认的颜色
  chart.point().position('x*y').color('z', [ 'red', 'blue' ]); // 使用传入的指定颜色
  chart.point().position('x*y').color('z', 'red-blue'); // 使用渐变色
  ```

  + colors 如果是回调函数，则该回调函数的参数为对应字段的数值，具体使用如下，当 color 映射为多个字段时，参数按照字段声明的顺序传入：

  ```js
  chart.point().position('x*y').color('z', (value) => {
    if(value === 1) {
      return 'red'
    }
  
    return 'blue';
  });
  ```

### shape

将数据值映射到图形的形状上的方法。

```js
point.shape('circle'); // 常量
point.shape('type'); // 使用字段映射到形状，使用内置的形状
point.shape('type', [ 'circle', 'hollowCircle', 'rect' ]); // 指定形状
point.shape('type', (type) => { // 回调函数
  if(type === 'a') {
    return 'circle';
  }
  return 'rect';
});
```

#### shape(shape)

##### 参数

- `shape`: string

  只支持接收一个参数，指定几何图像对象绘制的形状。下表列出了不同的 geom 几何图形对象支持的 shape 形状：

geom 类型 | shape 类型 | 解释
-------|---------|----
point | 'circle', 'hollowCircle', 'rect' | 默认为 'circle'
line| 'line', 'smooth', 'dash'| dash：虚线，smooth： 平滑线
area| 'area', 'smooth' | 填充内容的区域图
interval| 'rect' | 
polygon | 'polygon' | 
schema| 'candle'| 目前仅 K 线图

##### 代码示例

```js
chart.point().position('x*y').shape('rect'); // 指定所有点的图形是正方形
```

#### shape(field, shapes)

指定多个图形，图形的顺序跟字段的值对应。

##### 参数

- `field`: string

  field 为映射至颜色属性的数据源字段名。

- `shapes`: string | array

  shapes 是一个可选参数，如果没有声明会按照 F2 默认为特定 geom 类型配置的形状进行渲染，当然用户也可自己指定渲染的形状，具体的形状已在上面列出，下面是 F2 为特定的几何图形对象提供的 shapes:

  ```js
  const shapes = {
    line: [ 'line', 'dash' ],
    point: [ 'circle', 'hollowCircle' ]
  };
  ```

#### shape(field, callback)

通过回调函数设置图形类型.

##### 参数

- `field`: string

  field 为映射至颜色属性的数据源字段名。

- `callback`: function

  [Function] 回调函数

##### 代码示例

```js
chart.point().position('x*y').shape('z', (value) => {
  if (value === 1) {
    return 'circle'
  }
  return 'rect';
});
```

### size

将数据值映射到图形的大小上的方法。

```js
point.size(10); // 常量
point.size('type'); // 使用字段映射到大小
point.size('type', [ 0, 10 ]); // 使用字段映射到大小，并指定最大值和最小值
point.size('type', (type) => { // 回调函数
  if(type === 'a') {
    return 10;
  }
  return 5;
});
```

#### size(value）

传入数字常量，如 `chart.point().size(20)`。

**注意：** 不同图形的 size 的含义有所差别：

- point 图形的 size 影响点的半径大小；
- line, area, path 中的 size 影响线的粗细；
- interval 的 size 影响柱状图的宽度。

#### size(field)

根据 field 字段的值映射大小，使用默认的`最大值 max:10` 和`最小值 min: 1`。

##### 代码示例

```js
chart.point().position('x*y').size('z'); // 使用 z 字段的值来映射大小
```

#### size(field, [min, max])

根据 field 字段的值映射大小，使用声明的最大值 max 和最小值 min。

##### 代码示例

```js
chart.point().position('x*y').size('z', [ 10, 100 ]); // 使用 z 字段的值来映射大小，最大值为 100，最小值 10
```

#### size(field, callback)

使用回调函数控制图形大小。

##### 参数

- `callback`: function

回调函数。

##### 代码示例

```js
chart.point().position('x*y').size('z', (value) => {
  if(value === 1) {
    return 5;
  }
  return 10;
});
```

### adjust

声明几何标记对象的数据调整方式，可用于绘制层叠图、分组图等。支持单一的数据调整方式也支持各种数据调整方式的组合。

F2 支持的调整类型包括： 'stack', 'dodge'。

```js
interval().adjust('stack');
interval().adjust({
  type: 'stack'
});
interval().adjust([{
  type: 'dodge',
  marginRatio: 0, // 数值范围为 0 至 1，用于调整分组中各个柱子的间距
}]);
```

### style

用于配置几何标记显示的图形属性，详见[绘图属性](./canvas.md)。

有以下两种使用方式：

1. `style(cfg)`

参数：

- `cfg` Object 类型，配置绘图属性，详见[绘图属性](./canvas.md)

```js
line().style({ // 统一为所有 shape 设置固定的样式
  lineWidth: 2
});
```

2. `style(field, cfg)`  映射到字段的样式

参数：

- `field` String 类型，映射的字段名
- `cfg` Object 类型，配置绘图属性，**此时属性值也可以是回调函数**

```js
style('city', {
  lineDash(val) {
    if (val === 'HZ') {
      return [ 2, 2 ];
    }
    return null;
  }
})
```


