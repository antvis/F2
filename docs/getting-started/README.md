# Getting Started

Let's get started using F2!

First, we need to have a canvas in our page.

```html
<canvas id="myChart"></canvas>
```

Now that we have a canvas we can use, we need to include F2 in our page.

```html
<!-- online -->
<script src="https://gw.alipayobjects.com/os/antv/assets/f2/3.1.0/f2.js"></script>
```

Now, we can create a chart. We add a script to our page:

```javascript
const data = [ 
  { genre: 'Sports', sold: 275 },
  { genre: 'Strategy', sold: 115 },
  { genre: 'Action', sold: 120 },
  { genre: 'Shooter', sold: 350 },
  { genre: 'Other', sold: 150 },
];

const chart = new F2.Chart({
  id: 'myChart', // the canvas dom's id
  width: 500,
  height: 300
});
// load the data
chart.source(data);
// draw a column chart
chart.interval().position('genre*sold').color('genre');
chart.render();
```

<img src="https://gw.alipayobjects.com/zos/rmsportal/DilorPgmSmZjWNkEqIdp.png" width="256">

It's that easy to get started using F2! From here you can explore the many options that can help you customize your charts with scales, tooltip, axis, geoms, legends and much more.

There are many examples of F2 that are available in the `/demos` folder of `f2.zip` that is attached to every [release](https://github.com/antvis/f2/releases).
