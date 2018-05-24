# F2 Quick Start

F2 ( Fast & Flexible ), is a out-of-box visualization solution tailored to the mobile devices. F2 is based on grammar of graphics, and it is light-weighted, high-performance and easily expandable. F2 is designed for harsh scenarios where performance, size and scalability is extremely critical.

## Features

- Elegant user experience: It is based on AntV's complete mobile visualization system
- Easily expandable: Customizable shapes and animations, flexible charting components, infinite creativity
- Draw quickly: F2 pursues the utltimate performance for drawing, lots of optimization have been donw for mobile devices
- Light-weighed: F2 maintains a compact code size while supporting more than 45 kinds of chars

We would like to thank Leland Wilkinson, author of The Grammar of Graphics, for providing theoretical basis for F2's graphic syntax.

## Installation

### Imported into browser

You can either download the scripts and import locally or use the online references.

```javascript
<!-- import the online resources -->
<script src="{{ url.f2 }}"></script>

<!-- import the local resources -->
<script src="./f2.js"></script>
```

You can also downloaded F2 directly through [unpkg](https://unpkg.com/@antv/f2).

### Using nam to Install

```shell
npm install @antv/f2 --save
```

After a successful installation, you can import or require to reference it.

```javascript
const F2 = require('@antv/f2');
```



## Quick Start

After importing F2, we are ready to create  out first chart.

The following is a basic histogram as an example to demonstrate the creation of charts using F2.

### Imported into brower

1. Create `<canvas>` tag

   create a `<canvas>` tag and specify an id

   ```html
   <canvas id="myChart" width="400" height="260"></canvas>
   ```

2. Write drawing code for chart

   After creating tag, we are ready to write some simple drawing code for charts:

   1. create a `Chart` object, specify the id of chart, height of chart, margins of charts, etc
   2. load the data source of chart
   3. use the grammar of graphics to draw the chart
   4. render the chart

   ```javascript
   // The data source format requirements of F2 are just JSON arryas, each element of the array is a standard JSON object.
   const data = [ 
     { genre: 'Sports', sold: 275 },
     { genre: 'Strategy', sold: 115 },
     { genre: 'Action', sold: 120 },
     { genre: 'Shooter', sold: 350 },
     { genre: 'Other', sold: 150 },
   ];
   
   // Step 1: create a Chart object
   const chart = new F2.Chart({
     id: 'myChart',
     pixelRatio: window.devicePixelRatio // specify resolution
   });
   
   // Step 2: load data source
   chart.source(data);
   
   // Step 3：create graphic syntax to draw a histogram, the position of the histogram is determined by genre and sold attributes, genre maps to x axis, and sold maps to y axis
   chart.interval().position('genre*sold').color('genre');
   
   // Step 4: render the chart
   chart.render();
   ```

   After completing the above two steps, save the file and open it with the browser, a histogram is drawn successfully:

   ```js-
   const data = [ 
     { genre: 'Sports', sold: 275 },
     { genre: 'Strategy', sold: 115 },
     { genre: 'Action', sold: 120 },
     { genre: 'Shooter', sold: 350 },
     { genre: 'Other', sold: 150 },
   ];
   
   const chart = new F2.Chart({
     id: 'myChart',
     pixelRatio: window.devicePixelRatio // 指定分辨率 
   });
   // load the data
   chart.source(data);
   // draw a column chart
   chart.interval().position('genre*sold').color('genre');
   chart.render();
   ```

   

   ## More Examples

   For more examples, read [Demo](../demo/index.html)

