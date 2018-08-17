# Guide

用于绘制图表的辅助元素，该方法的返回值不为 chart 对象，而是一个 guide 对应的控制类 guideController。 包括辅助线、辅助文本、辅助框、辅助弧线（只在极坐标下适用）、辅助 html。

## 如何引入 Guide

Guide 作为 F2 的插件，如果需要使用的话，需要先将该组件注册入 Chart 类或者 Chart 实例。而如果你默认加载的是完整的 F2 代码，那么 Guide 已经注册至 Chart 类中，如果您采用动态引用的策略，那么需要先将该组件注册入 Chart 类或者 Chart 实例。

```js
const F2 = require('@antv/f2/lib/core');

// 第一步：加载需要的 guide 组件，可以选择加载全部，也可以选择只加载需要的 Guide 组件
require('@antv/f2/lib/component/guide'); // 加载全部的 guide 组件

require('@antv/f2/lib/component/guide/arc'); // 只加载 Guide.Arc 组件
require('@antv/f2/lib/component/guide/html'); // 只加载 Guide.Html 组件
require('@antv/f2/lib/component/guide/text'); // 只加载 Guide.Text 组件
require('@antv/f2/lib/component/guide/rect'); // 只加载 Guide.Rect 组件
require('@antv/f2/lib/component/guide/line'); // 只加载 Guide.Line 组件
require('@antv/f2/lib/component/guide/tag'); // 只加载 Guide.Tag 组件

// 第二步：加载插件 Guide
const Guide = require('@antv/f2/lib/plugin/guide');

// 第三步：注册插件 Guide
F2.Chart.plugins.register(Guide); // 这里进行全局注册，也可以给 chart 的实例注册

// 给具体的 chart 实例注册
const chart = new F2.Chart({
  id: 'canvas',
  plugins: Guide
});
```

## API

### line

`chart.guide().line({})`

绘制辅助线。

```js
chart.guide().line({
  top: {Boolean}, // 指定 guide 是否绘制在 canvas 最上层，默认为 true, 即绘制在最上层
  start: {Function} | {Array}, // 辅助线起始位置，值为原始数据值，支持 callback
  end: {Function} | {Array}, // 辅助线结束位置，值为原始数据值，支持 callback
  style: {
    stroke: '#999', // 线的颜色
    lineDash: [ 0, 2, 2 ], // 虚线的设置
    lineWidth: 3 // 线的宽度
  } // 图形样式配置
});
```

#### 参数

- `top`: Boolean

指定 guide 是否绘制在 canvas 最上层，默认为 true, 即绘制在最上层。

- `start`: Array/Function

指定辅助线的起始位置，该值的类型如下：
  + Array: 数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：
    * x，y 都是原始数据 [ '2010-01-01', 200 ];
    * x，y 可以使用原始数据的替代字符串 'min', 'max', 'median' , 例如：[ 'median', 200 ]
    * x, y 都是用百分比的形式，在绘图区域定位，字符串中存在 '%', 例如 [ '50%', '50%' ] 使得辅助元素居中
  + Function: 回调函数，可以动态的确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

```js
chart.guide().line({
   /**
   * 设置辅助线的起始点
   * @param  {Scale} xScale x 轴对应的度量
   * @param {Array} yScales y 轴对应的度量的数组集合
   * @return {Array} 返回值必须为数组格式
   */
  start(xScale, yScales) {
    return []; // 位置信息
  },
  /**
   * 设置辅助线的终止点
   * @param  {Scale} xScale x 轴对应的度量
   * @param {Array} yScales y 轴对应的度量的数组集合
   * @return {Array} 返回值必须为数组格式
   */
  end(xScale, yScales) {
    return []; // 位置信息
  }
});
```

- `end`: Array/Functionn

指定辅助线的结束位置，使用同 start。

- `style`: Object

用于设置辅助线的显示样式，详见[绘图属性](./canvas.md)。

### Text

`chart.guide().text({})`

绘制辅助文本。

```ja
chart.guide().text({
  top: {Boolean}, // 指定 guide 是否绘制在 canvas 最上层，默认为 true, 即绘制在最上层
  position: {Function} | {Array}, // 文本的起始位置，值为原始数据值，支持 callback
  content: {String}, // 显示的文本内容
  style: {
    fill: '#666', // 文本颜色
    fontSize: '12', // 文本大小
    fontWeight: 'bold' // 文本粗细
    rotate: 30 // 旋转角度
  }, // 文本的图形样式属性
  offsetX: {Number}, // x 方向的偏移量
  offsetY: {Number} // y 方向偏移量
});
```

#### 参数

- `top`: Boolean

指定 guide 是否绘制在 canvas 最上层，默认为 true, 即绘制在最上层。

- `position`: Array/Function

指定辅助文本的显示位置，该值的类型如下：

  + Array: 数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：
    * x，y 都是原始数据 [ '2010-01-01', 200 ];
    * x，y 可以使用原始数据的替代字符串 'min', 'max', 'median' , 例如：[ 'median', 200 ]
    * x, y 都是用百分比的形式，在绘图区域定位，字符串中存在 '%', 例如 [ '50%', '50%'] 使得辅助元素居中
  + Function: 回调函数，可以动态的确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

```js
chart.guide().text({
  /**
   * 设置辅助文本的显示位置
   * @param  {Scale} xScale x 轴对应的度量
   * @param {Array} yScales y 轴对应的度量的数组集合
   * @return {Array} 返回值必须为数组格式
   */
  position(xScale, yScales) {
    return []; // 位置信息
  },
  content: '最大值'
});
```

- `content`: String

辅助文本的显示内容。

- `style`: Object

用于设置辅助文本的显示样式，详见绘图属性。

- `offsetX`: Number

设置辅助文本 x 方向的偏移量。

- `offsetY`: Number

设置辅助文本 y 方向的偏移量。

### Tag

`chart.guide().tag({})`

绘制辅助 Tag。

<img src="https://gw.alipayobjects.com/zos/rmsportal/dMuqNQRONIlKlJOyTRJS.png" style="width: 242px;">


```js
chart.guide().tag({
  top: {Boolean}, // 指定 guide 是否绘制在 canvas 最上层，默认为 true, 即绘制在最上层
  position: {Function} | {Array}, // Tag 的起始位置，值为原始数据值，支持 callback
  content: {String}, // tag 的文本内容，支持文本换行，只需要在文本中写入 '\n'，如 '最大值\n200'
  direct: {String}, // 箭头朝向，默认自动计算，也可以手动指定方向，'tl'、'tc'、'tr'、'cl'、'cr'、'bl'、'bc'、'br'
  side: {Number}, // 三角标的边长，默认为 4
  offsetX: {Number}, // X 轴偏移，默认为 0
  offsetY: {Number}, // Y 轴偏移，默认为 0
  background: {
    padding: [ 4, 6 ], // tag 内边距，使用同 css 盒模型的 padding
    radius: 2, // tag 圆角
    fill: '#1890FF', // tag 背景色
  }, // tag 背景样式
  textStyle: {
    fontSize: 12,
    fill: '#fff'
  }, // tag 文本样式
  withPoint: {Boolean}, // 是否带点，默认带
  pointStyle: {
    fill: '#1890FF', // 填充颜色
    r: 3, // 半径
    lineWidth: 1, // 线的边框
    stroke: '#fff' // 线的描边
  } // 点的样式
});
```

#### 参数

- `top`: Boolean

指定 guide 是否绘制在 canvas 最上层，默认为 true, 即绘制在最上层。

- `position`: Array/Function

指定辅助 Tag 的显示位置，该值的类型如下：

  + Array: 数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：
    * x，y 都是原始数据 [ '2010-01-01', 200 ];
    * x，y 可以使用原始数据的替代字符串 'min', 'max', 'median' , 例如：[ 'median', 200 ]
    * x, y 都是用百分比的形式，在绘图区域定位，字符串中存在 '%', 例如 [ '50%', '50%'] 使得辅助元素居中
  + Function: 回调函数，可以动态的确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

```js
chart.guide().tag({
  /**
   * 设置辅助文本的显示位置
   * @param  {Scale} xScale x 轴对应的度量
   * @param {Array} yScales y 轴对应的度量的数组集合
   * @return {Array} 返回值必须为数组格式
   */
  position(xScale, yScales) {
    return []; // 位置信息
  },
  content: '最大值'
});
```

- `content`: String

辅助 tag  的显示内容。

- `direct`: String

Tag 箭头的方向，默认自动计算，用户也可以手动设置，该方向相对于 point，可设置值为：'tl'、'tc'、'tr'、'cl'、'cr'、'bl'、'bc'、'br'，如下如所示：

<img src="https://gw.alipayobjects.com/zos/rmsportal/hyRzDvMdRVwukHVfmGWL.png" width="50%">

- `side`: Number

Tag 箭头的边长，默认为 4px。

- `offsetX`: Number

设置 Tag x 方向的偏移量。

- `offsetY`: Number

设置 Tag y 方向的偏移量。

- `background`: Object

Tag 的背景样式设置，可设置的属性如下，详见[绘图属性](./canvas.md)：

```js
background: {
  padding: [ 4, 6 ], // tag 内边距，用法同 css 盒模型的 padding
  radius: 2, // tag 圆角
  fill: '#1890FF', // tag 背景填充颜色
  // 其他绘图属性
}
```

- `textStyle`: Object

Tag 的字体样式设置，可设置的属性如下，详见[绘图属性](./canvas.md)：

```js
textStyle: {
  fontSize: 12, // 字体大小
  fill: '#fff' // 字体颜色
}
```

- `withPoint`: Boolean

是否带点，默认为 true，如果要关闭将其值设置为 false 即可。

- `pointStyle`: Object

点的样式配置。

### Rect

`chart.guide.rect({})`

辅助背景框。

```js
chart.guide().rect({
  top: {Boolean}, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
  start: {Function} | {Array}, // 辅助框起始位置，值为原始数据值，支持 callback
  end: {Function} | {Array},// 辅助框结束位置，值为原始数据值，支持 callback
  style: {
    lineWidth: 0, // 辅助框的边框宽度
    fill: '#f80', // 辅助框填充的颜色
    fillOpacity: 0.1, // 辅助框的背景透明度
    stroke: '#ccc' // 辅助框的边框颜色设置
  } // 辅助框的图形样式属性
});
```

#### 参数

- `top`: Boolean

指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层。

- `start`: Array/Function

指定辅助背景框的起始位置，该值的类型如下：

  + Array: 数组来配置位置 [ x, y]，根据数组中的值的存在以下几种形式：
    * x，y 都是原始数据 [ '2010-01-01', 200 ];
    * x，y 可以使用原始数据的替代字符串 'min', 'max', 'median' , 例如：[ 'median', 200 ]
    * x, y 都是用百分比的形式，在绘图区域定位，字符串中存在 '%', 例如 [ '50%', '50%' ] 使得辅助元素居中
  + Function: 回调函数，可以动态的确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

```js
chart.guide().rect({
  /**
   * 设置辅助框的起始点
   * @param  {Scale} xScale x 轴对应的度量
   * @param {Array} yScales y 轴对应的度量的数组集合
   * @return {Array} 返回值必须为数组格式
   */
  start(xScale, yScales) {
    return []; // 位置信息
  },
  /**
   * 设置辅助框的终止点
   * @param  {Scale} xScale x 轴对应的度量
   * @param {Array} yScales y 轴对应的度量的数组集合
   * @return {Array} 返回值必须为数组格式
   */
  end(xScale, yScales) {
    return []; // 位置信息
  }
});
```

- `end`: Array/Function

指定辅助背景框的结束位置，该属性用法同 start。

- `style`: Object

用于设置辅助背景框的样式，详见绘图属性。

### Html

`chart.guide().html({})`

辅助 html。

```js
chart.guide().html({
  position: {Function} | {Array}, // html 的中心位置， 值为原始数据值，支持 callback
  alignX: 'left' | 'center' | 'right',
  alignY: 'top' | 'middle' | 'bottom',
  offsetX: {Number},
  offsetY: {Number},
  html: {String} // html 代码
});
```

#### 参数

- `position`: Array/Function

设置 html 的显示位置，该值的类型如下：

  + Array: 数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：
    * x，y 都是原始数据 [ '2010-01-01', 200 ];
    * x，y 可以使用原始数据的替代字符串 'min', 'max', 'median' , 例如：[ 'median', 200 ]
    * x, y 都是用百分比的形式，在绘图区域定位，字符串中存在 '%', 例如 [ '50%', '50%' ] 使得辅助元素居中
  + Function: 回调函数，可以动态的确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

```js
chart.guide().html({
  /**
   * 设置辅助 html 的显示位置
   * @param  {Scale} xScale x 轴对应的度量
   * @param {Array} yScales y 轴对应的度量的数组集合
   * @return {Array} 返回值必须为数组格式
   */
  position(xScale, yScales) {
    return []; // 位置信息
  },
  html: '<p>最大值</p>'
});
```

- `alignX`: String

html 的水平对齐方式，可取值为： left、center、right，默认值为 center。

- `alignY`: String

html 的垂直对齐方式，可取值为： top、middle、bottom，默认值为 middle。

- `html`: String

需要显示的 html 内容。

- `offsetX`: Number

设置 html 在 x 方向的偏移量。

- `offsetY`: Number

设置 html 在 y 方向的偏移量。

### Arc

`chart.guide().arc({})`

辅助圆弧，只适用于极坐标。

```js
chart.arc({
  top: {Boolean}, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
  start: {Object} | {Function} | {Array}, // 辅助框起始位置，值为原始数据值，支持 callback
  end: {Object} | {Function} | {Array},// 辅助框结束位置，值为原始数据值，支持 callback
  style: {Object} // 图形样式属性
});
```

#### 参数

- `top`: Boolean

指定 guide 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层。

- `start`: Array|Function

指定辅助圆弧的起始位置，该值的类型如下：

  + Array: 数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：
    * x，y 都是原始数据 [ '2010-01-01', 200 ];
    * x，y 可以使用原始数据的替代字符串 'min', 'max', 'median' , 例如：[ 'median', 200 ]
    * x, y 都是用百分比的形式，在绘图区域定位，字符串中存在 '%', 例如 [ '50%', '50%' ] 使得辅助元素居中
  + Function: 回调函数，可以动态的确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

```js
chart.guide().arc({
  /**
   * 设置辅助弧线的起始点
   * @param  {Scale} xScale x 轴对应的度量
   * @param {Array} yScales y 轴对应的度量的数组集合
   * @return {Array} 返回值必须为数组格式
   */
  start(xScale, yScales) {
    return []; // 位置信息
  },
  /**
   * 设置辅助弧线的终止点
   * @param  {Scale} xScale x 轴对应的度量
   * @param {Array} yScales y 轴对应的度量的数组集合
   * @return {Array} 返回值必须为数组格式
   */
  end(xScale, yScales) {
    return []; // 位置信息
  }
});
```

- `end`: Array/Function

指定辅助圆弧的结束位置，该属性用法同 start。

- `style`: Object

设置圆弧的显示样式，详见绘图属性。


### 清空 guides

```js
chart.guide().clear();
```

