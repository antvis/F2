# Scale

Scale is the transition bridge from data space to graphic space, it is responsible for normalizing the original data to the range of [0, 1]. Different data types have different type of scales.

According to the data types, F2 supports the following types of scales:

- **identity**, scale type for constant data, that is the data field is fixed;
- **linear**, scale type for continuous data, such as [1, 2, 3, 4, 5];
- **cat**, scale for classified data, such as ['male', 'female'];
- **timecat**, scale for time data.

In F2, scale is often used through column definition.

```js
const data = [
  { a: 'a', b: 20 },
  { a: 'b', b: 12 },
  { a: 'c', b: 8 },
];
const defs = {
  a: {
    type: 'cat' // declare the type of field 'a'
  },
  b: {
    min: 0, // specify the minimum value 
    max: 100 // specify the maximum value
  }
};

chart.source(data, defs);
```

## Common Attributes

Common attributes are listed below:

### type

Attribute Type: String

Specify the type of the scale, supported scale types are: `identify`, `linear`, `cat`, `timeCat`.

### formatter

Attribute Type: Function

It is Used to format the text of the scale point in the axis and will affect the display of the data on axis, legend, and tooltip.

### range

Attribute Type: Array

The range of the output data, in the format of [min, max]. Range is defaulted to [0, 1], and the values of min and max are both within [0, 1].

### alias

Attribute Type: String

Alias of the data field, usually used to translate the english name to chinese name.

### tickCount

Attribute Type: Number

Number of scale points in the axis, different scale types have different default values.

### ticks

Attribute Type: Array

It is used to specify the text of the scale points in axis. If this attribute is given, the number of scale points and corresponding infomation will be display accordingly.

#### Code Demo

```js
chart.scale('aqi',  {
  min: 0,
  ticks: [ 0, 50, 100, 150, 200, 300, 500 ],
  alias: 'AQI(Air Quality Index)',
});
```

## Corresponding Attributes of Different Scales

### linear

|  Attribute   |                         Explanation                          |
| :----------: | :----------------------------------------------------------: |
|    alias     |                          alias name                          |
|     nice     | used to optimize the range of values so that scales on axes are evenly distributed. For example, [3,97] will be optimized to [0, 100] if this attribute is set to be true. |
|     min      |             the minimum value of the value range             |
|     max      |             the maximum value of the value range             |
|    range     | The range of the output data, in the format of [min, max]. Range is defaulted to [0, 1], and the values of min and max are both within [0, 1]. |
|  formatter   | It is Used to format the text of the scale point in the axis and will affect the display of the data on axis, legend, and tooltip. |
|    ticks     | It is used to specify the text of the scale points in axis. If this attribute is given, the number of scale points and corresponding infomation will be display accordingly. |
|  tickCount   | the number of the scale points in the axes, the default value is 5 |
| tickInterval | Used to specify the distance between the scale points of the axis, which is the difference between the original data. Note that **tickCount and tickInterval cannot both be defined**. |

### cat

| Attribute |                         Explanation                          |
| :-------: | :----------------------------------------------------------: |
|   alias   |                          alias name                          |
|   range   | The range of the output data, in the format of [min, max]. Range is defaulted to [0, 1], and the values of min and max are both within [0, 1]. |
| formatter | It is Used to format the text of the scale point in the axis and will affect the display of the data on axis, legend, and tooltip. |
|   ticks   | It is used to specify the text of the scale points in axis. If this attribute is given, the number of scale points and corresponding infomation will be display accordingly. |
| tickCount | the number of the scale points in the axes, the default value is 5 |
|  values   | All the values, it is often used to specify the display order of the  values. |

The values attribute is often used in the following two scenarios:

1. Specify the display order of the category data. For example, there are 3 kinds of data min, middle and max in the field 'c', and we want to specify the display order of the values on legend or axes:

   ```js
   const defs = {
     c: {
       type: 'cat',
       values: [ 'min','middle','max' ]
     }
   };
   ```

2. The values in the data field are numerical values and we need to transform them to classified values. **The original value of the field must be indexed value**.

   ```js
   const data = [
     { month: 0, tem: 7, city: 'Tokyo' },
     { month: 1, tem: 6.9, city: 'Tokyo' },
     { month: 2, tem: 9.5, city: 'Tokyo' },
     { month: 3, tem: 14.5, city: 'Tokyo' },
     { month: 4, tem: 18.2, city: 'Tokyo' },
     { month: 5, tem: 21.5, city: 'Tokyo' },
     { month: 6, tem: 25.2, city: 'Tokyo' }
   ];
   const defs = {
     month: {
       type: 'cat',
       values: [ 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jan' ] // the original value of the month field must be indexed value
     }
   };
   
   const chart = new F2.Chart({
     id: 'c1',
     width: 400,
     height: 250,
     pixelRatio: window.devicePixelRatio
   });
   chart.source(data, defs);
   chart.legend({
     align: 'center',
     itemWidth: null
   });
   chart.interval().position('month*tem').color('month');
   chart.render();
   ```

### timeCat

Classified  type for time, the data set is sorted by default.

| Attribute |                         Explanation                          |
| :-------: | :----------------------------------------------------------: |
|   nice    | used to optimize the range of values so that scales on axes are evenly distributed. For example, [3,97] will be optimized to [0, 100] if this attribute is set to be true. |
|   mask    |    The format mask of the data, defaults to 'YYYY-MM-DD'     |
| tickCount | the number of the scale points in the axes, the default value is 5. The number may not be exactly what you specified. |
|  values   | All the values, it is often used to specify the display order of the  values. |
|   alias   |                          alias name                          |
|   range   | The range of the output data, in the format of [min, max]. Range is defaulted to [0, 1], and the values of min and max are both within [0, 1]. |
| formatter | Callback function. It is Used to format the text of the scale point in the axis and will affect the display of the data on axis, legend, and tooltip. |
|   ticks   | It is used to specify the text of the scale points in axis. If this attribute is given, the number of scale points and corresponding infomation will be display accordingly. |

**NOTE: `mask` and `formmater` cannot both be specified, if both are defined, the `formatter` attribute will be used in priority**.

