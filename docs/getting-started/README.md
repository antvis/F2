# Getting Started

Let's get started using F2!

First, we need to have a canvas in our page.

```html
<canvas id="myChart"></canvas>
```

Now that we have a canvas we can use, we need to include F2 in our page.

```html
<!-- online -->
<script src="https://gw.alipayobjects.com/os/antv/assets/f2/3.1.1/f2.js"></script>
```

Now, we can create a chart. We add a script to our page:

```javascript
const data = [
  { year: '1951 年', sales: 38 },
  { year: '1952 年', sales: 52 },
  { year: '1956 年', sales: 61 },
  { year: '1957 年', sales: 145 },
  { year: '1958 年', sales: 48 },
  { year: '1959 年', sales: 38 },
  { year: '1960 年', sales: 38 },
  { year: '1962 年', sales: 38 },
];
const chart = new F2.Chart({
  id: 'myChart',
  width: 375,
  height: 265,
  pixelRatio: window.devicePixelRatio
});

chart.source(data);
chart.interval().position('year*sales');
chart.render();
```

<img src="https://gw.alipayobjects.com/zos/rmsportal/vNBNIGvCiIwqLwaYjWUy.png" width="375">

It's that easy to get started using F2! From here you can explore the many options that can help you customize your charts with scales, tooltip, axis, geoms, legends and much more.

There are many examples of F2 that are available in the AntV [demos](https://antv.alipay.com/zh-cn/f2/3.x/demo/index.html).
