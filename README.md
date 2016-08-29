# g2-mobile
the mobile version of g2

[G2-mobile](https://g2.alipay.com) 是G2的一个子集，提供了常规图表满足移动端需求。它更轻量、更简洁。

[G2-mobile](https://g2.alipay.com) is a subset of G2, provides a regular graph to meet the needs of mobile terminal.It is more lightweight and more concise.

Want to learn more? See the [tutorial](https://g2.alipay.com/tutorial/).

For examples, see the [demo gallery](https://g2.alipay.com/mobile-demo/).


## Install

```bash
npm install g2-mobile
```

## Usage

```js
var GM = require('g2-mobile');
```

## Example

![image](https://zos.alipayobjects.com/rmsportal/cRILBoAJqzhbmqn.png)

```js
GM.Global.pixelRatio = 2;

var data = [
    {"tem":10,"city":"tokyo"},
    {"tem":4,"city":"newYork"},
    {"tem":3,"city":"berlin"}
  ];

var chart = new GM.Chart({
  id: 'c1'
});

chart.source(data, {
    tem: {
        tickCount: 5
    }
});

chart.axis('city', {
	label:{
		font:'14px'
	},
  grid: null
});

chart.axis('tem', {
	label:{
		font:'14px'
	}
});

chart.interval().position('city*tem').color('city');
chart.render();
```

More details at [G2 site](https://g2.alipay.com).

