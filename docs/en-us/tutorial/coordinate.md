# Coordinate

A coordinate is a 2-dimensional position system that combines two kinds of position scales and describes how the data is mapped to the plane where chart is located.

F2 provides two kinds of coordinates, Cartesian coordinate and polar coordinate. Both coordinates are 2-dimensional.

## How to setup coordinate

F2 defaults to Cartesian coordinate, if you need to switch the coordinate, you can use the following syntax to declare the coordinate:

```js
chart.coord('coordType'); // declare the type of the coordinate

chart.coord('coordType', {
  	// setup coordinate
});
```

| coordinate type | comments                                                     |
| --------------- | ------------------------------------------------------------ |
| `rect`          | Cartesian coordinate, currently supports only two dimensions, consisting of two mutually perpendicular coordinate axes, x and y. |
| `polar`         | Polar coordinate, consists of 2 dimensions of angle and radius. |

## Coordinate Type and Configuration

The coordinates can be divided into Cartesian coordinate and non-Cartesian coordinate, and non-Cartesian coordinate is polar coordinate in F2, its position is determined by angle and radius.

Polar coordinate can be used to generate pie charts, rose charts, radar charts, etc., and is more suitable for cyclical data, such as time and direction.

The change of the coordinate type will also change the shape of the geometry. For example, the rectangle will become part of the circle in polar coordinate.

For example, the histograms and stacked histograms shown in the below can be transformed into different types in different coordinates:

|                    | Cartesian coordinate                                         | polar coordinate (not transposed)                            |                polar coordinate (transposed)                 |
| ------------------ | ------------------------------------------------------------ | ------------------------------------------------------------ | :----------------------------------------------------------: |
| stacked histograms | ![undefined](https://gw.alipayobjects.com/zos/skylark/e3c2af2e-8c42-4743-9eb2-00be4beecb50/2018/png/4b932828-aad3-4934-99be-0580dd6b88ba.png) | ![undefined](https://gw.alipayobjects.com/zos/skylark/a0e92822-3020-4f2c-b63b-19e9e7204a86/2018/png/cdb767a2-105d-499d-af09-383323b35222.png) | ![undefined](https://gw.alipayobjects.com/zos/skylark/5de8fa15-6ea1-4a13-93c0-e4646ca6601c/2018/png/a43c60de-692f-433a-bab2-93fc6e9bba3b.png) |
| histograms         | ![undefined](https://gw.alipayobjects.com/zos/skylark/e392736b-86a1-4452-9265-f7a5e8dc1805/2018/png/47caf538-6703-4db5-ae68-6605837f2803.png) | ![undefined](https://gw.alipayobjects.com/zos/skylark/383cdf9f-a631-4fc4-9f6a-593a22822242/2018/png/dd798932-1555-4988-bc68-353835d051b3.png) | ![undefined](https://gw.alipayobjects.com/zos/skylark/1a056c5c-13da-46d4-9315-2d589588d889/2018/png/4171f504-2f52-4ed6-ba8f-b7b286650692.png) |

### Configuration for coordinate

#### Cartesian coordinate

```js
// declare a Cartesian coordinate
chart.coord('rect');
// transpose
chart.coord('rect', {
  transposed: true
});
```

#### Polar coodinate

```js
// declare a polar coordinate
chart.coord('polar');
// configs
chart.coord('polar', {
  startAngle: {Number}, // starting angle
  endAngle: {Number}, // ending angle
  innerRadius: {Number}, // radius for hollow section
  radius: {Number}, // radius for solid circle
  transposed: true // transpose
});
```

It should be noted here that the default starting angle and ending angle of F2's polar coordinate are are shown in the figure below:

<img src="https://zos.alipayobjects.com/skylark/85950a42-9579-44cb-b656-8dd28c9a014a/attach/2378/d648679184c6977c/image.png" />