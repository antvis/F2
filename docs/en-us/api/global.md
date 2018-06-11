# Global

Global is the global configuration in F2, it contains following attributes:

- Some default attributes of the chart itself, such as borders, screen pixels, default fonts, etc.
- Data graph mapping related properties, such as default color, default, shape, default size, default width of the histogram.
- The default style of the axes and guide text.

## Attributes

### Global Attributes

```js
const Global = {
  // ratio of the width
  widthRatio: { 
    column: 1 / 2, // 1 / 2 for histogram
    rose: 0.999999, // ratio for rose chart
    multiplePie: 3 / 4, // multi-layer pie chart's width
    dodgeMargin: 0 // distance between grouped histograms
  },
  // dash line setup
  lineDash: [ 4, 4 ]
};
```

### [Theme Related](#Theme Related)

```js
const color1 = '#E8E8E8'; // colors of axis line and grid line
const color2 = '#808080'; // font color
// default style for axes
const defaultAxis = {
  label: {
    fill: color2,
    fontSize: 10
  }, // text style of axis text
  line: {
    stroke: color1,
    lineWidth: 1,
    top: true
  }, // style for axis line
  grid: {
    stroke: color1,
    lineWidth: 1,
    lineDash: [ 2 ]
  }, // style for grid line
  tickLine: null, // scale line of axis, not displayed by default
  labelOffset: 7.5 // distance between axis line and axis text
};

const Theme = {
  fontFamily: '"Helvetica Neue", "San Francisco", Helvetica, Tahoma, Arial, "PingFang SC", "Hiragino Sans GB", "Heiti SC", "Microsoft YaHei", sans-serif', // default font
  defaultColor: '#1890FF', // default color
  pixelRatio: 1, // default pixel ratio, configured by users
  padding: 'auto', // padding of chart, automatically calculated by default
  appendPadding: 15, // default blank padding, 15px by default
  colors: [
    '#1890FF',
    '#2FC25B',
    '#FACC14',
    '#223273',
    '#8543E0',
    '#13C2C2',
    '#3436C7',
    '#F04864'
  ], // default color group
  shapes: {
    line: [ 'line', 'dash' ],
    point: [ 'circle', 'hollowCircle' ]
  },
  sizes: [ 4, 10 ], // default range
  axis: {
    bottom: Util.mix({}, defaultAxis, {
      grid: null
    }), // configuration for bottom axis
    left: Util.mix({}, defaultAxis, {
      line: null
    }), // configuration for left axis
    right: Util.mix({}, defaultAxis, {
      line: null
    }), // configuration for right axis
    circle: Util.mix({}, defaultAxis, {
      line: null
    }), // arc coordinate axis configuration in polar coordinate
    radius: Util.mix({}, defaultAxis, {
      labelOffset: 4
    }) // radius coordinate axis configuration in polar coordinate
  }, // configurations for axes
  shape: {
    line: {
      lineWidth: 2, // default line width
      lineJoin: 'round',
      lineCap: 'round'
    }, // configurations for line chart
    point: {
      lineWidth: 0,
      size: 3 // default radius of circle
    }, // configurations for dot charts
    area: {
      fillOpacity: 0.1
    } // configurations for area chart
  },
  _defaultAxis: defaultAxis // used to get default configurations for axes
};
```

## Method

`F2.Global` provides a method called `setTheme(cfg` to help set theme.

### Global.setTheme

`Global.setTheme(cfg)`

- cfg: Object, theme configuration customized by users

Example of commonly used configurations

```js
F2.Global.setTheme({
  pixelRatio : 2
}); // double precision configuration
```

### How to alter global configuration

There are two ways to alter global configuration:

- Use F2.Global to directly alter the configuration of a specific attribute.
- Change the theme style to alter a series of configurations.

#### Alter a configuration

```js
F2.Global.pixelRatio = 2;

F2.Global.colors = [ 'red', 'blue' ];
```

#### Set theme style

```js
F2.Global.setTheme({
  colors: [ 'red','blue' ],
  pixelRatio: 2,
  guide: {
    line: {
      stroke: 'red',
      lineWidth: 2
    }
  }
});
```



