# Legend

The generation of F2 legends is determined by the graphic attributes in the graphic syntax. We will automatically generate different types of legends based on the attribute mapping and the type of data. The two graphic attributes, color and size, will determine if the received parameter is field of the data source and if it is, a corresponding legend will be generated automatically:

1. Color. Different legends will use different colors to distinguish themselves. If the field is a classified data type, a discrete legend will be generated. If it a continuous data type, a corresponding continuous legend will be generated (not supported in current version).
2. Size. The size of the graph will be displayed in legend (not supported in current version).

## How to require legend

If you require the full F2 code by default, then the Legend is already registered in the Chart class. If you use a dynamic requirement strategy, you need to first register the component in the Chart class or a Chart instance.

```js
const F2 = require('@antv/f2/lib/core');
const Legend = require('@antv/f2/lib/plugin/legend');
Chart.plugins.register(Legend); // Method 1: Global Registeration

// Method2: Registeration for a Chart instance
const chart = new Chart({
  id: 'canvas',
  plugins: Legend
});
```

## API

### `chart.legend(false)`

Do not display all the legends

### `chart.legend(field, false)`

Do not display legend for the specific field

- `field`: String, field name of the corresponding legend

### `chart.legend(field, config)`

Configuration for the corresponding legend of the field, see below:

```js
chart.legend('gender', {
  position: 'right'
});
```

- `field`: String, field name of the corresponding legend
- `config`: Object, configuration object of the legend.

The attributes supported in `config` are as follows:

#### Parameter

- `position`: String, the display position of the legend, can be set to 'top', 'right', 'bottom', 'left', defaults to 'top'.
- `align`: String, valid when `position` is set to 'top' and 'bottom'. It is used to set the alignment of the legend in the horizontal direction. The values that can be set are: 'left', 'center', 'right', and the default is 'left'.

| left (default)                                               |                            center                            |                            right                             |
| ------------------------------------------------------------ | :----------------------------------------------------------: | :----------------------------------------------------------: |
| ![undefined](https://gw.alipayobjects.com/zos/skylark/14e43b86-b0d3-46bf-aa61-d9d35e40afc3/2018/png/58dffd37-ac70-466a-8ab0-7ff729927c52.png) | ![undefined](https://gw.alipayobjects.com/zos/skylark/8b616505-6336-4423-b600-ef0eda5e43cf/2018/png/71cffe7e-2cec-4a64-98d0-30dc25e601a5.png) | ![undefined](https://gw.alipayobjects.com/zos/skylark/a954ed14-8b32-4cdd-8e7e-c018d642cd2c/2018/png/d58b8647-c5b2-4f03-906d-4438665369b9.png) |

- `verticalAlign`: String, valid when `position` is set to 'left' and 'right'. It is used to set the alignment of the legendin the vertical direction. The values that can be set are: 'top', 'middle', 'bottom', and the default is 'middle'.

  |                       middle (default)                       |                             top                              |                            bottom                            |
  | :----------------------------------------------------------: | :----------------------------------------------------------: | :----------------------------------------------------------: |
  | ![undefined](https://gw.alipayobjects.com/zos/skylark/3e351090-9e91-44b7-9c79-9fae1576a83e/2018/png/90d4ab82-0baa-429c-a92a-eb06c51e9b0d.png) | ![undefined](https://gw.alipayobjects.com/zos/skylark/a6d8e7cd-951b-409e-96c7-b76a49ec0405/2018/png/6504d001-3bd8-4e3d-acd9-0c1fda595a0f.png) | ![undefined](https://gw.alipayobjects.com/zos/skylark/e5a77ada-f4bc-4acd-9611-aac5f9769a41/2018/png/795f70b0-89bc-4b1b-a8d6-b26b543521c4.png) |

- `itemWidth`: Number / 'auto', used to set width of the legend, defaults to 'auto', using the default layout of F2 to calculate the width. If the `itemWidth` is set to null, it will be calculated based on the width of the legend itself, developers are also allowed to set the value of the `itemWidth`.

- `showTitle`: Boolean, wether show the title of the legend, default to false.

- `titleStyle`: Object, the display style of the legend, see [Canvas](./canvas.html) for more details.

  ```js
  titleStyle: {
    textAlign: 'center', // alignment for text, can be set to： start, middle, end
    fill: '#404040', // color of the text
    fontSize: 12, // font size
    fontWeight: 'bold', // font weight
    textBaseline: 'top' // text baseline，can be set to: top, middle, bottom，defaults to middle
  }
  ```

- `offsetX`: Number, the offset of the legend in x-axis. The value unit is 'px' and the default value is 0.

- `offsetY`: Number, the offset of the legend in y-axis. The value unit is 'px' and the default value is 0.

- `titleGap`: Number, the distance between the title and the legend, defaults to 12px. If the title is not displayed, it is invalid.

- `itemGap`: Number, the distance between legends in horizontal direction, defaults to 12px.

- `itemMarginBottom`: Number, the blank space below each legend, defaults to 12px.

- `wordSpace`: Number, the distance between the marker and text, defaults to 6px.

- `unCheckColor`: String, color string used for unchecked marker and text.

- `itemFormatter`: Function, callback for formatting the text display in legend.

  ```js
  itemFormatter(val) {
    return val; // val is the text value for legend
  }
  ```

- `marker`: String/Function/Object, used to set the marker style of the legend, defaults to circle:

  - String: When `marker` is a string, the default type of markers provided by F2 is used:

    | marker type |                            style                             |
    | :---------: | :----------------------------------------------------------: |
    |  'circle'   | <img src="https://gw.alipayobjects.com/zos/skylark/9f52dd0d-104a-451d-9e56-8423e20c4581/2018/png/6780ea94-a9ca-452d-b9c8-8a1e74f8b73d.png" style="width: 84px;"> |
    |  'square'   | <img src="https://gw.alipayobjects.com/zos/skylark/a31497a6-23ae-4512-8eb8-7d697f158be9/2018/png/406e0df1-7d97-4361-be25-0f20e85418f7.png" style="width: 84px;"> |

  - Object: when `marker` is an object, symbol, radius and some other drawing attributes can be configured.

    ```js
    marker: {
      symbol: 'circle', // shape of the marker
      radius: 5 // radius of the circle
    }
    ```

  - Function: Used to customize the shape of the `marker`, below is the usage:

    ```js
    /**
     * customize the shape of marker
     * @param  {number} x   x-axis of the marker
     * @param  {number} y   y-axis of the marker
     * @param  {number} r   radius of the marker
     * @param  {object} ctx context object of the canvas
     * @return {null}     
     */
    marker(x, y, r, ctx) {}
    ```

    The following code draws a marker shown right:<img src="https://gw.alipayobjects.com/zos/skylark/041d2fef-a068-4012-ac28-2439e15bdbda/2018/png/c541e6b3-8f37-4cc9-b8bb-fd97345ef7da.png" style="width: 10%;">

    ```js
    chart.legend('city', {
      marker(x, y, r, ctx) {
        ctx.lineWidth = 2;
        ctx.strokeStyle = ctx.fillStyle;
        ctx.moveTo(x - r - 3, y);
        ctx.lineTo(x + r + 3, y);
        ctx.stroke();
        ctx.arc(x, y, r - 1, 0, Math.PI * 2, false);
        ctx.fill();
      }
    }); 
    ```

- `nameStyle`: Object, used to set the text style of the legend, see [Canvas](./canvas.html) for more details.

  ```js
  nameStyle: {
    textAlign: 'center', // alignment for text, can be set to： start, middle, end
    fill: '#404040', // color of the text
    fontSize: 12, // font size
    fontWeight: 'bold', // font weight
    textBaseline: 'top' // text baseline，can be set to: top, middle, bottom，defaults to middle
  }
  ```

- `valueStyle`: Object, used to set the text style of the legend, see [Canvas](./canvas.html) for more details.

  ```js
  valueStyle: {
      textAlign: 'center', // alignment for text, can be set to： start, middle, end
    fill: '#404040', // color of the text
    fontSize: 12, // font size
    fontWeight: 'bold', // font weight
    textBaseline: 'top' // text baseline，can be set to: top, middle, bottom，defaults to middle
  }
  ```

- `triggerOn`: String/Function, triggering events for filtering behavior of the legend, defaults to `click`.

  1. String: Define other event type.

  2. Function: Used to help users to bind their own events when F2 is not running under HTML5 environment.

     ```js
     /**
      * Bind and unbind events by users
      * @param {Function} method event callback
      * @param {String} type bind or unbind events
      */
     triggerOn(method, type) {
       // user's code
     }
     ```

     **Note that this attribute can only be set using `chart.legend({})` or in Global style**

- `clickable`: Boolean, wether the legend is clickabel, defaults to true.

- `obClick`: Function, callback for clicking the legend, invalid when `clickable` is false.

  ```js
  /**
   * callback for clicking the legend, invalid when clickable is false.
   * @param  {object} event obejct
   * @return {null}
   */
  onClick: ev => {}
  ```

- `custom`; Boolean, when custom is true, the default legends are not used, and users are allowed to customize legends, including the specific legends and corresponding interactions. The default value is false.

  Customize  legends require users to declare the specific legends (this property is an object array, the structure of each object is: `{ name: '', marker:{ fill: 'red' } }`) and corresponding `onClick` event.

  ```js
  chart.legend({ custom: true, items: [], onClick(){} });
  chart.legend('field', { custom: true, items: [], onClick(){} });
  ```

  The format of `market` can be an array or a string.

  Below is the usage:

  ```js
  chart.legend('city', {
    custom: true,
    position: 'left',
    items: [
      { name: 'a1', marker: 'square', fill: 'red'},
      { name: 'a2', marker: 'square', fill: 'blue'},
      { name: 'a3', marker: 'square', fill: 'green'}
    ]
  });
  chart.legend('city', {
    custom: true,
    position: 'left',
    items: [
      { name: 'a1', marker: { symbol: 'square', stroke: 'red', radius: 8 }},
      { name: 'a2', marker: { symbol: 'square', stroke: 'green', radius: 8 }},
      { name: 'a3', marker: { symbol: 'square', stroke: 'blue', radius: 8 }}
    ]
  });
  chart.legend({
    custom: true,
    position: 'left',
    items: [
      { name: 'a1', marker: 'square', fill: 'red'},
      { name: 'a2', marker: 'square', fill: 'blue'},
      { name: 'a3', marker: 'square', fill: 'green'}
    ]
  });
  ```

  