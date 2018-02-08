# Guide

用于绘制图表的辅助元素，该方法的返回值不为 chart 对象，而是一个 guide 对应的控制类 guideController。 包括辅助线、辅助文本、辅助框、辅助弧线（只在极坐标下适用）、辅助 html。

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

- `start`: Array | Function

指定辅助线的起始位置，该值的类型如下：
  + array: 数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：
    * x，y 都是原始数据 [ '2010-01-01', 200 ];
    * x，y 可以使用原始数据的替代字符串 'min', 'max', 'median' , 例如：[ 'median', 200 ]
    * x, y 都是用百分比的形式，在绘图区域定位，字符串中存在 '%', 例如 [ '50%', '50%' ] 使得辅助元素居中
  + function: 回调函数，可以动态的确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景

```js
chart.guide().line({
   /**
   * 设置辅助线的起始点
   * @param  {Scale} xScale x 轴对应的度量
   * @param {Scale} yScale y 轴对应的度量
   * @return {Array} 返回值必须为数组格式
   */
  start(xScale, yScale) {
    return []; // 位置信息
  },
  /**
   * 设置辅助线的终止点
   * @param  {Scale} xScale x 轴对应的度量
   * @param {Scale} yScale y 轴对应的度量
   * @return {Array} 返回值必须为数组格式
   */
  end(xScale, yScale) {
    return []; // 位置信息
  }
});
```

- `end`: array | function

指定辅助线的结束位置，使用同 start。

- `style`: object

用于设置辅助线的显示样式，详见[绘图属性](./canvas.md)。

### Text

chart.guide().text({})
绘制辅助文本。
exit: ⌘ ↩
chart.guide().text({
  top: {boolean}, // 指定 guide 是否绘制在 canvas 最上层，默认为 true, 即绘制在最上层
  position: {function} | {array}, // 文本的起始位置，值为原始数据值，支持 callback
  content: {string}, // 显示的文本内容
  style: {
    fill: '#666', // 文本颜色
    fontSize: '12', // 文本大小
    fontWeight: 'bold' // 文本粗细
    rotate: 30 // 旋转角度
  }, // 文本的图形样式属性
  offsetX: {number}, // x 方向的偏移量
  offsetY: {number} // y 方向偏移量
});
参数
top: boolean
指定 guide 是否绘制在 canvas 最上层，默认为 true, 即绘制在最上层。
position: array | function
指定辅助文本的显示位置，该值的类型如下：
array: 数组来配置位置 [ x, y ]，根据数组中的值的存在以下几种形式：
x，y 都是原始数据 [ '2010-01-01', 200 ];
x，y 可以使用原始数据的替代字符串 'min', 'max', 'median' , 例如：[ 'median', 200 ]
x, y 都是用百分比的形式，在绘图区域定位，字符串中存在 '%', 例如 [ '50%', '50%'] 使得辅助元素居中
function: 回调函数，可以动态的确定辅助元素的位置，应用于数据动态更新，辅助元素的位置根据数据变化的场景
exit: ⌘ ↩
chart.guide().text({
  /**
   * 设置辅助文本的显示位置
   * @param  {Scale} xScale x 轴对应的度量
   * @param {Scale} yScale y 轴对应的度量
   * @return {Array} 返回值必须为数组格式
   */
  position(xScale, yScale) {
    return []; // 位置信息
  },
  content: '最大值'
});
content: string
辅助文本的显示内容。
style: object
用于设置辅助文本的显示样式，详见绘图属性。
offsetX: number
设置辅助文本 x 方向的偏移量。
offsetY: number
设置辅助文本 y 方向的偏移量。

