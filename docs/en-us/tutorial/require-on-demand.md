# Require On Demand

F2 is used on the mobile device, therefore the size of the file is very important. By default, F2 contains the complete geometry types, scale types, coordinate types and chart components.Users may only need several of components, so F2 provides a strategy for require-on-demand reference, which can be used to customize included components.

## Commonly used versions and sizes

|                Version                 |               Description                | Size (after compressing) |
| :------------------------------------: | :--------------------------------------: | :----------------------: |
|     `require('@antv/f2/lib.core')`     | Only the core of graphic syntax is included, without any charts |           82K            |
| `require('@antv/f2/lib/index-simple')` | Contains only simple line charts, histograms (including grouped histograms, stacked histograms, waterfall charts), and pie charts (including ring charts) |           93K            |
| `require('@antv/f2/lib/index-common')` | Commonly used charts are included: area charts (including stacked area charts), histograms (like grouped histograms, stacked histograms, waterfall charts), line charts, dot charts (including bubble charts), pie charts (including ring charts), radar maps, etc., Cartesian coordinate and polar coordinate are also included. In addition, it contains timeCat scale, tooltip, legend, and guide. |           139K           |
|         `require('@antv/f2')`          |          Complete version of F2          |           155K           |

##  How to require on demand

Use require-on-demand reference through the following steps to reduce the introduction of unwanted code:

1. Install npm package of F2
2. Require core library of F2, **must be done**
3. Require the demanded modules

Step 2 and step 3 do not need to be done by the order.

### Install npm package of F2

```bash
$ npm install @antv/f2
```

### Import core library of F2

**Must be done**

```js
const Core = require('@antv/f2/lib/core');
```

This library contains the core processing logic of graphic syntax, which contains the following:

- Chart: The types of charts.
- Geom: The type of geometry, only contains the core processing of data, without any implementation of specific geometries such as line, area, column.
-  Attr: Attributes of charts, such as position, color, shape and size.
- Scale: Only the Linear, Cat and Identity these three basic types.
- Coord: Only includes Cartesian coordinate.
- Axis: Only contains the axes of Cartesian coordiante.
- G: Rendering engine.

### Require the demanded modules

The dynamically loadable modules are the following:

#### geom

Geometry module, used for drawing a specific figure, below is the usage:

```js
require('@antv/f2/lib/geom/'); // require all the charts

require('@antv/f2/lib/geom/line'); // only line chart is required
require('@antv/f2/lib/geom/area'); // only the area chart is required
require('@antv/f2/lib/geom/interval'); // only the histogram is required
require('@antv/f2/lib/geom/path'); // only the path map is required
require('@antv/f2/lib/geom/point'); // only the dot chart is required
require('@antv/f2/lib/geom/polygon'); // only the color map is required
require('@antv/f2/lib/geom/schema'); // only the box chart, stock chart are required
```

#### Coord

```js
require('@antv/f2/lib/coord/polar'); // polar coordinate

require('@antv/f2/lib/coord/cartesian'); // Cartesian coordiante（already included in the core library）
```

#### Axis

```js
require('@antv/f2/lib/component/axis/circle'); // Arc axis for polar coordinate

require('@antv/f2/lib/component/axis/line'); // Axes for Cartesian coordinate（already included in the core library）
```

#### adjust type

```js
require('@antv/f2/lib/geom/adjust/'); // requirea all types of adjust

require('@antv/f2/lib/geom/adjust/dodge'); // only grouped adjust is required
require('@antv/f2/lib/geom/adjust/stack'); // only stacked adjust is required
```

#### scale

```js
require('@antv/f2/lib/scale/time-cat'); // timeCat is required
```

#### animation

**The animation module serves as a plug-in for chart, therefore you need to register the module on chart after it is loaded.**

1. Only the entrance animation:

   ```js
   const GroupAnimation = require('@antv/f2/lib/animation/group');
   Chart.plugins.register(GroupAnimation); // Global registration，you can also just register it for an instance of chart 
   ```

2. Fine animation module (including entry, update, and destroy animation)

   ```js
   const Animation = require('@antv/f2/lib/animation/detail');
   Chart.plugins.register(Animation); // Global registration，you can also just register it
   ```

#### Guide

Guide is an auxiliary element and serves as an plug-in for chart. When using Guide, users can dynamically select the auxiliary element type to use, and then register the corresponding plug-in to the chart.

```js
// Step 1: require the demanded guide componments
require('@antv/f2/lib/component/guide'); // require all guide components

require('@antv/f2/lib/component/guide/arc'); // only Guide.Arc is required
require('@antv/f2/lib/component/guide/html'); // only Guide.Html is required
require('@antv/f2/lib/component/guide/text'); // only Guide.Text is required
require('@antv/f2/lib/component/guide/rect'); // only Guide.Rect is required
require('@antv/f2/lib/component/guide/line'); // only Guide.Line is required
require('@antv/f2/lib/component/guide/tag'); // only Guide.Tag is required

// Step 2: require the Guide plug-in
const Guide = require('@antv/f2/lib/plugin/guide');

// Step 3： register Guide
Chart.plugins.register(Guide); // Global registration，you can also just register it
```

#### Tooltip

Plug-in, prompt information module

```js
// Step 1：require tooltip
const Tooltip = require('@antv/f2/lib/plugin/tooltip');
// Step 2：register Tooltip
Chart.plugins.register(Tooltip); // Global registration，you can also just register it
```

#### Legend

Serves as a plug-in

```js
// Step 1: require Legend
const Legend = require('@antv/f2/lib/plugin/legend');
// Step 2: register Legend
Chart.plugins.register(Legend); // Global registration，you can also just register it
```

## Example of require-on-demand

If you only need to draw a pie chart without animation:

```js
const F2 = require('@antv/f2/lib/core'); // must be required
require('@antv/f2/lib/geom/interval'); // require interval geometry
require('@antv/f2/lib/coord/polar'); // require polar coordinate
```

## Visulization tool

For convenience, we provide UI-based require-on-demand packaging tool to help developers download the required charts and components. The usage is as follows:

```bash
# Go to the root directory of the F2 project and run:
$ npm run bundler
```

In the interface that appears, check the required module, and finally package and download it.

<img src="https://gw.alipayobjects.com/zos/rmsportal/RmUwBPLSWIbecmKEgoSw.png">

