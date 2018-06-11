# Guide

Guide is used to draw auxiliary elements of a chart, it returns a guideController rather than a chart object. It includes guide line, guide text, guide border, guide arc (only used in polar coordinate), and guide html.

## How to require Guide

Guide serves as a plug-in for charts in F2. You need to register it to Chart class or a chart instance. If you require the complete F2 library, Guide is registered to Chart class by default. Otherwise, you need first register Guide to Chart class or a chart instance.

```js
const F2 = require('@antv/f2/lib/core');

// Step 1: require Guide, all guides or require on demand
require('@antv/f2/lib/component/guide'); // require all guide components

require('@antv/f2/lib/component/guide/arc'); // only Guide.Arc 
require('@antv/f2/lib/component/guide/html'); // only Guide.Html
require('@antv/f2/lib/component/guide/text'); // only Guide.Text
require('@antv/f2/lib/component/guide/rect'); // only Guide.Rect
require('@antv/f2/lib/component/guide/line'); // only Guide.Line

// Step 2: require guide plug-in
const Guide = require('@antv/f2/lib/plugin/guide');

// Step 3：register Guide plug-in
F2.Chart.plugins.register(Guide); // Global registeration here, registeration for a chart instance is allowed

// registeration for a chart instance
const chart = new F2.Chart({
  id: 'canvas',
  plugins: Guide
});
```

## API

### line

`chart.guide().line({})`

Draw a guide line

```js
chart.guide().line({
  top: {Boolean}, // wether draw the line to the top layer of the canvas, defaults to true
  start: {Function} | {Array}, // starting position of the guide line, original value is used, callback is supported
  end: {Function} | {Array}, //  ending position of the guide line, original value is used, callback is supported
  style: {
    stroke: '#999', // color of line
    lineDash: [ 0, 2, 2 ], // setup for dash line
    lineWidth: 3 // width of line
  } // style for line
});
```

#### Parameters

- `top`: Boolean, wether draw the guide line to the top layer of the canvas, defaults to true.

- `start`: Array/Function

  Starting position of the guide line. The type of the parameter can be:

  - Array: Array [x, y] is used to setup position.There are several value types for the array:
    - x, y are both original values such as ['2010-01-01', 200];
    - x, y can both be strings that represent the original values, for example, ['median', 200];
    - x, y can both be strings that end with '%', so it will be drawn in the area according to the ratio. For example, ['50%', '50%'] will be drawn in the center of the drawing area. 
  - Function: Callback to dynamically locate the position to be drawn. It is often used in the scenario where position of the guide element changes according to the change of the datas.

  ```js
  chart.guide().line({
     /**
     * starting point of guide line
     * @param  {Scale} xScale scale of x-axis
     * @param {Array} yScales scale array of y-axis
     * @return {Array} return value must be an array
     */
    start(xScale, yScales) {
      return []; // position information
    },
    /**
     * ending point of guide line
     * @param  {Scale} xScale scale of x-axis
     * @param {Array} yScales scale array of y-axis
     * @return {Array} return value must be an array
     */
    end(xScale, yScales) {
      return []; // position information
    }
  });
  ```

- `end`: Array/Function, ending point of guide line, similar to `start`;

- `style`:Object, display style for guide line, see [Canvas](./canvas.html) for more details.

### Text

`chart.guide().text({})`

Draw a guide text

```js
chart.guide().text({
  top: {Boolean}, 
  position: {Function} | {Array}, 
  content: {String}, // content to display
  style: {
    fill: '#666', // font color
    fontSize: '12', // font size
    fontWeight: 'bold' // font weight
    rotate: 30 // rotation angle
  }, // style for text
  offsetX: {Number}, // offset of x-axis
  offsetY: {Number} // offset of y-axis
});
```

#### Parameters

- `top`: Wether draw the guide text to the top layer of the canvas, defaults to true;

- `position`: Array/Function. The type of the parameter can be:

  - Array: Array [x, y] is used to setup position.There are several value types for the array:
    - x, y are both original values such as ['2010-01-01', 200];
    - x, y can both be strings that represent the original values, for example, ['median', 200];
    - x, y can both be strings that end with '%', so it will be drawn in the area according to the ratio. For example, ['50%', '50%'] will be drawn in the center of the drawing area. 
  - Function: Callback to dynamically locate the position to be drawn. It is often used in the scenario where position of the guide element changes according to the change of the datas.

  ```js
  chart.guide().tag({
   /**
     * starting point of guide line
     * @param  {Scale} xScale scale of x-axis
     * @param {Array} yScales scale array of y-axis
     * @return {Array} return value must be an array
     */
    position(xScale, yScales) {
      return []; 
    },
    content: 'Maximum value'
  ```

- `content`: String, content in guide tag;

- `direct`: String, direction of tag, calculated automatically, user configuration is also allowed. The direction is relative to point, and can be set to: 'tl', 'tc', 'tr', 'cl', 'cr', 'bc', 'br'. See below:

  <img src="https://gw.alipayobjects.com/zos/rmsportal/hyRzDvMdRVwukHVfmGWL.png" width="50%">

- `side`: Number, length of the tag, defaults to 4px;

- `offsetX`: Number, offset of tag in x-axis;

- `offsetY`: Number, offset of tag in y-axis;

- `background`: Object, theme style of the tag's background, see below for configurable attributes. More details can be found in [Canvas](./canvas.md).

  ```js
  background: {
    padding: [ 4, 6 ], // padding of the tag
    radius: 2, // round corner of tha tag
    fill: '#1890FF', // filled color of tag's background
    // other attributes
  }
  ```

- `textStyle`: Object, style for tag's font. see below for configurable attributes. More details can be found in [Canvas](./canvas.md).

  ```js
  textStyle: {
    fontSize: 12, // font size
    fill: '#fff' // font color
  }
  ```

- `withPoint`: Boolean, wether with a point, defaults to true.

- `pointStyle`: Object, style for point.

### Rect

`chart.guide.rect({})`

Draw a guide border for background.

```js
chart.guide().rect({
  top: {Boolean},
  start: {Function} | {Array}, 
  end: {Function} | {Array},
  style: {
    lineWidth: 0, // width of the guide border
    fill: '#f80', // filled color of the guide border
    fillOpacity: 0.1, // opacity of border's background
    stroke: '#ccc' // border color of the guide border
  }
});
```

#### Parameters

- `top`: Wether draw the guide rect to the top layer of the canvas, defaults to true;

- `start`:  Array/Function

  Starting position of the guide border. The type of the parameter can be:

  - Array: Array [x, y] is used to setup position.There are several value types for the array:
    - x, y are both original values such as ['2010-01-01', 200];
    - x, y can both be strings that represent the original values, for example, ['median', 200];
    - x, y can both be strings that end with '%', so it will be drawn in the area according to the ratio. For example, ['50%', '50%'] will be drawn in the center of the drawing area. 
  - Function: Callback to dynamically locate the position to be drawn. It is often used in the scenario where position of the guide element changes according to the change of the datas.

  ```js
  chart.guide().rect({
     /**
     * starting point of guide rect
     * @param  {Scale} xScale scale of x-axis
     * @param {Array} yScales scale array of y-axis
     * @return {Array} return value must be an array
     */
    start(xScale, yScales) {
      return []; // position information
    },
    /**
     * ending point of guide rect
     * @param  {Scale} xScale scale of x-axis
     * @param {Array} yScales scale array of y-axis
     * @return {Array} return value must be an array
     */
    end(xScale, yScales) {
      return []; // position information
    }
  });
  ```

- `end`: Array/Function, ending position of guide border, similar to `start`;

- `style`: Object, style for guide border, see [Canvas](./canvas.md) for more details.

### HTML

`chart.guide.html({})`

Draw a guide html.

```js
chart.guide().html({
  position: {Function} | {Array}, 
  alignX: 'left' | 'center' | 'right',
  alignY: 'top' | 'middle' | 'bottom',
  offsetX: {Number},
  offsetY: {Number},
  html: {String} // html code
});
```

#### Parameters

- `top`: 

- `position`: Array/Function, display position of the html. The type of the parameter can be:

  - Array: Array [x, y] is used to setup position.There are several value types for the array:
    - x, y are both original values such as ['2010-01-01', 200];
    - x, y can both be strings that represent the original values, for example, ['median', 200];
    - x, y can both be strings that end with '%', so it will be drawn in the area according to the ratio. For example, ['50%', '50%'] will be drawn in the center of the drawing area.;
  - Function: Callback to dynamically locate the position to be drawn. It is often used in the scenario where position of the guide element changes according to the change of the datas;

  ```js
  chart.guide().html({
    /**
     * starting point of guide html
     * @param  {Scale} xScale scale of x-axis
     * @param {Array} yScales scale array of y-axis
     * @return {Array} return value must be an array
     */
    position(xScale, yScales) {
      return [];
    },
    html: '<p>Maximum Value</p>'
  });
  ```

- `alignX`: String, alignment of html in horizontal direction, can be set to: left, center, right, defaults to center;

- `alignY`: String, alignment of html in vertical direction, can be set to: top, middle, bottom, defaults to middlel

- `html`: String, html code that needs to be displayed;

- `offsetX`: Number, offset of html in x-axis;

- `offsetY`: Number, offset of html in y-axis.

### Arc

`chart.guide.arc({})`

Draw a guide arc, only used in polar coordinate.

```js
chart.arc({
  top: {Boolean}, // 指定 giude 是否绘制在 canvas 最上层，默认为 false, 即绘制在最下层
  start: {Object} | {Function} | {Array}, // 辅助框起始位置，值为原始数据值，支持 callback 
  end: {Object} | {Function} | {Array},// 辅助框结束位置，值为原始数据值，支持 callback
  style: {Object} // 图形样式属性
});
```

#### Parameters

- `top`: Wether draw the guide arc to the top layer of the canvas, defaults to true;

- `position`: Array/Function, display position of the guide arc. The type of the parameter can be:

  - Array: Array [x, y] is used to setup position.There are several value types for the array:
    - x, y are both original values such as ['2010-01-01', 200];
    - x, y can both be strings that represent the original values, for example, ['median', 200];
    - x, y can both be strings that end with '%', so it will be drawn in the area according to the ratio. For example, ['50%', '50%'] will be drawn in the center of the drawing area.;
  - Function: Callback to dynamically locate the position to be drawn. It is often used in the scenario where position of the guide element changes according to the change of the datas;

  ```js
  chart.guide().arc({
     /**
     * starting point of guide arc
     * @param  {Scale} xScale scale of x-axis
     * @param {Array} yScales scale array of y-axis
     * @return {Array} return value must be an array
     */
    start(xScale, yScales) {
      return []; // position information
    },
    /**
     * ending point of guide arc
     * @param  {Scale} xScale scale of x-axis
     * @param {Array} yScales scale array of y-axis
     * @return {Array} return value must be an array
     */
    end(xScale, yScales) {
      return []; // position information
    }
  });
  ```

  - `end`: Array/Function, ending position of the guide arc, similar to `start`;
  - `style`: Object, display style of the guide arc, see [Canvas](./canvas.md) for more details.

### Clear guides

```js
chart.guide().clear();
```

