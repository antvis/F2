# Chart

## create a chart instance

A `<canvas>` or a canvas contexr must be created before drawing a chart.

```js
const chart = new F2.Chart({
  id: 'c1',
  width: 500,
  height: 500,
  padding: 'auto'
});
```

## Parameters

### `id`

- type: String
- description: corresponding id of the canvas
- default: null 

### `el`

- type: HTMLElement
- description: A canvas object can be passed directly if the id is not specified
- default: null

```js
const chart = new F2.Chart({
  el: document.getElementById('c1')
});
```

### `context`

- type: CanvasRenderingContext2D
- description: context of canvas, supported since F2 3.0.1
- default: null

```js
const chart = new F2.Chart({
  context: document.getElementById('c1').getContext('2d')
});
```

**NOTE: One of the three attributes, `id`, `el`, `context` must be set **

### `width`

- type: Number
- description: width of the chart, if the width of `<canvas>` is set, you don't have to set the parameter.
- default: null

### `height`

- type: Number
- description: height of the chart, if the height of `<canvas>` is set, you don't have to set the parameter.
- default: null

```js
// use the height and width of canvas by default
const chart = new F2.Chart({
  id: 'c1'
});

const chart = new F2.Chart({
  id: 'c1',
  width: 500,
  height: 300
});
```

### `padding`

- type: Number/Array/String
- description: the padding of the chart drawing area and canvas.
- default: 'auto', that is calculated automatically

```js
const chart = new F2.Chart({
  id: 'c1',
  padding: 'auto' // default value, calculate padding automatically
});

const chart = new F2.Chart({
  id: 'c1',
  padding: [ 0, 10, 40, 100 ] // set paddings of top, right, bottom, left respectively
});

const chart = new F2.Chart({
  id: 'c1',
  padding: 40 // single value
});

const chart = new F2.Chart({
  id: 'c1',
  padding: [ 40, 10, 'auto', 'auto' ]  // specify some of the paddings to be calculated directly
});
```

> NOTE: The usage of the padding here is the same as the padding in the CSS box model.

### `pixelRatio`

- type: Number
- description: pixel ration of the screen
- default: 1

Since canvas will blur in the high resolution screen, it is necessary to set the `pixelRatio`. It can be set to `window.devicePixelRatio` in most situations. The reason that `pixelRatio` does not default to `window.devicePixelRatio` are that the HD display is different in different scenarios, and  the implementations of the HD display varies among platforms. It is resonable that the value of the `pixelRatio` needs to be set manually.

```js
// Global configuration, effective for all charts
F2.Global.pixelRatio = window.devicePixelRatio;
// Set pixel ration for a chart instance
const chart = new F2.Chart({
  id: 'c1',
  pixelRatio: window.devicePixelRatio
});
```

### `plugins`

- type: Object/Array
- description: register plug-ins for chart instance
- default: null

See [Plugin](./plugin.html) for more details about plug-ins.

### `animate`

- type: Boolean
- description: wether turn of the animation of the chart
- default: null

## Methods

### `get`

* description: get attributes
* return: the corresponding attributes

The method is used to get attributes of the chart, for example, `chart.get('width')`. The attributes are listed as follows:

| Attribute  |                        Description                         |
| :--------: | :--------------------------------------------------------: |
|     id     |                    the id of the canvas                    |
|  padding   |      the padding of the chart drawing area and canvas      |
|    data    |                       original data                        |
|   width    |                     width of the chart                     |
|   height   |                    height of the chart                     |
| pixelRatio |                the pixel ratio of the chart                |
|     el     |            the dom object corresponds to canvas            |
|   canvas   |            the corresponding canvas (G.Canvas)             |
|   geoms    | all the geometry objects, can be get after chart rendering |

### `source`

* description: load the original data
* return: the current chart instance

#### `chart.source(data)`

- `data`: Array, the data the needs to be visualized

#### `chart.source(data, colDefs)`

- `data`: Array, the data the needs to be visualized
- `colDefs`: Object, configuration for column definition, i.e. scale setup for each data field. Optional.

```js
chart.source(data, {
  a: {
    min: 0,
    max: 100
  }
});
```

Column definition is used to describe the data field, such as the type of the field, alias of the field name, the display format of the data value. Different data types have different configuration options, the supported data types are listed below:

- `linear`: Numerical data type
- `cat`: Classifed data type
- `timeCat`: Time data

F2 will automatically detect the type of the data, and users are allowed to alter attributes or  data types to satisfy the requirements. For more details of configuration, see [Scale](./scale.html).

### `scale`

- description: column definition for data field
- return: current chart instance

**Warning**: If the data field is both defined in `chart.source()` and `chart.scale()`, the configuration which is defined latter will override previous configuration.

#### `chart.scale('field', colDef)`

Column definition for a specific data field

- `field`: String, data field name
- `colDef`: Object, configuration of the scale, see [scale](./scale.html) for more details

Example:

```js
const data = [
  { x: 0, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 3 }
];

// column definition for 'x'
chart.scale('x', {
  type: 'cat', // type is declared to be classified data type
  values: [ 'A', 'B', 'C' ] // set display value
  alias: '类型' // alias for attribute
});
```

#### `chart.scale(colDef)`

Column definition for one or multiple data fields.

- `colDef`: Object, configuration of the scale, see [scale](./scale.html) for more details.

Example:

```js
const data = [
  { x: 0, y: 1 },
  { x: 1, y: 2 },
  { x: 2, y: 3 }
];

// column definition for multiple data fields
chart.scale({
  x: {
    type: 'cat', // declare type to be classified data type
    values: [ 'A', 'B', 'C' ] // set display value
    alias: '类型' // alias for attribute
  },
  y: {
    type: 'cat'
  }
});
```

### `coord`

- description: setup for coordinate
- return: the current chart instance

See [Coordinate](./coordinate.html) for more details.

### `axis`

`chart.axis()`

- description: setup for axis
- return: the current chart instance

See [Axis](./axis.html) for more details.

### `lengend`

`chart.lengend()`

- description: setup for legend
- return: the current chart instance

See [Lengend](./lengend.html) for more details

### `tooltip`

`chart.tooltip()`

- description: setup for tooltip
- return: the current chart instance

See [Tooltip](./tooltip.html) for more details.

### `guide`

`chart.guide()`

- description: setup for guide element
- return: the current guideController instance

See [Guide](./guide.html) for more details.

### `animate`

`chart.animate`

- description: setup animation for chart
- return: the current chart instance

See [Animation](./animation.html) for more details

### Create Geometry Object

- `chart.point()`: create a point geometry, see [Geometry](./geometry.html) for more details;
- `chart.line()`: create a line geometry, see [Geometry](./geometry.html) for more details;
- `chart.area()`: create an area geometry, see [Geometry](./geometry.html) for more details;
- `chart.path()`: create a path geometry, see [Geometry](./geometry.html) for more details;
- `chart.interval()`: create an interval geometry, see [Geometry](./geometry.html) for more details;
- `chart.polygon()`: create a polygon geometry, see [Geometry](./geometry.html) for more details;
- `chart.schema()`: create a schema geometry, see [Geometry](./geometry.html) for more details.

**NOTE**: The returns of methods above are all geometries, not chart instances.

### `render`

`chart.render()`

- description: the chart renderingg method, last method to invoke
- return: the current chart instance

### `clear`

`chart.clear()`

- description: clear the content of the chart
- return: the current chart instance

Invoking `chart.clear()` and re-declearing is enough when redrawing a chart, you do not have to destroy the chart.

```js
chart.clear();
chart.source(data);
chart.line().position('a*b');
chart.render();
```

### `repaint`

`chart.repaint()`

- description: repaint the chart
- return: the current chart instance

You are allowed to repaint the chart after the configurations of the guide and geometry are done.

### `changeData`

`chart.changeData(data)`

- parameter: `data` is the data source, and is an array
- description: change the data source and re-render the chart
- return: the current chart instance

### `changeSize`

`chart.changeSize(width, height)`

- parameter: `width`: Number/null, if null is specified, the width remains unchanged; `height`: Number/null, if null is specified, same action as width.
- description: change the size of the chart and re-render the chart
- return: the current chart instance

`chart.changeSize(300)` only changes the width; `chart.changeSize(300, 500)` changes both width and height; `chart.changeSize(, 300)` only changes height.

### `destroy`

`chart.desctroy()`

- description: destroy the chart instance, but dom element `<canvas>` won't be destroyed

### `getPosition`

`chart.getPosition(record)`

- parameter: `record` is the original data object
- description: get corresponding the coordinate of original data on canvas
- return: an coordinate object represents the coordinate of the record on canvas, in the format of `{x: , y: }`

```js
const point = chart.getPosition({ time: '2010-02-02', value: 20 });
```

### `getRecord`

`chart.getRecord(point)`

- parameter: `point` is a coordinate object describes the coordinate on canvas, in the format of `{x: , y: }`
- description: get the original data record according to the coordinate on canvas
- return: the data record object corresponds to the coordinate

```js
const obj = chart.getRecord({ x: 100, y: 100 });
```

### `getSnapRecords`

`chart.getSnapRecords(point)`

- parameter: `point` is the coordinate object in the format of `{x: , y: }`

- description: get the nearby data set according to the coordinate on canvas

- return: the nearby data set which each element contains the mapped and corresponding original data. The structure of the return data is shown as below:

  ```js
  [
    {
      _origin: { year: '1959 年', sales: 38 }, // the original data correspnds to the shape
      points: [
        { x: 0.65625, y: 0 },
        { x: 0.65625, y: 0.2375 },
        { x: 0.71875, y: 0.2375 },
        { x: 0.71875, y: 0 }
      ], // the key points with normalized data, consiting of the shape
      _originY: 38, // the original data of y-axis
      x: 260.53499698638916, // shape's x-axis coordinate on canvas
      y: 165.34375, // shape's y-axis coordiante on canvas
      index: 5 // index of the shape
    },
    ...
    {}
  ]
  ```

```js
const obj = chart.getSnapRecords({x: 100, y: 100});
```

### `getLegendItems`

`chart.getLengendItems()`

- description: get the items of the legend, used for legend operations
- return: an array of items

### `getXScale`

`chart.getXScale()`

- description: get the scale of the chart's x-axis
- return: the scale object of the chart's x-axis

### `getYScales()`

`chart.getYScales()`

- description: get the scales of the chart's y-axes, there may be multiple y-axes
- return: the scale object array of the chart's y-axes

### `showTooltip`

`chart.showTooltip(point)`

- parameter: `point` object is the coordinate on canvas, in the format of `{x: , y: }`
- description: display a tooltip on this point
- return: the current chart instance

### `hideTooltip`

`chart.hideTooltip()`

- description: hide the current tooltip
- return: the current chart instance