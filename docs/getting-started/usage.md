# Usage

F2 can be used with ES6 modules, plain JavaScript and module loaders.

## Creating a Chart

To create a chart, we need to instantiate the `Chart` class. To do this, we need to pass in the node, id, or 2d context of the canvas of where we want to draw the chart. Here's an example.

```html
<canvas id="myChart" width="400" height="400"></canvas>
```

Once you have the element or context, you're ready to instantiate a chartridd!

The following example instantiates a bar chart showing the different types of game sales.
.

```html
<canvas id="myChart" width="400" height="400"></canvas>
<script>
const data = [ 
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const chart = new F2.Chart({
  id: 'myChart'
});
// load the data
chart.source(data);
// draw a column chart
chart.interval().position('genre*sold').color('genre');
chart.render();
</script>
```
