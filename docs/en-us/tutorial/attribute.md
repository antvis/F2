# Attribute

**need to review**

Attributes correspond to visual channels in visual coding and are very important and flexible elements in graphical syntax. Each type of geometry has its own attributes. The following are the attributes supported in F2:

1. position: The two dimensional coordinate is mapped to the x-axis and y-axis;
2. color: Contains hue, saturation, and brightness;
3. size: Different geometries have different definitions of size;
4. shape: The shape of a geometry determines the display of a particular chart. For example, a point can be represented by dots, triangles and pictures, and line chart can have the form of polyline, curve and dotted line.

## How to use attribute

First of all, we need to make it clear that the attribute belongs to geometry, so we must first declare a geometry and then do the mappings of attributes on this geometry object. The code is as follows:

```js
chart.<geomType>().<attrType>(fields[, callback]);
```

Note that:

- geomType is the type of geometry, see [Geometry](./geometry.html) for more details;
- attrType is the type of attribute, corresponds to visual channel;
- fields: Fields that participate in visual channel mapping, it can be a single field or multiple fields. Multiple fields are splited using `*`;
- callback is used to define how to parse the visual channel. If not provided, only the visual channel parsing method provided by G2 is used.

In addition to the function `attr(fields[, callback])`, G2 combines the features of each visual channel and provides a more convenient method for users. Details will be introduced later in this chapter.

Syntax example:

```js
chart.point().position('a*b').color('c');

chart.interval().position('a*b').color('c', (cValue) => {
  if (cvalue === 'fail') {
    return 'red';
  }
  return 'green';
});
```

F2 parses `fields` of each attribute as follows:

- If it is a single word, such as `color('a')`, F2 will determine if the value belongs to the field value of input data source, if not it will be resolved to a constant;
- If it is a mapping of multiple fields speprated by `*`, F2 will sequentially parse and map these fields, such as `position('cut*price')`.

## Position Attribute

The mapping of the position attribute is used to determine which fields in the data are used to determine the location of the data in the coordiante. In other words, posittion attribute is used for determining x-axis and y-axis.

Take the following statement as an example. In the position attribute, two datas are mapped: 'cut' and 'price'. 'Cut' is mapped to x-axis, and 'price' is mapped to y-axis.

```js
chart.point().position('cut*price');
```

The following is an explanation of the '*' connector:

Take `chart.point().position('x*y')` as an example, point represents the final generated graph, and position represents the position, `position('x*y')` means that the position of the data in graph will be determined by x and y vriables. The data processing result of `x*y` can be understood as:

<img src="https://gw.alipayobjects.com/zos/rmsportal/EcuDeyeTOsztVOuxmZPe.png" width="50%">

The pair of values (x1, y1) is finally converted to corresponding coordinate point on the canvas.

## Color

From the perspective of visual coding, the color can be divided into three visual channels of brightness. saturation and hue, of which the first two can be considered as visual channels of encoding quantitative and sequencing data, and the hue is the visual channel of encoding qualitative data. However, in F2, it is not so detailed. The color method is universal way used for mapping configuration.

Color supports the mapping syntax as follows:

- `color('field')`. Field is data attribute, F2 will call the default callback function internally, and read the default color to map the data value to the color;
- `color('field', colors)`. Map data values to the specified colors (which can be a string or an array). It is usually used to map the classified data;
- `color('field', 'color1-color2-colorN')`. Specify the color gradient path for mapping continuous data;
- `color('field', callback)`. Use a callback function to customize the color value, you can connect multiple fields using '*';
- `color('#ffffff')`. Directly specify color value without data mapping.

### Color Mapping For Classfied Data

Map the values of `city` the defined colors to distinguish between different cities.

`.color('city', [ '#40A9FF', '#FF7875', '#FFC069' ])`

<img src="https://gw.alipayobjects.com/zos/rmsportal/FPXEtZTmKGVleSoVTDSL.png" style="width: 360px;">

### Color Mapping For Continuous Data

For continuous data, we can specify a color gradient path for color to visualize the data in a range of values.

`.color('sales', '#BAE7FF-#1890FF-#0050B3')`

<img src="https://gw.alipayobjects.com/zos/rmsportal/heFYrrRgMWDvWsAbsJRq.png"  style="width: 359px;">

### Use Callbacks

Sometimes colors need to be specified based on the fields, so F2 provides a callback function to specify the colors.

```js
// Calculate color based on a single field
chart.point().position('x*y').color('z', z => {
  if (z >= 100) {
    return 'red';
  }
  return 'blue';
});

// Calculate color based on multiple fields
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

## Shape

Different geometries have different shapes. Shape is a visual channel and is affected by servertal other visual channels. For example, the shape of interval geometry may be a filled rectangle or a hollow border rectangle. This determines whether the color is mapped to the filled color or to the border color. The use of the shape method is relatively simple and is often used to map classified data:

- `shape('field')`: Maps the specified fields into the built-in shape array;
- `shape('field', shapes)`: Maps the specified fields into the shape array provided by users;
- `shape('field', callback)`: Use a callback function to get a shape, which is used for customization of shape. The shape can be determined based on single or multiple fields;
- `shape('circle')`: Specify constant to map all data values to a fixed shape.

In addition, F2 allows developers to draw their own shapes, see [Shape](../api/shape.html) for more details.

### gemo and shape

When using geometries to implement various chart types, each of the geometry has different shape at the time of drawing. The default shapes supported by F2 is listed in chapter [Geometry](./geometry.html) .

`.shape('cat', [ 'circle', 'rect' ])`

### use callback

Shapes also can be calculated by field values. You can specify single or multiple fields in the shape method and get the specified shape through the callback function.

```js
chart.point()
  .position('x*y')
  .shape('value', (value) => {
    if (value > 10) {
      return 'circle';
    }
    return 'rect';
  });
```

## Size

Size has different meanings for different geometries.

- For point, size means the radius of the point;
- For line, size corresponds to the thickness of the line;
- For the interval histogram, size means the width of the column.

Therefore, size is a complicated visual channel from the perspective of the visualization.

The following mapping syntax is supported in F2:

- `size('field')`: Specify the field mapped to size using the built-in default size range [1, 10];
- `size('field', [ min, max ])`: In addition to specifying the mapping to the size field, the maximum and minimum ranges for the size is also provided;
- `size('fields', callback)`: Use the callback to map size for personalized customization, mapping of multiple fields is allowed;
- `size(10)`: Specify the size directly.

In bubble charts, size is often used for mapping in order to encoding more dimensions of data. In the following example, a bubble chart is used to visualize the correlation between the per capita GDP of each country and the average life expectancy, and the population data of each country is mapped to the size of bubbles.

`.size('Population', [ 4, 65 ])`

<img src="https://gw.alipayobjects.com/zos/rmsportal/HcFhyBHVJuoRzXNzPheF.png" style="width: 360px;">

### Use of Callback

Size can be calculated by the callback based on the value of specified field, and multiple fields are also allowed. 

```js
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
  return text.length * 10; // return the text length
});
```

## Attributes Supported by Geom

As mentioned before, each geometry supported different visual channels, and the mapping relationship between data and visual channels is now exactly the same.

The following table shows the relationship between different geom objects and attributes.

|  geometry  | position |  color  |     size      |  shape  |
| :--------: | :------: | :-----: | :-----------: | :-----: |
|   point    | support  | support |    support    | support |
| path, line | support  | support |    support    | support |
|    area    | support  | support | `not support` | support |
|  interval  | support  | support |    support    | support |
|  polygon   | support  | support | `not support` | support |
|   schema   | support  | support |    support    | support |

