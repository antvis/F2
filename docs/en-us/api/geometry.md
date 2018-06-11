# Geometry

The type of the chart is determined by geometry object, for introduction of the geometry, see [Geom](../tutorial/geometry.html).

Graphic syntax example:

```js
chart.<geomType>()
  .position()
  .size()
  .color()
  .shape()
  .adjust()
  .style()
  .animate();
```

The following is a simple grammar for plotting the histogram. After the geom object is declared, various graphical attributes can be mapped on the chart. We will describe in detail below.

```js
chart.interval().position('x*y').color('x');
```

NOTE: The return of the above method `chart.interval()` is a geom object rather than a chart object.

The following are the basic types of Geom currently:

| Geom Type  |                         Explanation                          |
| :--------: | :----------------------------------------------------------: |
|  `point`   |            For the construction of dotted charts             |
|   `path`   |               A line of unordered connections                |
|   `line`   | The points are connected in a line along the x-axis to form a line chart |
|   `area`   | The filled area between line chart and axis, upper and lower range can be specified. |
| `interval` | The area of the chart is used to represents the size relationships. Interval is usually in the shape of rectangle or arc, and is used to form a histogram or a pie chart. |
| `polygon`  |    It is usually used to form thermodynamic chart or map.    |
|  `schema`  |           Used to form a k-line chart or box plot.           |

The supported interfaces of Geom can be divided into three kinds:

1. Data mapping related functions: `position`, `color`, `shape`, `size`;
2. Auxiliary functions used to stylish display: `style`;
3. Extra controlling method: `adjust`;
4. Animation configuration function: `animate`.

## Attributes

### `generatePoints`

- Parameter type: Boolean
- Description: Wether to generate multiple points to draw charts, if true, multiple points will be generated.
- Default: false for line and path, other geom types default to be true.

```js
chart.line({
  generatePoints: true
})
```

### `sortable`

- Parameter type: Boolean
- Description: Wether to sort according to the corresponding field on the x-axis, if true, the data set will be sorted.
- Default: True for area and line, other geom types default to be false.

**When drawing a line chart or area chart, if the data set is already sorted, this attribute can be set to `false` to improve performance.**

```js
chart.line({
  sortable: false
})
```

### `startOnZero`

- Parameter type: Boolean
- Description: Wether to set the baseline of the y-axis starting from 0, default to be true, i. e. baseline of y-axis starts from 0.
- Default: true

```js
chart.line({
  startOnZero: false
})
```

The use scenario of this attribute is as follows:

|                     `startOnZero: true`                      |                     `startOnZero: false`                     |
| :----------------------------------------------------------: | :----------------------------------------------------------: |
| <img src="https://gw.alipayobjects.com/zos/rmsportal/ZQqwUCczalrKqGgagOVp.png" style="width: 400px"> | <img src="https://gw.alipayobjects.com/zos/rmsportal/yPswkaXvUpCYOdhocGwB.png" style="width: 400px"> |

### Functions

### position

This function maps the data to the corresponding locations of the graphics.

```js
line().position('x*y');
line().position([ 'x', 'y' ]);
```

#### position('fieldA*fieldB')

Multiple data fields are connected using `*` and will all be mapped by `position`. For example, cut\*price and x\*y will be used to draw a 2-dimensional chart.

Take `chart.point().position('x*y')` as example, point means the final chart will be a dot chart, and the location of the chart is determined by x and y. The processing routine of the x * y can be understood as:

<img src="https://gw.alipayobjects.com/zos/rmsportal/EcuDeyeTOsztVOuxmZPe.png" style="width: 50%;">

The value pair such as (x1, y1) will be converted to the corresponding coordinate on the canvas.

In addition, data fields can also be passed in as an array: `chart.geom().position([ 'fieldA', 'fieldB' ])`

### color

Color function maps the data to the colors.

```js
line().color('red'); // constant color
line().color('type'); // use the built-in color to map the type field
line().color('type', [ 'red', 'blue' ]) // specify colors
line().color('type', (type) => { // use callback to map data to colors
  if (type === 'a') {
    return 'red';
  }
  return 'blue';
});
line().color('type*value', (type, value) => { // multiple parameters, use callback to map
  if (type === 'a' && value > 100) {
    return 'red';
  }
  return 'blue';
});
```

#### color(value)

##### Parameter

- `value`: String

At this time, color only supports a single parameter, value can be:

- The data field name mapped to the color. If the field name does not exist in the data source, it will be treated as a constant. At this time, the default color provided by F2 will be used.
- A string of color value, such as '#fff', 'white', etc.

##### Code Demo

```js
chart.point().position('x*y').color('x'); // use the built-in color to map the data field of x-axis
chart.point().position('x*y').color('red'); // all points are mapped to red
```

#### color(field, colors)

##### Parameters

- `field`: String

  Data field name mapped to colors, multiple fields are supported.

- `colors`: String/Array/Function

  The value of colors has the following conditions:

  - If colors is null, no color array is specified and the built-in colors are used;

  - If you need to specify colors, you need to pass in an color array. The color of the category will be determined by the colors in the array. Each category's color will be determined by the order of the data fields in the original data source;

  - Gradient color configuration is supported. First specify a gradient color, such as 'color1-color2', classified data or continuous data get their color from color range according to its value. **The supported formats of color are 'red', '#ddd', '#dddddd', 'rgb(255, 10, 30)'**.

    ```js
    chart.point().position('x*y').color('z'); // use default colors
      chart.point().position('x*y').color('z', [ 'red', 'blue' ]); // specify colors
      chart.point().position('x*y').color('z', 'red-blue'); // use color gradient
    ```

  - Colors can also be a callback, the parameters of the callback are the corresponding data field values. If the function is going to map multiple data fields, parameters will be passed in the declared order, for example:

    ```js
    chart.point().position('x*y').color('z', (value) => {
        if(value === 1) {
          return 'red'
        }
      
        return 'blue';
      });
    ```

### shape

  This function maps the data value to the shape of the graph.

  ```js
  point().shape('circle'); // constant
  point().shape('type'); // use the built-in shape to map the type field
  point().shape('type', [ 'circle', 'hollowCircle', 'rect' ]); // specify shapes
  point().shape('type', (type) => { // use callback do the mapping
    if(type === 'a') {
      return 'circle';
    }
    return 'rect';
  });
  ```

#### shape(shape)

##### Parameter

  - `shape`: String

    Only a shape name is needed to specify the shape. The following table lists the shapes supported by different geom objects:

    | Geom Type |            Shape Type            |               Explanation                |
    | :-------: | :------------------------------: | :--------------------------------------: |
    |   point   | 'circle', 'hollowCircle', 'rect' |           default to 'circle'            |
    |   line    |     'line', 'smooth', 'dash'     |   dash: dash line, smooth: smooth line   |
    |   area    |         'area', 'smooth'         |           chart of filled area           |
    | interval  |              'rect'              |                                          |
    |  polygon  |            'polygon'             |                                          |
    |  schema   |             'candle'             | only k-line chart is supported currently |

  ##### Code Demo

  ```js
  chart.point().position('x*y').shape('rect'); // all the points's shapes are rectangles
  ```

  #### shape(field, shapes)

  Specify multiple shapes,  the mapping order is the same as the field order.

  ##### Parameters

  - `field`: String

    Field is the name of the data source field that is mapped to the shape

  - `shapes`: String/Array

    Shapes is an optional parameter. If this parameter is not provided, shapes will be rendered according to the default shape configuration for a specific geom type. Users can also specify shape to render. The specific shapes are listed above. The followings are shapes provided by F2 for the specific geom types:

    ```js
    const shapes = {
        line: [ 'line', 'dash' ],
        point: [ 'circle', 'hollowCircle' ]
      };
    ```

#### shape(field, callback)

  Use callback to set the shape type

  ##### Parameters

  - `field`: String

    Field is the name of the data source field that is mapped to the shape

  - `callback`: Function

    Callback function to return the shape

##### Code Demo

  ```js
  chart.point().position('x*y').shape('z', value => {
    if (value === 1) {
      return 'circle'
    }
    return 'rect';
  });
  ```

### size

  Map the data fields to size of the graph.

  ##### Code Demo

  ```js
  chart.point().position('x*y').size('z'); // map the value in the field 'z' to the size
  ```

  #### size(field, [min, max])

  Map the size of the graph based on the value of the field, the maximum value (default to 10) and minimum value (default to 1) are specified by max and min.

  ##### Code Demo

  ```js
  chart.point().position('x*y').size('z', [ 10, 100 ]); // map the value in field z to size, the maximum mapped value is 100, minimum mapped value is 10.
  ```

  #### size(field, callback)

Use callback to calculate the size of the graph.

##### Parameter

- `callback`: Function

  Callback function

##### Code Demo

```js
chart.point().position('x*y').size('z', value => {
  if (value === 1) {
    return 5;
  }
  return 10;
});
```

### adjust

Declare the data adjustment method of the geometry objects, which can be used to draw layered charts, grouped charts, etc.

F2 supports two kinds of data adjustment: 'stack' and 'dodge'.

```js
interval().adjust('stack');
interval().adjust({
  type: 'stack'
});
interval().adjust([{
  type: 'dodge',
  marginRatio: 0, // Values from 0 to 1 are used to adjust the space between columns in a group
}]);
```

### style

Used to configure the graphical attributes of the geometries, see [Canvas](./canvas.html) for more details.

There are two ways to use style:

1. `style(cfg)`

   Parameter:

   - `cfg`: Object, congfiguration for graphical attributes, see [Canvas](./canvas.html) for more details.

   ```js
   line().style({ // style for all shapes
     lineWidth: 2
   });
   ```

2. `style(field, cfg)` Mapping from data fields to style configuration

   Parameters:

   - `field`: String, field name
   - `cfg`: Object, configuration for graphical attributes, **callback is also supported here**

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

   

### animate

Configuration function for animations.

```js
point().animate(false); // turn off animation

point().animate({
  appear: {
    animation: {String}, // animation name
    easing: {String}, // easing function
    duration: {Number}, // duration of the animation, in millisecond
    delay: {Number} // delay of the animation, in millisecond
  }, // entrance animation
  update: {
    animation: {String}, 
    easing: {String},
    duration: {Number},
    delay: {Number} 
  }, // updating animation
  enter: {
    animation: {String}, 
    easing: {String}, 
    duration: {Number}, 
    delay: {Number} 
  }, // animation for the change of the source data
  leave: {
    animation: {String}, 
    easing: {String}, 
    duration: {Number}, 
    delay: {Number} 
  } // destroy animation
});
```

For more about animations, see [Animation](./animation.html).