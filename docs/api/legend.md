# Legend

F2 图例的生成是由图形语法中的图形属性决定的，我们会根据图形属性映射以及数据的类型自动生成不同类型的图例： color, size 这两个图形属性如果判断接收的参数是数据源的字段时，会自动生成不同的图例：

1. color, 会赋予不同的图例项不同的颜色来区分图形，如果该字段是分类类型，则会生成离散图例，如果是连续类型，则会生成连续图例（本期未支持）
2. size, 在图例上显示图形的大小 （本期未支持）


## 如何引入图例

Legend 作为 F2 的插件，如果需要使用的话，需要先将该组件注册入 Chart 类或者 Chart 实例。

```js
import { Plugin, Chart } from '@antv/f2';
Chart.plugins.register(Plugin.Legend); // 方式一：全局注册 

// 方式二：具体的 chart 实例注册
const chart = new Chart({
  id: 'canvas',
  plugins: Plugin.Legend
});

// 动态引入方式，然后使用上述方式注册
const { Legend } = require('@antv/f2/lib/plugin/');
```

## API

### `chart.legend(false)`

不显示所有的图例。

### `chart.legend(field, false)`

不显示 field 字段对应的图例。

- `field`: String

代表图例对应的数据字段名。

### `chart.legend(field, config)`

为 field 对应的图例进行配置。如下所示：

```js
chart.legend('gender', {
  position: 'right'
});
```

- `field`: String

代表图例对应的数据字段名。

- `config`: Object

图例的配置信息，支持的属性如下：

#### 参数

- `position`: String

设置图例的显示位置，可设置的值为：top、right、bottom、left，分别表示上、右、下、左。默认为 top。

- `align`: String

当 `position` 为 'top'，'bottom' 时生效，用于设置水平方向上图例的对齐方式，可设置的值为：'left'、'center'、'right' ，默认为 'left' ，左对齐。

| left（默认） |center | right |
| -------- | -------- | -------- |
| ![undefined](https://gw.alipayobjects.com/zos/skylark/14e43b86-b0d3-46bf-aa61-d9d35e40afc3/2018/png/58dffd37-ac70-466a-8ab0-7ff729927c52.png)     | ![undefined](https://gw.alipayobjects.com/zos/skylark/8b616505-6336-4423-b600-ef0eda5e43cf/2018/png/71cffe7e-2cec-4a64-98d0-30dc25e601a5.png) |  ![undefined](https://gw.alipayobjects.com/zos/skylark/a954ed14-8b32-4cdd-8e7e-c018d642cd2c/2018/png/d58b8647-c5b2-4f03-906d-4438665369b9.png)  |

- `verticalAlign`: String

当 `position` 为 'left'、'right' 时生效，用于设置垂直方向上图例的对齐方式，可设置的值为：'top'、'middle'、'bottom'，默认为 'middle'，居中对齐。

| center（默认） | top | bottom |
| -------- | -------- | -------- |
| ![undefined](https://gw.alipayobjects.com/zos/skylark/3e351090-9e91-44b7-9c79-9fae1576a83e/2018/png/90d4ab82-0baa-429c-a92a-eb06c51e9b0d.png)  | ![undefined](https://gw.alipayobjects.com/zos/skylark/a6d8e7cd-951b-409e-96c7-b76a49ec0405/2018/png/6504d001-3bd8-4e3d-acd9-0c1fda595a0f.png)  | ![undefined](https://gw.alipayobjects.com/zos/skylark/e5a77ada-f4bc-4acd-9611-aac5f9769a41/2018/png/795f70b0-89bc-4b1b-a8d6-b26b543521c4.png)   |

- `itemWidth`: Number | 'auto'

用于设置每个图例项的宽度，默认为 'auto'，即使用 F2 默认的图例布局计算 `itemWidth`。如果 `itemWidth` 为 null，则会根据每个图例项自身的宽度计算，另外用户也可以自己设置 `itemWidth` 的数值。

- `showTitle`: Boolean

是否显示图例标题，默认值为 false，即不展示。

- `titleStyle`: Object

图例标题的显示样式设置，详见[绘图属性](./canvas.md)。

```js
titleStyle: {
  textAlign: 'center', // 文本对齐方向，可取值为： start middle end
  fill: '#404040', // 文本的颜色
  fontSize: 12, // 文本大小
  fontWeight: 'bold', // 文本粗细
  textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
}
```

- `offsetX`: Number

图例 x 方向的整体偏移值，数值类型，数值单位为 'px'，默认值为 0。

- `offsetY`: Number

图例 Y 方向的整体偏移值，数值类型，数值单位为 'px'，默认值为 0。

- `titleGap`: Number

标题距离图例项的间距，默认为 12px，如果不展示标题，不生效。

- `itemGap`: Number

每个图例项水平方向上的间距，默认值为 12px。

- `itemMarginBottom`: Number

每个图例项下方留白间距，默认值为 12px。

- `wordSpace`: Number

marker 和文本之间的间距，默认值为 6px。

- `unCheckColor`: String

用于取消选中的图例 marker 以及文本的颜色。

- `itemFormatter`: Function

回调函数，用于格式化图例每项的文本显示。

```js
itemFormatter(val) {
  return val; // val 为每个图例项的文本值
}
```

- `marker`: String | Function | Object

用于设置图例的 marker 样式，默认为 circle 即圆形。

1. String 类型

当为 String 类型时，即表示使用 F2 默认提供的类型，支持的类型如下：

| marker 类型 | 样式 |
| -------- | -------- |
| 'circle'     | ![undefined](https://gw.alipayobjects.com/zos/skylark/9f52dd0d-104a-451d-9e56-8423e20c4581/2018/png/6780ea94-a9ca-452d-b9c8-8a1e74f8b73d.png)  |
| 'square' | ![undefined](https://gw.alipayobjects.com/zos/skylark/a31497a6-23ae-4512-8eb8-7d697f158be9/2018/png/406e0df1-7d97-4361-be25-0f20e85418f7.png)  |

2. Object 类型

marker 为 Object 时，可以配置 symbol、radius 以及一些绘图属性。

```js
marker: {
  symbol: 'circle', // marker 的形状
  radius: 5 // 半径大小
}
```

3. Function 类型

用于自定义 shape，使用方式如下，

```js
/**
 * 自定义 marker 形状
 * @param  {number} x   该 marker 的横轴坐标
 * @param  {number} y   该 marker 的纵轴坐标
 * @param  {number} r   该 marker 的半径大小
 * @param  {object} ctx canvas 的上下文对象
 * @return {null}     
 */
marker(x, y, r, ctx) {}
```

以下代码绘制了如图所示的 marker：![undefined](https://gw.alipayobjects.com/zos/skylark/041d2fef-a068-4012-ac28-2439e15bdbda/2018/png/c541e6b3-8f37-4cc9-b8bb-fd97345ef7da.png) 

```js
chart.legend('city', {
  marker(x, y, r, ctx) {
    ctx.lineWidth = 2;
    ctx.strokeStyle = ctx.fillStyle;
    ctx.moveTo(x - r - 3, y);
    ctx.lineTo(x + r + 3, y);
    ctx.stroke();
    ctx.arc(x, y, r - 1, 0, Math.PI * 2, false);
    ctx.fill();
  }
});
```

- `nameStyle`: Object

<img src="https://gw.alipayobjects.com/zos/skylark/519b406c-f6c6-4f6b-adda-7f25a927aa53/2018/png/2ac06b01-85ec-45fa-9c53-aa742108df9e.png" style="width: 50%;">

用于设置图例项的文本样式，详见[绘图属性](./canvas.md)。

```js
nameStyle: {
  textAlign: 'center', // 文本对齐方向，可取值为： start middle end
  fill: '#404040', // 文本的颜色
  fontSize: '12', // 文本大小
  fontWeight: 'bold', // 文本粗细
  textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
}
```

- `valueStyle`: Object

用于设置图例项的文本样式，详见[绘图属性](./canvas.md)。

```js
valueStyle: {
  textAlign: 'center', // 文本对齐方向，可取值为： start middle end
  fill: '#404040', // 文本的颜色
  fontSize: '12', // 文本大小
  fontWeight: 'bold', // 文本粗细
  textBaseline: 'top' // 文本基准线，可取 top middle bottom，默认为middle
}
```

- `triggerOn`: String|Function

图例筛选行为的触发事件，默认为 `click`。

1. String 类型 

定义别的事件类型。

2. Function 类型

当不处于 html5 环境时，用于方便用户自己去绑定事件。

```js
/**
 * 用户自己去绑定或者解绑事件
 * @param {Function} method 该事件的处理函数
 * @param {String} type 'bind' 表示绑定 'unbind' 表示解绑
 */
triggerOn(method, type) {
  // user's code
}
```

- `clickable`: Boolean

设置图例项是否允许点击，默认为 true，即允许点击。

- `onClick`: Function

用于自定义鼠标点击图例项的交互，当 clickable 为 false 不生效。

```js
/**
 * 自定义图例项点击事件， clickable 为 false 不生效
 * @param  {object} ev 事件对象
 * @return {null}
 */
onClick: ev => {}
```

- `custom`: Boolean

默认为 false，当 `custom` 为 true，表示不使用默认生成的图例，允许用户自定义图例，包括具体的图例项以及 click 交互。

自定义图例时需要用户自己声明具体的图例项 `items`(该属性是一个对象数组，数组中每一项为一个对象类型，结构为：`{ value: '', marker:{fill: 'red'}}`)以及图例项的 `onClick` 事件。

`marker` 的格式可以为数组或者字符串。

```js
chart.legend({ custom: true, items: [], onClick(){} });
chart.legend('field', { custom: true, items: [], onClick(){} });
```

具体使用如下：

```js
chart.legend('city', {
  custom: true,
  position: 'left',
  items: [
    { value: 'a1', marker: 'triangle', fill: 'red'},
    { value: 'a2', marker: 'triangle', fill: 'blue'},
    { value: 'a3', marker: 'triangle', fill: 'green'}
  ]
});
chart.legend('city', {
  custom: true,
  position: 'left',
  items: [
    { value: 'a1', marker: { symbol: 'triangle', stroke: 'red', radius: 8 }},
    { value: 'a2', marker: { symbol: 'triangle', stroke: 'green', radius: 8 }},
    { value: 'a3', marker: { symbol: 'triangle', stroke: 'blue', radius: 8 }}
  ]
});
chart.legend({
  custom: true,
  position: 'left',
  items: [
    { value: 'a1', marker: 'triangle', fill: 'red'},
    { value: 'a2', marker: 'triangle', fill: 'blue'},
    { value: 'a3', marker: 'triangle', fill: 'green'}
  ]
});
```















