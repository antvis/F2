# Gesture

Gesture is used to bind gesture event on chart. In addition to the basic system touch event such as touchstart, touchmove, touchend, F2 supports more complicated gesture events based on gesture library [hammerjs](https://github.com/hammerjs/hammer.js).

![image.png | left | 827x324](https://cdn.yuque.com/yuque/0/2018/png/104396/1524466228977-0589fe3d-2cef-4d42-946f-ae54f2dfb18b.png "")

## How to use the plug-in

Gesture serves as a plug-in for F2. The complete version of F2's code does not contain Gesture, you need to register it to Chart class or a specific Chart instance in order to use it.

The size of `hammerjs` is 20K, and it is shorten to 7.3K using GZIP.

```js
const F2 = require('@antv/f2/lib/core');
const Gesture = require('@antv/f2/lib/plugin/gesture');
// 1.Global Registeration
F2.Chart.plugins.register(Gesture); 
// 2.Register for a Chart instance
const chart = new F2.Chart({
  id: 'canvas',
  plugins: Gesture
});
```

## API

```js
// Initialize Gesture plug-in
chart.pluginGesture({
  gesture: {},
  hammerOptions: {},
  options: {},
});
```

### Parameters

- `gesture`: Object, event that needs to be bound, the configured property is a callback with event's name as key.

```js
 gesture: {
  touchstart(data, event) {
    console.log('touchstart')
  },
  press(data, event) {
    console.log('press')
  }
}
```

1. First parameter of the callback, data is the corresponding user data in the position where gesture happened.
2. Second parameter of the callback, event is the gesture event object, [touchEvent](https://developer.mozilla.org/zh-CN/docs/Web/API/TouchEvent) is returned after basic system gesture is triggered. If a hammer gesture is triggered, [eventObject](http://hammerjs.github.io/api/#event-object) is returned correspondingly,

- `hammerOptions`: Object, [configuration](http://hammerjs.github.io/api/#hammer.defaults) passed to hammer, normally do not need to configure.

- `options`: Object, configuration for gesture plug-in, see below.

  ```js
  options: {
    useCalculate: true, // wether use data point of the gesture, turn off if needed to improve performance
    useOffset: false // wether the offset of the chart relative to the page is needed. When the width of the chart exceeds the page's width, it will enter into scroll mode and the scroll record will be addedto the calculated position.
  }
  ```

  ​