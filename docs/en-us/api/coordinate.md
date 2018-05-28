# Coordinate

F2 supports two kinds of coordinates, Cartesian coordinate and polar coordinate. Cartesian coordinate is used by default.

## Setup Coordinate

### Cartesian Coordinate

```js
// use Cartesian coordinate
chart.coord('rect');
// transpose coordinate, needed when drawing bar chart
chart.coord({
  transposed: true
});
chart.coord('rect', {
  transposed: true
});
```

### Polar Coordinate

```js
// use polar coordinate
chart.coord('polar');
// more configurations
chart.coord('polar', {
  transposed: true, // transpose coordinate
  startAngle: {Number}, // starting angle
  endAngle: {Number}, // ending angle
  innerRadius: {Number}, // Inner ring radius, range of [0, 1]
  radius: {Number} // radius, range of [0, 1]
});
```

## Get Coordinate Object

Use `chart.get('coord')`  to return the coordinate object. Different Coordinate contains different attributes, specific instructions are as follows:

1. Cartesian Coordinate

   | Attribute  |  Type   |               Explanation                |
   | :--------: | :-----: | :--------------------------------------: |
   |   start    | Object  | The starting point of the coordinate in canvas, the origin of the coordinate in F2 chart is located in the lower left corner. |
   |    end     | Object  | The position of upper right corner of the coordinate system in canvas. |
   | transposed | Boolean | Wether the coordinate is transposed, true means it ts transposed. |
   |   isRect   | Boolean | Wether it is a Cartesian coordinate, the value is true if it is. |

2. Polar Coordinate

   |  Attribute   |  Type   |               Explanation                |
   | :----------: | :-----: | :--------------------------------------: |
   |  startAngle  | Number  |  The starting angle of polar coordinate  |
   |   endAngle   | Number  |   The ending angle of polar coordinate   |
   | innerRadius  | Number  | The internal hollow radius when a ring is drawn, relative value, range of [0, 1] |
   |    radius    | Number  | The radius of the circle, relative value, range of [0, 1] |
   |   isPolar    | Boolean | Wether it is a polar coordinate, true if it is |
   |  transposed  | Boolean | Wether it is transposed, true means it is |
   |    center    | Object  | The position of the coordinate's center in canvas |
   | circleRadius | Number  |      radius of the polar coordinate      |

## Example

### Ring Chart

```js
const data = [
  { name: '芳华', proportion: 0.4, a: '1' },
  { name: '妖猫传', proportion: 0.2, a: '1' },
  { name: '机器之血', proportion: 0.18, a: '1' },
  { name: '心理罪', proportion: 0.15, a: '1' },
  { name: '寻梦环游记', proportion: 0.05, a: '1' },
  { name: '其他', proportion: 0.02, a: '1' },
];
const chart = new F2.Chart({
  id: 'ring',
  width: 300,
  height: 300 * 0.64,
  pixelRatio: window.devicePixelRatio,
});
chart.source(data);
chart.legend({
  position: 'right'
});
chart.coord('polar', {
  transposed: true,
  innerRadius: 0.7,
});
chart.axis(false);
chart
  .interval()
  .position('a*proportion')
  .color('name', [
    '#1890FF',
    '#13C2C2',
    '#2FC25B',
    '#FACC14',
    '#F04864',
    '#8543E0',
  ])
  .adjust('stack');

chart.render();
```

### Semicircle

```js
const data = [
  { name: '芳华', proportion: 0.4, a: '1' },
  { name: '妖猫传', proportion: 0.2, a: '1' },
  { name: '机器之血', proportion: 0.18, a: '1' },
  { name: '心理罪', proportion: 0.15, a: '1' },
  { name: '寻梦环游记', proportion: 0.05, a: '1' },
  { name: '其他', proportion: 0.02, a: '1' },
];
const chart = new F2.Chart({
  id: 'pie',
  width: 300,
  height: 300 * 0.64,
  pixelRatio: window.devicePixelRatio,
});
chart.source(data);
chart.legend({
  position: 'bottom',
  align: 'center'
});
chart.coord('polar', {
  transposed: true,
  startAngle: -Math.PI,
  endAngle: 0,
});
chart.axis(false);
chart
  .interval()
  .position('a*proportion')
  .color('name', [
    '#1890FF',
    '#13C2C2',
    '#2FC25B',
    '#FACC14',
    '#F04864',
    '#8543E0',
  ])
  .adjust('stack');

chart.render();
```

