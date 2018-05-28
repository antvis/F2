# Animation

F2 provides two kinds of animations by default:

1. Group entrance animation
2. Detail animation. Detail animation uses shape as object unit, and includes two kinds of entrance animations `appear` and `enter`, one updating animation `update` and one destroy animation `leave`.

If the only use of the chart is to display information, users can choose to use the first strategy of the animation and reduce the code. If more rich animation is needed, the detail animation is preferred.

In addtion, F2 also provides custom animation mechanism to help users customize more vivid, more scene-based animation.

Detail animation is required by default in complete version of F2. Users are allowed to use the require-on-demand strategy to require specific animations.

## How to require animation on demand

1. Group Entrance Animation

   ```js
   const GroupAnimation = require('@antv/f2/lib/animation/group');
   Chart.plugins.register(GroupAnimation); // Global registeration, registeration for a chart instance is also available
   ```

2. Detail Animation

   ```js
   const Animation = require('@antv/f2/lib/animation/detail');
   Chart.plugins.register(Animation); // Global registeration, registeration for a chart instance is also available
   ```

**NOTE: **

1. Choose one of the two animations above;
2. If you use `require(''@antv/f2')`, you are requiring the detail animation.

## Details on Configuring Animations

### Categories of the Animations

According to the change of the chart data, we classified animation into four kinds in F2:

| Animation Type |                         Explanation                          |           Trigger Timing           |
| :------------: | :----------------------------------------------------------: | :--------------------------------: |
|     apear      |    The entrance animation when the chart is first loaded     | fist time calling `chart.render()` |
|     enter      | The entrance animation when the chart is re-rendered after the change of the source data |      `chart.changeData(data)`      |
|     update     | The updating animation when the chart is re-rendered and chart's status is updated after the change of the source data |      `chart.changeData(data)`      |
|     leave      | The destroy animation when the chart os destroyed after the change of the source data |      `chart.changeData(data)`      |

The `apear` animation will be triggered when the chart is first loaded, and after the method `chart.changeData(data)` is called, three kinds of animation `update`, `leave` and `enter` may be triggered.

If the user is using only the group entry animation, only the `appear` animation is provided. Detail animation provides the above four animation type, details about configuration is described below.

### chart.animate()

Global configuration for animation

1. `chart.animate(false)`

   Turn off the animation globally.

2. `chart.animate(cfg)`

   Animation configuration for chart's elements.

   - Parameter: `cfg`
   - type: Object
   - return: the current chart instance

   ```js
   chart.animate({
     'axis-label': {
       appear: {
         animation: {String} || {Function}, // animation function
         easing: {String} || {Function}, // animation easing function
         delay: {Number} || {Function}, // animation delay time
         duration: {Number}  // animation time
       }, // initialize entrance animation
       update: {}, // configuration for updating animation，attribues are same as appear animation
       enter: {}, // configuration for enter animation, attributes are same as appear animation
       leave: {} // configuration for destroy animation, attributes are same as appear animation
     }, // animation configs for axis label
     'axis-tick': {} // animation configs for axis-tick, attributes are same as axis-label
     'axis-grid': {} // animation configs for axis-grid, attributes are same as axis-label
     'axis-line': {} // animation configs for axis-line, attributes are same as axis-label
     line: {} // animation configs for line chart, attributes are same as axis-label
     area: {} // animation configs for area chart, attributes are same as axis-label
     interval: {} // animation configs for histograms, attributes are same as axis-label
     path: {} // animation configs for path chart, attributes are same as axis-label
     point: {} // animation configs for dot chart, attributes are same as axis-label
     polygon: {} // animation configs for polygon, attributes are same as axis-label
     schema: {} // animation configs for path schema, attributes are same as axis-label
   });
   ```

The graph elements current support animation include:

- `axis-label`
- `axis-grid`
- `axis-tick`
- `axis-line`
- `line`
- `area`
- `interval`
- `path`
- `point`
- `polygon`
- `schema`

Each graph elements listed above can use the four kinds of animations (appear, enter, update, leave) discussed earlier, and for each kind of animation, the configurable attributes are:

```js
// configuration for appear animation
appear: {
  animation: 'fadeIn', // animation action
  easing: 'elasticIn', // easing function
  delay: 1000, // delay time, in millisecond
  duration: 600 // animation duration, in millisecond
```

- `animation`: String/Function. Declare the animation action,

   It is the animation action which can be specific with a string, in this way, you are using the animation provided by F2 (see below). Users are also allowed to register an animation through [animation registeration mechanism](#_animation registeration_mechanism) and use the animation name afterwards.

  ```js
  // specify the animation name
  animation: 'groupWaveIn'
  ```

  Animation action can also be a callback, see below:

  ```js
  /**
   * Animation callback
   * @param  {Shape} shape       shape object of the animation
   * @param  {Object} animateCfg configuration of the animation, such as easing, duration, etc.
   * @param  {Coord} coord       current coordinate object
   * @return {null}              no returns
   */
  animation: (shape, animateCfg, coord) {
    
  }
  ```

  The animations provided by default are shown below:

  |     Animation     |                         Description                          |                             Demo                             |
  | :---------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
  |   `groupWaveIn`   | Group Entrance Animation, behaves differently in different coordinates | <img src="https://gw.alipayobjects.com/zos/skylark/7f6b6a19-b7bf-42ee-b8fd-d9128390ca02/2018/gif/b124e6f0-dcdd-4450-9cd6-fcd7e5ddfc8a.gif" style="width: 50%;"><img src="https://gw.alipayobjects.com/zos/skylark/63413703-2864-4aa0-8066-895235a5ef44/2018/gif/aee88888-17b3-48ae-863b-8df3313afdbd.gif" style="width: 50%;"> |
  |  `groupScaleInX`  |                   Group Entrance Animation                   | <img src="https://gw.alipayobjects.com/zos/skylark/20b87a04-e640-4a0b-9fe7-55b0a66253e9/2018/gif/725dfd08-31be-4a40-aad7-79eafa0bf252.gif" style="width: 50%;"><img src="https://gw.alipayobjects.com/zos/skylark/7b038ba8-208f-4f69-859c-fe5f6867054c/2018/gif/07dd9c4b-547b-44f5-952f-7b5894f4191d.gif" style="width: 50%;"> |
  |  `groupScaleInY`  |                   Group Entrance Animation                   | <img src="https://gw.alipayobjects.com/zos/skylark/7f269fd8-2271-4074-8fac-615efc09b269/2018/gif/d9e0af21-e3ba-4394-a29a-db052e8a07bb.gif" style="width: 50%;"> <img src="https://gw.alipayobjects.com/zos/skylark/64d238d0-6798-42b0-a3bb-5fbcb91faa5f/2018/gif/7493b01b-adf1-4603-8105-343c4eec718f.gif" style="width: 50%;"> |
  | `groupScaleInXY`  |                   Group Entrance Animation                   | <img src="https://gw.alipayobjects.com/zos/skylark/46dcc363-ef4f-46e9-8ffb-fd2bc333381f/2018/gif/67a5bcec-fa9a-4880-9efd-9b8f1ad0d8a2.gif" style="width:50%;"><img src="https://gw.alipayobjects.com/zos/skylark/d89e7fca-91db-4edf-93da-dc71e1646dc1/2018/gif/a20f8e21-3522-4c83-a36e-1ef6fde1f76e.gif" style="width:50%;"> |
  | `shapesScaleInX`  | Group Entrance Animation. Unlike groupScale, each shape participates in the animation | <img src="https://gw.alipayobjects.com/zos/skylark/d2b714be-42aa-4183-8de6-249c39a8c2d3/2018/gif/65e050f2-1789-4b04-9a89-6552334c946c.gif" style="width:50%;"> |
  | `shapesScaleInY`  | Group Entrance Animation. Unlike groupScale, each shape participates in the animation | <img src="https://gw.alipayobjects.com/zos/skylark/c7a90e7d-fdc3-4d72-b06b-60f9eecced4d/2018/gif/021ee262-e0a3-4396-8232-774f8136f138.gif" style="width:50%;"> |
  | `shapesScaleInXY` | Group Entrance Animation. Unlike groupScale, each shape participates in the animation | <img src="https://gw.alipayobjects.com/zos/skylark/cf2f660f-48d2-46e9-b7e2-e6b59f0333df/2018/gif/6d08442e-df89-4116-83e9-8a36c2459645.gif" style="width:50%;"> |
  |     `fadeIn`      |             Animation for a single shape object              | <img src="https://gw.alipayobjects.com/zos/skylark/1645e658-c007-43da-9d1f-baa326bcefef/2018/gif/2ea38ccf-8d7c-42c6-a1fb-7baf64026dd9.gif" style="width:50%;"> |

- `easing`: String/Function, easing action for animation.

  You can use the default easing functions provided by F2 or pass the function directly.

  ```js
  // method 1：specific the easing function with name
  easing: 'quadraticOut',
  
  // method 2: pass the easing function directly
  easing: (t) => {
    return Math.sqrt(1 - --t * t);
  }
  ```

  The default easing functions are: `linear`, `quadraticIn`, `quadraticOut` `quadraticInOut`, `cubicIn`, `cubicOut`, `cubicInOut`, `elasticIn`, `elasticOut`, `elasticInOut`, `backIn`, `backOut`, `backInOut`, `bounceIn`, `bounceOut`,  `bounceInOut`.

  For animation effect of each easing function, see http://sole.github.io/tween.js/examples/03_graphs.html.

- `delay`: Number/Function, delay action for animation.

  You can specify delay time directly or pass a callback:

  ```js
  // method 1: specify the delay time directly, in millisecond
  delay: 1000,
  
  // method 2: use callback to calculate delay
  /**
   * return the delay of the animation
   * @param  {Number} index      index of the shape, same as the order of the data record in data set.
   * @param  {String} id         id of current shape
   * @return {Number}            delay of the animation, in millisecond
   */
  delay: (index, id) {
    
  }
  ```

- `duration`: Number, duration of the animation, in millisecond.

### geom.animate()

Animation configuration for geometry object. Each geometry has default animation type and corresponding configuration in F2, and users are also allowed to customize animation for geometries.

**NOTE: **

1. If users call `chart.animate(false)` to turn off chart animation, configuration for `geom.animate()` is invalid.
2. If both configurations of `chart.animate()` and `geom.aniamte()` are specified, the configuration of the `geom.animate` is used.

The configurable attributes are `animation`, `easing`, `delay`, and `duration`, see earlier discuss of this chapter for more details.

```js
geom.animate({
  appear: {
    animation: {String} || {Function},
    easing: {String} || {Function}, 
    delay: {Number} || {Function}, 
    duration: {Number}  
  },
  enter: {
    animation: {String} || {Function}, 
    easing: {String} || {Function}, 
    delay: {Number} || {Function}, 
    duration: {Number}  
  },
  update: {
    animation: {String} || {Function}, 
    easing: {String} || {Function}, 
    delay: {Number} || {Function}, 
    duration: {Number}  
  },
  leave: {
    animation: {String} || {Function}, 
    easing: {String} || {Function}, 
    delay: {Number} || {Function}, 
    duration: {Number}  
  },
});
```

### shape.animate()

We provide an interface called animate for every shape object to act the specific animation. See below for usage:

```js
shape.animate()
  .to({
    attrs: {Object}, // the final graph attributes of the shape
    easing: {String} || {Function}, // easing function
    duration: {Number}, // duration of the animation, in millisecond
    delay: {Number} // delay time of the animation, in millisecond
  }) // animation action
  .onStart(function() {
    // callback when animation starts
  })
  .onUpdate(function() {
    // callback during the animation
  })
  .onEnd(function() {
    // callback when animation ends
  })
  .onFrame(t => {
    // indicates the progress of the animation, value ranges from 0 to 1.
    // users can customize animation for every frame
  });
```

## Animation Registeration

Animation registeration is used to achieve the goal of reusing customed animation functions.

```js
// require registeration class of animation
const Animate = require('@antv/f2/lib/animation/animate');
/**
 * @param  {String} animationName   Animation name, specified by users
 * @param  {Function} animationFun  Animation action function
 **/
Animate.registerAnimation('animationName', animationFun); //  register a animation called animationName


// use the registered animation
chart.line().animate({
  appear: {
    animation: 'animationName'  // the registered name of the animation
  }
})
```

## Details on Custom Animation

F2 provides a complete animation customization mechanism. Users can customize animation behavior for any states of graphic element that supports animation. The states here are the four kinds of animations, i.e. appear, enter, leave, update.

The animations in F2 all act on [Shape](./g.html#_Shape). The animation is performed by changing shape's graph attributes frame by frame, take the movement of the circle as example:

<img src="https://gw.alipayobjects.com/zos/rmsportal/VsphIrCJSqpILogoZTiS.gif" style="width: 50%;">

The animation is very simple, it moves the circle from point A to point B (the coordinate is `{x: 230, y: 50}`). We need only to call `shape.animate()` to specify the final state, i.e. graph attributes, of the shape.

```js
// the initial position of circle on canvas is x: 100, y: 100
circle.animate().to({
  attrs: {
    x: 230, // final coordinate of x-axis
    y: 50   // final coordinate of y-axis
  }, // specify the final state of the circle
  easing: 'linear', // easing function
  duration: 1500 // duration of the animation
})
```

See [graphic api](./g.html#_Shape) for graph attributes of various shapes.

Three parameters will be passed to the user-defined animation function, in the order of `shape`, `animateCfg`, `coord`.

```js
chart.line().animate({
  appear: {
    animation: (shape, animateCfg, coord) => {}
  }
})
```

- `shape`: The shape object which animation is acted on.

You can get graph attributes from shape object and then customize the animation.

The attributes are provided to help users ease the customization:

| Attributes  |     Method To Get      |  Type  |                         Explanation                          |
| :---------: | :--------------------: | :----: | :----------------------------------------------------------: |
|   `attrs`   |   shape.get('attrs')   | Object |            Get all graph attributes of the shape             |
| `className` | shape.get('className') | String |                Get the type name of the shape                |
|  `origin`   |  shape.get('origin')   | Object | Get the drawing data and corresponding original data record of the shape |
|   `index`   |   shape.get('index')   | Number | Get the index of the shape, i.e. the order of the data record in data set |

In addition,  `shape.attr(name)` can also be used to get graph attribute from shape. More methods of shape are listed in [Shape API](./g.html#_Cmmon Methods).

F2 also provides a cacheShape attribute for the shape object in the update state.This attribute stores the content of the previous state for the shape, so that users can customize the animation for changing. The cacheShape contains the following content:

```js
{
  animateCfg: {}, // configuration for animation
  attrs: {}, // graph attrs of previous state
  className: "", // class name of the shape
}
```

- `animateCfg`: Object, configuration for animation

  The following atrributes are contained in animateCfg:

  ```js
  {
    easing: , // easing function
    duration: , // duration of the animation
    delay: // delay of the animation
  }
  ```

- `coord`: Coordinate object, represents the current coordinate of the chart. The attributes contained in coordinate object are listed in [Coordinate API](./coordinate.html#_Get Coordinate Object).

## Example

The example below shows how to customize the `apear` animation for histogram:

![column1.gif](https://gw.alipayobjects.com/zos/skylark/477ede4d-3496-42c9-97a6-f63195765dbd/2018/gif/2e743bec-fefb-46f1-96f3-cc0e965d4234.gif) 

```js
const { Chart, Animate, Util, G } = F2;
  // register an animation called delayScaleInY, the animation magnifies the histogram in y-axis
  Animate.registerAnimation('delayScaleInY', function(shape, animateCfg) {
    const box = shape.getBBox(); // get the border box of the shape
    const origin = shape.get('origin'); // get the drawing data of the shape
    const points = origin.points; // the point of each column
    const centerX = (box.minX + box.maxX) / 2;
    let centerY;
    if (points[0].y - points[1].y <= 0) { // when the point is below origin point
      centerY = box.maxY;
    } else {
      centerY = box.minY;
    }

    shape.transform([
      [ 't', centerX, centerY ],
      [ 's', 1, 0.1 ],
      [ 't', -centerX, -centerY ]
    ]); // use matrix transformation to change the origin state of the shape, shorten the size to 0.1 times in y-axis.
    const index = shape.get('index');
    let delay = animateCfg.delay; // get the animation configuration
    if (Util.isFunction(delay)) {
      delay = animateCfg.delay(index); // set delay time according to the index
    }
    const easing = animateCfg.easing; // get the animation configuration

    const matrix = shape.getMatrix(); // get the current matrix
    const endMatrix = G.Matrix.transform(matrix, [
      [ 't', centerX, centerY ],
      [ 's', 1, 10 ],
      [ 't', -centerX, -centerY ]
    ]); // the matrix for the final state of the shape

    shape.animate().to({
      attrs: {
        matrix: endMatrix
      },
      delay,
      easing,
      duration: animateCfg.duration
    }); // do the animation
  });

  const data = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      x: i,
      y: (Math.sin(i / 5) * (i / 5 - 10) + i / 6) * 5
    });
  }
  const chart = new Chart({
    id: 'mountNode',
    width: 375,
    height: 200,
    pixelRatio: window.devicePixelRatio
  });
  chart.axis('x', false);
  chart.legend(false);
  chart.source(data);
  chart.interval()
    .position('x*y')
    .color('y', '#4a657a-#308e92-#b1cfa5-#f5d69f-#f5898b-#ef5055')
    .animate({ // customize animation configuration
      appear: {
        animation: 'delayScaleInY', // use the registered animation name
        easing: 'elasticOut', // easing function
        delay(index) {
          return index * 10;
        } // delay time for each shape according to index
      }
    });
  chart.render();
```

